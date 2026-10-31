package handler

import (
	"net/http"

	"github.com/go-chi/chi/v5"

	"game-kids-backend/internal/delivery/http/middleware"
	"game-kids-backend/internal/usecase"
	"game-kids-backend/pkg/response"
)

type DashboardHandler struct {
	dashboardUsecase usecase.DashboardUsecase
}

func NewDashboardHandler(u usecase.DashboardUsecase) *DashboardHandler {
	return &DashboardHandler{dashboardUsecase: u}
}

func (h *DashboardHandler) GetChildSummary(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserIDFromContext(r.Context())
	childID := chi.URLParam(r, "childId")

	summary, err := h.dashboardUsecase.GetSummary(r.Context(), childID, userID)
	if err != nil {
		response.Error(w, http.StatusNotFound, "Ringkasan data anak tidak ditemukan")
		return
	}

	response.JSON(w, http.StatusOK, summary)
}
