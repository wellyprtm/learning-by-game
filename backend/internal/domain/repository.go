package domain

import "context"

type UserRepository interface {
	Create(ctx context.Context, user *User) error
	GetByID(ctx context.Context, id string) (*User, error)
	GetByEmail(ctx context.Context, email string) (*User, error)
	Update(ctx context.Context, user *User) error
}

type ChildRepository interface {
	Create(ctx context.Context, child *Child) error
	GetByID(ctx context.Context, id string) (*Child, error)
	GetByUserID(ctx context.Context, userID string) ([]Child, error)
	Update(ctx context.Context, child *Child) error
	Delete(ctx context.Context, id string, userID string) error
}

type GameRepository interface {
	GetAll(ctx context.Context) ([]Game, error)
	GetByID(ctx context.Context, id string) (*Game, error)
	GetLevelsByGameID(ctx context.Context, gameID string, childID string) ([]GameLevel, error)
	GetLevelByID(ctx context.Context, levelID string) (*GameLevel, error)
}

type ProgressRepository interface {
	Upsert(ctx context.Context, progress *ChildProgress) error
	GetByChildAndLevel(ctx context.Context, childID string, levelID string) (*ChildProgress, error)
	GetByChildID(ctx context.Context, childID string) ([]ChildProgress, error)
	GetSummaryStats(ctx context.Context, childID string) (totalStars int, levelsPassed int, err error)
}

type RewardRepository interface {
	Create(ctx context.Context, reward *ChildReward) error
	GetByChildID(ctx context.Context, childID string) ([]ChildReward, error)
	HasReward(ctx context.Context, childID string, rewardCode string) (bool, error)
}

type ActivityLogRepository interface {
	Create(ctx context.Context, log *ActivityLog) error
	GetRecentByChildID(ctx context.Context, childID string, limit int) ([]ActivityLog, error)
	GetTotalDuration(ctx context.Context, childID string) (int, error)
}
