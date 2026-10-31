package usecase

import (
	"context"

	"game-kids-backend/internal/domain"
)

type GameUsecase interface {
	ListGames(ctx context.Context) ([]domain.Game, error)
	GetGameWithLevels(ctx context.Context, gameID string, childID string) (*domain.Game, error)
	GetLevelDetail(ctx context.Context, levelID string) (*domain.GameLevel, error)
}

type gameUsecase struct {
	gameRepo domain.GameRepository
}

func NewGameUsecase(repo domain.GameRepository) GameUsecase {
	return &gameUsecase{gameRepo: repo}
}

func (u *gameUsecase) ListGames(ctx context.Context) ([]domain.Game, error) {
	return u.gameRepo.GetAll(ctx)
}

func (u *gameUsecase) GetGameWithLevels(ctx context.Context, gameID string, childID string) (*domain.Game, error) {
	game, err := u.gameRepo.GetByID(ctx, gameID)
	if err != nil {
		return nil, err
	}

	levels, err := u.gameRepo.GetLevelsByGameID(ctx, gameID, childID)
	if err != nil {
		return nil, err
	}

	game.Levels = levels
	return game, nil
}

func (u *gameUsecase) GetLevelDetail(ctx context.Context, levelID string) (*domain.GameLevel, error) {
	return u.gameRepo.GetLevelByID(ctx, levelID)
}
