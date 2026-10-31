package http

import (
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	chimiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"

	"game-kids-backend/internal/delivery/http/handler"
	"game-kids-backend/internal/delivery/http/middleware"
	"game-kids-backend/pkg/token"
)

type RouterParams struct {
	AuthHandler      *handler.AuthHandler
	ChildHandler     *handler.ChildHandler
	GameHandler      *handler.GameHandler
	ProgressHandler  *handler.ProgressHandler
	DashboardHandler *handler.DashboardHandler
	JWTManager       *token.JWTManager
}

func SetupRouter(p RouterParams) http.Handler {
	r := chi.NewRouter()

	// Base middlewares
	r.Use(chimiddleware.RequestID)
	r.Use(chimiddleware.RealIP)
	r.Use(middleware.LoggerMiddleware)
	r.Use(chimiddleware.Recoverer)
	r.Use(middleware.SecurityHeadersMiddleware)

	// CORS setup
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "http://localhost:3000", "http://localhost:8080", "*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	// Health check
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"status":"ok","mascot":"Milo the Adventurous Cat 🐾"}`))
	})

	// Rate limiter for Auth endpoints (max 30 requests per minute)
	authLimiter := middleware.RateLimiterMiddleware(30, 1*time.Minute)

	// API Routes
	r.Route("/api", func(api chi.Router) {
		// Public Auth
		api.Group(func(pub chi.Router) {
			pub.Use(authLimiter)
			pub.Post("/auth/register", p.AuthHandler.Register)
			pub.Post("/auth/login", p.AuthHandler.Login)
		})

		// Protected Routes
		api.Group(func(priv chi.Router) {
			priv.Use(middleware.AuthMiddleware(p.JWTManager))

			// Auth & Profile
			priv.Get("/auth/me", p.AuthHandler.GetMe)
			priv.Post("/auth/verify-pin", p.AuthHandler.VerifyPIN)
			priv.Put("/auth/profile", p.AuthHandler.UpdateProfile)

			// Children
			priv.Post("/children", p.ChildHandler.CreateChild)
			priv.Get("/children", p.ChildHandler.ListChildren)
			priv.Get("/children/{childId}", p.ChildHandler.GetChild)
			priv.Put("/children/{childId}", p.ChildHandler.UpdateChild)
			priv.Delete("/children/{childId}", p.ChildHandler.DeleteChild)

			// Games & Levels
			priv.Get("/games", p.GameHandler.ListGames)
			priv.Get("/games/{gameId}", p.GameHandler.GetGameWithLevels)
			priv.Get("/levels/{levelId}", p.GameHandler.GetLevelDetail)

			// Progress & Rewards
			priv.Post("/progress", p.ProgressHandler.SaveProgress)
			priv.Get("/rewards/{childId}", p.ProgressHandler.GetRewards)

			// Parent Dashboard Analytics
			priv.Get("/dashboard/{childId}", p.DashboardHandler.GetChildSummary)
		})
	})

	return r
}
