package handler

import (
	"encoding/json"
	"net/http"

	"game-kids-backend/internal/delivery/http/middleware"
	"game-kids-backend/internal/domain"
	"game-kids-backend/internal/usecase"
	"game-kids-backend/pkg/response"
)

type AuthHandler struct {
	authUsecase usecase.AuthUsecase
}

func NewAuthHandler(u usecase.AuthUsecase) *AuthHandler {
	return &AuthHandler{authUsecase: u}
}

func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	var req domain.RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		response.Error(w, http.StatusBadRequest, "Format payload pendaftaran tidak valid")
		return
	}

	res, err := h.authUsecase.Register(r.Context(), &req)
	if err != nil {
		if err == domain.ErrEmailAlreadyExists {
			response.Error(w, http.StatusConflict, err.Error())
			return
		}
		response.Error(w, http.StatusBadRequest, err.Error())
		return
	}

	response.JSON(w, http.StatusCreated, res, "Pendaftaran berhasil, selamat datang di Milo Adventure!")
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var req domain.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		response.Error(w, http.StatusBadRequest, "Format payload login tidak valid")
		return
	}

	res, err := h.authUsecase.Login(r.Context(), &req)
	if err != nil {
		response.Error(w, http.StatusUnauthorized, "Email atau kata sandi tidak cocok")
		return
	}

	response.JSON(w, http.StatusOK, res, "Login berhasil")
}

func (h *AuthHandler) GetMe(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserIDFromContext(r.Context())
	user, children, err := h.authUsecase.GetMe(r.Context(), userID)
	if err != nil {
		response.Error(w, http.StatusNotFound, "Data pengguna tidak ditemukan")
		return
	}

	data := map[string]interface{}{
		"user":     user,
		"children": children,
	}
	response.JSON(w, http.StatusOK, data)
}

func (h *AuthHandler) VerifyPIN(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserIDFromContext(r.Context())
	var req domain.VerifyPINRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		response.Error(w, http.StatusBadRequest, "Format PIN tidak valid")
		return
	}

	valid, err := h.authUsecase.VerifyPIN(r.Context(), userID, req.PIN)
	if err != nil || !valid {
		response.Error(w, http.StatusForbidden, "PIN Orang Tua tidak sesuai")
		return
	}

	response.JSON(w, http.StatusOK, map[string]bool{"valid": true}, "Verifikasi PIN berhasil")
}

func (h *AuthHandler) UpdateProfile(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserIDFromContext(r.Context())
	var req domain.UpdateProfileRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		response.Error(w, http.StatusBadRequest, "Format data tidak valid")
		return
	}

	user, err := h.authUsecase.UpdateProfile(r.Context(), userID, &req)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "Gagal memperbarui profil")
		return
	}

	response.JSON(w, http.StatusOK, user, "Profil orang tua berhasil diperbarui")
}
