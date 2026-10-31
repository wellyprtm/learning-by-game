package handler

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"

	"game-kids-backend/internal/delivery/http/middleware"
	"game-kids-backend/internal/domain"
	"game-kids-backend/internal/usecase"
	"game-kids-backend/pkg/response"
)

type ChildHandler struct {
	childUsecase usecase.ChildUsecase
}

func NewChildHandler(u usecase.ChildUsecase) *ChildHandler {
	return &ChildHandler{childUsecase: u}
}

func (h *ChildHandler) CreateChild(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserIDFromContext(r.Context())
	var req domain.CreateChildRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		response.Error(w, http.StatusBadRequest, "Format payload tidak valid")
		return
	}

	child, err := h.childUsecase.CreateChild(r.Context(), userID, &req)
	if err != nil {
		response.Error(w, http.StatusBadRequest, err.Error())
		return
	}

	response.JSON(w, http.StatusCreated, child, "Profil anak berhasil ditambahkan")
}

func (h *ChildHandler) ListChildren(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserIDFromContext(r.Context())
	children, err := h.childUsecase.ListChildren(r.Context(), userID)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "Gagal memuat profil anak")
		return
	}

	response.JSON(w, http.StatusOK, children)
}

func (h *ChildHandler) GetChild(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserIDFromContext(r.Context())
	childID := chi.URLParam(r, "childId")

	child, err := h.childUsecase.GetChild(r.Context(), childID, userID)
	if err != nil {
		response.Error(w, http.StatusNotFound, "Data anak tidak ditemukan")
		return
	}

	response.JSON(w, http.StatusOK, child)
}

func (h *ChildHandler) UpdateChild(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserIDFromContext(r.Context())
	childID := chi.URLParam(r, "childId")

	var req domain.UpdateChildRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		response.Error(w, http.StatusBadRequest, "Format payload tidak valid")
		return
	}

	child, err := h.childUsecase.UpdateChild(r.Context(), childID, userID, &req)
	if err != nil {
		response.Error(w, http.StatusBadRequest, "Gagal memperbarui profil anak")
		return
	}

	response.JSON(w, http.StatusOK, child, "Profil anak berhasil diperbarui")
}

func (h *ChildHandler) DeleteChild(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserIDFromContext(r.Context())
	childID := chi.URLParam(r, "childId")

	if err := h.childUsecase.DeleteChild(r.Context(), childID, userID); err != nil {
		response.Error(w, http.StatusInternalServerError, "Gagal menghapus profil anak")
		return
	}

	response.JSON(w, http.StatusOK, map[string]bool{"deleted": true}, "Profil anak berhasil dihapus")
}
