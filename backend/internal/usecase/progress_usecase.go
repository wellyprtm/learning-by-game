package usecase

import (
	"context"

	"github.com/google/uuid"

	"game-kids-backend/internal/domain"
)

type ProgressUsecase interface {
	SaveProgress(ctx context.Context, req *domain.SaveProgressRequest) (*domain.ChildProgress, []domain.ChildReward, error)
	GetRewards(ctx context.Context, childID string) ([]domain.ChildReward, error)
}

type progressUsecase struct {
	progressRepo domain.ProgressRepository
	rewardRepo   domain.RewardRepository
	logRepo      domain.ActivityLogRepository
}

func NewProgressUsecase(pRepo domain.ProgressRepository, rRepo domain.RewardRepository, lRepo domain.ActivityLogRepository) ProgressUsecase {
	return &progressUsecase{
		progressRepo: pRepo,
		rewardRepo:   rRepo,
		logRepo:      lRepo,
	}
}

func (u *progressUsecase) SaveProgress(ctx context.Context, req *domain.SaveProgressRequest) (*domain.ChildProgress, []domain.ChildReward, error) {
	if req.Stars < 0 {
		req.Stars = 0
	}
	if req.Stars > 3 {
		req.Stars = 3
	}

	isCompleted := req.Stars >= 1

	progress := &domain.ChildProgress{
		ID:                uuid.New().String(),
		ChildID:           req.ChildID,
		GameID:            req.GameID,
		LevelID:           req.LevelID,
		Stars:             req.Stars,
		Score:             req.Score,
		MasteryPercentage: req.Mastery,
		IsCompleted:       isCompleted,
	}

	if err := u.progressRepo.Upsert(ctx, progress); err != nil {
		return nil, nil, err
	}

	// Record activity log
	activityLog := &domain.ActivityLog{
		ID:              uuid.New().String(),
		ChildID:         req.ChildID,
		GameID:          req.GameID,
		LevelID:         req.LevelID,
		DurationSeconds: req.DurationSeconds,
		CorrectAnswers:  req.CorrectAnswers,
		WrongAnswers:    req.WrongAnswers,
	}
	_ = u.logRepo.Create(ctx, activityLog)

	// Check and award achievements/stickers
	var newRewards []domain.ChildReward
	totalStars, levelsPassed, _ := u.progressRepo.GetSummaryStats(ctx, req.ChildID)

	// Reward 1: First Star
	if totalStars >= 1 {
		u.checkAndAward(ctx, req.ChildID, "first_star", "Bintang Pertama Milo", "⭐", "sticker", "Mendapatkan bintang pertamamu di petualangan!", &newRewards)
	}

	// Reward 2: Reading Star
	if req.GameID == "reading-adventure" && isCompleted {
		u.checkAndAward(ctx, req.ChildID, "reading_buddy", "Pintar Membaca", "📖", "badge", "Hebat! Menyelesaikan tantangan membaca bersama Milo!", &newRewards)
	}

	// Reward 3: Math Wizard
	if req.GameID == "counting-adventure" && isCompleted {
		u.checkAndAward(ctx, req.ChildID, "math_star", "Jagoan Berhitung", "🔢", "badge", "Hebat! Menghitung benda dengan teliti!", &newRewards)
	}

	// Reward 4: Cat's Best Friend (feed-cat or 3 levels)
	if levelsPassed >= 3 {
		u.checkAndAward(ctx, req.ChildID, "best_friend", "Sahabat Setia Milo", "🐱", "trophy", "Menyelesaikan 3 tantangan dan membuat Milo senang!", &newRewards)
	}

	// Reward 5: Star Collector (10 stars)
	if totalStars >= 10 {
		u.checkAndAward(ctx, req.ChildID, "star_collector", "Kolektor Bintang Emas", "🌟", "trophy", "Mengumpulkan 10 bintang petualangan!", &newRewards)
	}

	return progress, newRewards, nil
}

func (u *progressUsecase) checkAndAward(ctx context.Context, childID, code, name, icon, rType, desc string, newRewards *[]domain.ChildReward) {
	has, _ := u.rewardRepo.HasReward(ctx, childID, code)
	if !has {
		reward := &domain.ChildReward{
			ID:          uuid.New().String(),
			ChildID:     childID,
			RewardType:  rType,
			RewardCode:  code,
			Name:        name,
			Icon:        icon,
			Description: desc,
		}
		if err := u.rewardRepo.Create(ctx, reward); err == nil {
			*newRewards = append(*newRewards, *reward)
		}
	}
}

func (u *progressUsecase) GetRewards(ctx context.Context, childID string) ([]domain.ChildReward, error) {
	return u.rewardRepo.GetByChildID(ctx, childID)
}
