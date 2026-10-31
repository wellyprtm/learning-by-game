package postgres

import (
	"context"
	"database/sql"
	"time"

	"game-kids-backend/internal/domain"
)

type rewardRepo struct {
	db *sql.DB
}

func NewRewardRepository(db *sql.DB) domain.RewardRepository {
	return &rewardRepo{db: db}
}

func (r *rewardRepo) Create(ctx context.Context, rw *domain.ChildReward) error {
	query := `
		INSERT INTO child_rewards (id, child_id, reward_type, reward_code, name, icon, description, earned_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
	`
	rw.EarnedAt = time.Now()
	_, err := r.db.ExecContext(ctx, query,
		rw.ID, rw.ChildID, rw.RewardType, rw.RewardCode, rw.Name, rw.Icon, rw.Description, rw.EarnedAt,
	)
	return err
}

func (r *rewardRepo) GetByChildID(ctx context.Context, childID string) ([]domain.ChildReward, error) {
	query := `
		SELECT id, child_id, reward_type, reward_code, name, icon, description, earned_at
		FROM child_rewards
		WHERE child_id = $1
		ORDER BY earned_at DESC
	`
	rows, err := r.db.QueryContext(ctx, query, childID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var list []domain.ChildReward
	for rows.Next() {
		var rw domain.ChildReward
		if err := rows.Scan(
			&rw.ID, &rw.ChildID, &rw.RewardType, &rw.RewardCode, &rw.Name, &rw.Icon, &rw.Description, &rw.EarnedAt,
		); err != nil {
			return nil, err
		}
		list = append(list, rw)
	}
	return list, nil
}

func (r *rewardRepo) HasReward(ctx context.Context, childID string, rewardCode string) (bool, error) {
	query := `SELECT EXISTS(SELECT 1 FROM child_rewards WHERE child_id = $1 AND reward_code = $2)`
	var exists bool
	err := r.db.QueryRowContext(ctx, query, childID, rewardCode).Scan(&exists)
	return exists, err
}
