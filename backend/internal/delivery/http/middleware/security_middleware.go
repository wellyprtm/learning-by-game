package middleware

import (
	"log"
	"net/http"
	"sync"
	"time"

	"game-kids-backend/pkg/response"
)

func SecurityHeadersMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("X-Frame-Options", "DENY")
		w.Header().Set("X-XSS-Protection", "1; mode=block")
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")
		w.Header().Set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

		next.ServeHTTP(w, r)
	})
}

// In-memory rate limiter per IP to guard against auth brute force
type clientLimiter struct {
	lastSeen time.Time
	count    int
}

var (
	clientsMu sync.Mutex
	clients   = make(map[string]*clientLimiter)
)

func RateLimiterMiddleware(maxRequests int, window time.Duration) func(http.Handler) http.Handler {
	// Cleanup routine every 5 minutes
	go func() {
		for {
			time.Sleep(5 * time.Minute)
			clientsMu.Lock()
			now := time.Now()
			for ip, c := range clients {
				if now.Sub(c.lastSeen) > window*2 {
					delete(clients, ip)
				}
			}
			clientsMu.Unlock()
		}
	}()

	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ip := r.RemoteAddr

			clientsMu.Lock()
			c, exists := clients[ip]
			now := time.Now()

			if !exists || now.Sub(c.lastSeen) > window {
				clients[ip] = &clientLimiter{lastSeen: now, count: 1}
				clientsMu.Unlock()
				next.ServeHTTP(w, r)
				return
			}

			c.count++
			c.lastSeen = now

			if c.count > maxRequests {
				clientsMu.Unlock()
				response.Error(w, http.StatusTooManyRequests, "Terlalu banyak permintaan, silakan coba lagi beberapa saat.")
				return
			}

			clientsMu.Unlock()
			next.ServeHTTP(w, r)
		})
	}
}

func LoggerMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("[%s] %s %s - %v", r.Method, r.RequestURI, r.RemoteAddr, time.Since(start))
	})
}
