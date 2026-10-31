package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	_ "github.com/lib/pq"

	"game-kids-backend/internal/config"
	delivery "game-kids-backend/internal/delivery/http"
	"game-kids-backend/internal/delivery/http/handler"
	"game-kids-backend/internal/repository/postgres"
	"game-kids-backend/internal/usecase"
	"game-kids-backend/pkg/token"
)

func main() {
	cfg := config.Load()

	log.Printf("Menginisialisasi server Game Belajar Anak (Milo Adventure)...")

	// Connect PostgreSQL
	db, err := sql.Open("postgres", cfg.DSN())
	if err != nil {
		log.Fatalf("Gagal membuka koneksi database: %v", err)
	}
	defer db.Close()

	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(10)
	db.SetConnMaxLifetime(5 * time.Minute)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := db.PingContext(ctx); err != nil {
		log.Fatalf("Gagal menghubungi PostgreSQL di %s:%s - %v", cfg.DBHost, cfg.DBPort, err)
	}
	log.Printf("Koneksi database PostgreSQL terhubung dengan aman ke [%s]", cfg.DBName)

	// Initialize JWT Manager
	jwtManager := token.NewJWTManager(cfg.JWTSecret, cfg.TokenExpiry)

	// Repositories
	userRepo := postgres.NewUserRepository(db)
	childRepo := postgres.NewChildRepository(db)
	gameRepo := postgres.NewGameRepository(db)
	progressRepo := postgres.NewProgressRepository(db)
	rewardRepo := postgres.NewRewardRepository(db)
	activityLogRepo := postgres.NewActivityLogRepository(db)

	// Usecases
	authUsecase := usecase.NewAuthUsecase(userRepo, childRepo, jwtManager)
	childUsecase := usecase.NewChildUsecase(childRepo)
	gameUsecase := usecase.NewGameUsecase(gameRepo)
	progressUsecase := usecase.NewProgressUsecase(progressRepo, rewardRepo, activityLogRepo)
	dashboardUsecase := usecase.NewDashboardUsecase(childRepo, progressRepo, rewardRepo, activityLogRepo)

	// Handlers
	authHandler := handler.NewAuthHandler(authUsecase)
	childHandler := handler.NewChildHandler(childUsecase)
	gameHandler := handler.NewGameHandler(gameUsecase)
	progressHandler := handler.NewProgressHandler(progressUsecase)
	dashboardHandler := handler.NewDashboardHandler(dashboardUsecase)

	// Router
	router := delivery.SetupRouter(delivery.RouterParams{
		AuthHandler:      authHandler,
		ChildHandler:     childHandler,
		GameHandler:      gameHandler,
		ProgressHandler:  progressHandler,
		DashboardHandler: dashboardHandler,
		JWTManager:       jwtManager,
	})

	server := &http.Server{
		Addr:         fmt.Sprintf(":%s", cfg.ServerPort),
		Handler:      router,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Graceful shutdown listener
	shutdownChan := make(chan os.Signal, 1)
	signal.Notify(shutdownChan, os.Interrupt, syscall.SIGTERM)

	go func() {
		log.Printf("🐾 Server Game Belajar Anak aktif berjalan di http://localhost:%s", cfg.ServerPort)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Kesalahan server: %v", err)
		}
	}()

	<-shutdownChan
	log.Printf("Menerima sinyal mematikan server... Menutup proses secara graceful.")

	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer shutdownCancel()

	if err := server.Shutdown(shutdownCtx); err != nil {
		log.Fatalf("Kesalahan saat shutdown server: %v", err)
	}

	log.Printf("Server berhasil dimatikan dengan aman. Sampai jumpa!")
}
