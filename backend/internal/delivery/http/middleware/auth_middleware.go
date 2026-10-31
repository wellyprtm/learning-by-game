package middleware

import (
	"context"
	"net/http"
	"strings"

	"game-kids-backend/internal/domain"
	"game-kids-backend/pkg/response"
	"game-kids-backend/pkg/token"
)

type contextKey string

const (
	UserIDKey contextKey = "userId"
	EmailKey  contextKey = "email"
)

func AuthMiddleware(jwtManager *token.JWTManager) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := r.Header.Get("Authorization")
			if authHeader == "" {
				response.Error(w, http.StatusUnauthorized, "Token otorisasi diperlukan")
				return
			}

			parts := strings.Split(authHeader, " ")
			if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
				response.Error(w, http.StatusUnauthorized, "Format token tidak valid (harus Bearer <token>)")
				return
			}

			claims, err := jwtManager.VerifyToken(parts[1])
			if err != nil {
				response.Error(w, http.StatusUnauthorized, domain.ErrUnauthorized.Error())
				return
			}

			ctx := context.WithValue(r.Context(), UserIDKey, claims.UserID)
			ctx = context.WithValue(ctx, EmailKey, claims.Email)

			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func GetUserIDFromContext(ctx context.Context) string {
	if val, ok := ctx.Value(UserIDKey).(string); ok {
		return val
	}
	return ""
}
