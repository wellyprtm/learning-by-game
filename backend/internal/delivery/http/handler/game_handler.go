package handler

import (
	"net/http"

	"github.com/go-chi/chi/v5"

	"game-kids-backend/internal/domain"
	"game-kids-backend/internal/usecase"
	"game-kids-backend/pkg/response"
)

type GameHandler struct {
	gameUsecase usecase.GameUsecase
}

func NewGameHandler(u usecase.GameUsecase) *GameHandler {
	return &GameHandler{gameUsecase: u}
}

func (h *GameHandler) ListGames(w http.ResponseWriter, r *http.Request) {
	games, err := h.gameUsecase.ListGames(r.Context())
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "Gagal memuat katalog game")
		return
	}

	response.JSON(w, http.StatusOK, games)
}

func (h *GameHandler) GetGameWithLevels(w http.ResponseWriter, r *http.Request) {
	gameID := chi.URLParam(r, "gameId")
	childID := r.URL.Query().Get("childId")

	game, err := h.gameUsecase.GetGameWithLevels(r.Context(), gameID, childID)
	if err != nil {
		if err == domain.ErrGameNotFound {
			response.Error(w, http.StatusNotFound, err.Error())
			return
		}
		response.Error(w, http.StatusInternalServerError, "Gagal memuat level game")
		return
	}

	response.JSON(w, http.StatusOK, game)
}

func (h *GameHandler) GetLevelDetail(w http.ResponseWriter, r *http.Request) {
	levelID := chi.URLParam(r, "levelId")

	level, err := h.gameUsecase.GetLevelDetail(r.Context(), levelID)
	if err != nil {
		response.Error(w, http.StatusNotFound, "Level permainan tidak ditemukan")
		return
	}

	response.JSON(w, http.StatusOK, level)
}
