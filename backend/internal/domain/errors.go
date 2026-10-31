package domain

import "errors"

var (
	ErrUserNotFound         = errors.New("pengguna tidak ditemukan")
	ErrEmailAlreadyExists    = errors.New("email sudah terdaftar, silakan gunakan email lain")
	ErrInvalidCredentials    = errors.New("email atau kata sandi tidak sesuai")
	ErrInvalidPIN           = errors.New("PIN orang tua salah")
	ErrChildNotFound        = errors.New("data profil anak tidak ditemukan")
	ErrGameNotFound         = errors.New("game tidak ditemukan")
	ErrLevelNotFound        = errors.New("level game tidak ditemukan")
	ErrUnauthorized         = errors.New("sesi tidak sah atau telah berakhir, silakan login kembali")
	ErrInternalServer       = errors.New("terjadi kesalahan pada server, silakan coba lagi")
	ErrBadRequest           = errors.New("data yang dikirim tidak valid")
)
