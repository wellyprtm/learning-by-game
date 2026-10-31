package usecase

import (
	"context"
	"errors"
	"strings"

	"github.com/google/uuid"

	"game-kids-backend/internal/domain"
	"game-kids-backend/pkg/hash"
	"game-kids-backend/pkg/token"
)

type AuthUsecase interface {
	Register(ctx context.Context, req *domain.RegisterRequest) (*domain.AuthResponse, error)
	Login(ctx context.Context, req *domain.LoginRequest) (*domain.AuthResponse, error)
	GetMe(ctx context.Context, userID string) (*domain.User, []domain.Child, error)
	VerifyPIN(ctx context.Context, userID string, pin string) (bool, error)
	UpdateProfile(ctx context.Context, userID string, req *domain.UpdateProfileRequest) (*domain.User, error)
}

type authUsecase struct {
	userRepo   domain.UserRepository
	childRepo  domain.ChildRepository
	jwtManager *token.JWTManager
}

func NewAuthUsecase(uRepo domain.UserRepository, cRepo domain.ChildRepository, jwtMgr *token.JWTManager) AuthUsecase {
	return &authUsecase{
		userRepo:   uRepo,
		childRepo:  cRepo,
		jwtManager: jwtMgr,
	}
}

func (u *authUsecase) Register(ctx context.Context, req *domain.RegisterRequest) (*domain.AuthResponse, error) {
	req.Email = strings.TrimSpace(strings.ToLower(req.Email))
	req.FullName = strings.TrimSpace(req.FullName)

	if req.Email == "" || !strings.Contains(req.Email, "@") {
		return nil, errors.New("format email tidak valid")
	}
	if len(req.Password) < 6 {
		return nil, errors.New("kata sandi minimal 6 karakter")
	}
	if req.FullName == "" {
		req.FullName = "Orang Tua Hebat"
	}
	if req.ParentPIN == "" {
		req.ParentPIN = "1234"
	}
	if req.ChildName == "" {
		req.ChildName = "Petualang Cilik"
	}
	if req.ChildAge <= 0 {
		req.ChildAge = 5
	}

	// Check if email already exists
	existing, _ := u.userRepo.GetByEmail(ctx, req.Email)
	if existing != nil {
		return nil, domain.ErrEmailAlreadyExists
	}

	hashedPwd, err := hash.HashPassword(req.Password)
	if err != nil {
		return nil, err
	}

	userID := uuid.New().String()
	user := &domain.User{
		ID:           userID,
		Email:        req.Email,
		PasswordHash: hashedPwd,
		FullName:     req.FullName,
		ParentPIN:    req.ParentPIN,
	}

	if err := u.userRepo.Create(ctx, user); err != nil {
		return nil, err
	}

	// Automatically create first child profile
	child := &domain.Child{
		ID:        uuid.New().String(),
		UserID:    userID,
		Name:      req.ChildName,
		Age:       req.ChildAge,
		AvatarCat: "milo-orange",
	}
	if err := u.childRepo.Create(ctx, child); err != nil {
		return nil, err
	}

	tokenStr, err := u.jwtManager.GenerateToken(userID, user.Email)
	if err != nil {
		return nil, err
	}

	return &domain.AuthResponse{
		Token:    tokenStr,
		User:     user,
		Children: []domain.Child{*child},
	}, nil
}

func (u *authUsecase) Login(ctx context.Context, req *domain.LoginRequest) (*domain.AuthResponse, error) {
	req.Email = strings.TrimSpace(strings.ToLower(req.Email))
	if req.Email == "" || req.Password == "" {
		return nil, domain.ErrInvalidCredentials
	}

	user, err := u.userRepo.GetByEmail(ctx, req.Email)
	if err != nil {
		return nil, domain.ErrInvalidCredentials
	}

	if !hash.CheckPassword(req.Password, user.PasswordHash) {
		return nil, domain.ErrInvalidCredentials
	}

	children, err := u.childRepo.GetByUserID(ctx, user.ID)
	if err != nil {
		children = []domain.Child{}
	}

	tokenStr, err := u.jwtManager.GenerateToken(user.ID, user.Email)
	if err != nil {
		return nil, err
	}

	return &domain.AuthResponse{
		Token:    tokenStr,
		User:     user,
		Children: children,
	}, nil
}

func (u *authUsecase) GetMe(ctx context.Context, userID string) (*domain.User, []domain.Child, error) {
	user, err := u.userRepo.GetByID(ctx, userID)
	if err != nil {
		return nil, nil, err
	}

	children, err := u.childRepo.GetByUserID(ctx, userID)
	if err != nil {
		children = []domain.Child{}
	}

	return user, children, nil
}

func (u *authUsecase) VerifyPIN(ctx context.Context, userID string, pin string) (bool, error) {
	user, err := u.userRepo.GetByID(ctx, userID)
	if err != nil {
		return false, err
	}

	if user.ParentPIN != strings.TrimSpace(pin) {
		return false, domain.ErrInvalidPIN
	}

	return true, nil
}

func (u *authUsecase) UpdateProfile(ctx context.Context, userID string, req *domain.UpdateProfileRequest) (*domain.User, error) {
	user, err := u.userRepo.GetByID(ctx, userID)
	if err != nil {
		return nil, err
	}

	if strings.TrimSpace(req.FullName) != "" {
		user.FullName = strings.TrimSpace(req.FullName)
	}
	if strings.TrimSpace(req.ParentPIN) != "" {
		user.ParentPIN = strings.TrimSpace(req.ParentPIN)
	}

	if err := u.userRepo.Update(ctx, user); err != nil {
		return nil, err
	}

	return user, nil
}
