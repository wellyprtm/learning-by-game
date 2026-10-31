package handler

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"

	"game-kids-backend/internal/domain"
	"game-kids-backend/internal/usecase"
	"game-kids-backend/pkg/response"
)

type ProgressHandler struct {
	progressUsecase usecase.ProgressUsecase
}

func NewProgressHandler(u usecase.ProgressUsecase) *ProgressHandler {
	return &ProgressHandler{progressUsecase: u}
}

func (h *ProgressHandler) SaveProgress(w http.ResponseWriter, r *http.Request) {
	var req domain.SaveProgressRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		response.Error(w, http.StatusBadRequest, "Format payload progres tidak valid")
		return
	}

	progress, newRewards, err := h.progressUsecase.SaveProgress(r.Context(), &req)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "Gagal menyimpan progres permainan")
		return
	}

	data := map[string]interface{}{
		"progress":   progress,
		"newRewards": newRewards,
	}

	response.JSON(w, http.StatusOK, data, "Progres berhasil disimpan!")
}

func (h *ProgressHandler) GetRewards(w http.ResponseWriter, r *http.Request) {
	childID := chi.URLParam(r, "childId")
	rewards, err := h.progressUsecase.GetRewards(r.Context(), childID)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "Gagal memuat hadiah anak")
		return
	}

	response.JSON(w, http.StatusOK, rewards)
}
