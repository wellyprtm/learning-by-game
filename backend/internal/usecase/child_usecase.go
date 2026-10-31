package usecase

import (
	"context"
	"errors"
	"strings"

	"github.com/google/uuid"

	"game-kids-backend/internal/domain"
)

type ChildUsecase interface {
	CreateChild(ctx context.Context, userID string, req *domain.CreateChildRequest) (*domain.Child, error)
	ListChildren(ctx context.Context, userID string) ([]domain.Child, error)
	GetChild(ctx context.Context, childID string, userID string) (*domain.Child, error)
	UpdateChild(ctx context.Context, childID string, userID string, req *domain.UpdateChildRequest) (*domain.Child, error)
	DeleteChild(ctx context.Context, childID string, userID string) error
}

type childUsecase struct {
	childRepo domain.ChildRepository
}

func NewChildUsecase(repo domain.ChildRepository) ChildUsecase {
	return &childUsecase{childRepo: repo}
}

func (u *childUsecase) CreateChild(ctx context.Context, userID string, req *domain.CreateChildRequest) (*domain.Child, error) {
	req.Name = strings.TrimSpace(req.Name)
	if req.Name == "" {
		return nil, errors.New("nama anak tidak boleh kosong")
	}
	if req.Age <= 0 {
		req.Age = 5
	}
	if req.AvatarCat == "" {
		req.AvatarCat = "milo-orange"
	}

	child := &domain.Child{
		ID:        uuid.New().String(),
		UserID:    userID,
		Name:      req.Name,
		Age:       req.Age,
		AvatarCat: req.AvatarCat,
	}

	if err := u.childRepo.Create(ctx, child); err != nil {
		return nil, err
	}
	return child, nil
}

func (u *childUsecase) ListChildren(ctx context.Context, userID string) ([]domain.Child, error) {
	return u.childRepo.GetByUserID(ctx, userID)
}

func (u *childUsecase) GetChild(ctx context.Context, childID string, userID string) (*domain.Child, error) {
	child, err := u.childRepo.GetByID(ctx, childID)
	if err != nil {
		return nil, err
	}
	if child.UserID != userID {
		return nil, domain.ErrUnauthorized
	}
	return child, nil
}

func (u *childUsecase) UpdateChild(ctx context.Context, childID string, userID string, req *domain.UpdateChildRequest) (*domain.Child, error) {
	child, err := u.childRepo.GetByID(ctx, childID)
	if err != nil {
		return nil, err
	}
	if child.UserID != userID {
		return nil, domain.ErrUnauthorized
	}

	if strings.TrimSpace(req.Name) != "" {
		child.Name = strings.TrimSpace(req.Name)
	}
	if req.Age > 0 {
		child.Age = req.Age
	}
	if strings.TrimSpace(req.AvatarCat) != "" {
		child.AvatarCat = strings.TrimSpace(req.AvatarCat)
	}

	if err := u.childRepo.Update(ctx, child); err != nil {
		return nil, err
	}

	return child, nil
}

func (u *childUsecase) DeleteChild(ctx context.Context, childID string, userID string) error {
	return u.childRepo.Delete(ctx, childID, userID)
}
