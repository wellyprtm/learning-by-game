package postgres

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"game-kids-backend/internal/domain"
)

type progressRepo struct {
	db *sql.DB
}

func NewProgressRepository(db *sql.DB) domain.ProgressRepository {
	return &progressRepo{db: db}
}

func (r *progressRepo) Upsert(ctx context.Context, p *domain.ChildProgress) error {
	query := `
		INSERT INTO child_progress (id, child_id, game_id, level_id, stars, score, mastery_percentage, is_completed, attempts_count, last_played_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 1, $9)
		ON CONFLICT (child_id, level_id) DO UPDATE SET
			stars = GREATEST(child_progress.stars, EXCLUDED.stars),
			score = GREATEST(child_progress.score, EXCLUDED.score),
			mastery_percentage = GREATEST(child_progress.mastery_percentage, EXCLUDED.mastery_percentage),
			is_completed = child_progress.is_completed OR EXCLUDED.is_completed,
			attempts_count = child_progress.attempts_count + 1,
			last_played_at = EXCLUDED.last_played_at
	`
	now := time.Now()
	p.LastPlayedAt = now
	_, err := r.db.ExecContext(ctx, query,
		p.ID, p.ChildID, p.GameID, p.LevelID, p.Stars, p.Score, p.MasteryPercentage, p.IsCompleted, p.LastPlayedAt,
	)
	return err
}

func (r *progressRepo) GetByChildAndLevel(ctx context.Context, childID string, levelID string) (*domain.ChildProgress, error) {
	query := `
		SELECT id, child_id, game_id, level_id, stars, score, mastery_percentage, is_completed, attempts_count, last_played_at
		FROM child_progress
		WHERE child_id = $1 AND level_id = $2
	`
	var p domain.ChildProgress
	err := r.db.QueryRowContext(ctx, query, childID, levelID).Scan(
		&p.ID, &p.ChildID, &p.GameID, &p.LevelID, &p.Stars, &p.Score, &p.MasteryPercentage, &p.IsCompleted, &p.AttemptsCount, &p.LastPlayedAt,
	)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}
	return &p, nil
}

func (r *progressRepo) GetByChildID(ctx context.Context, childID string) ([]domain.ChildProgress, error) {
	query := `
		SELECT id, child_id, game_id, level_id, stars, score, mastery_percentage, is_completed, attempts_count, last_played_at
		FROM child_progress
		WHERE child_id = $1
		ORDER BY last_played_at DESC
	`
	rows, err := r.db.QueryContext(ctx, query, childID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var list []domain.ChildProgress
	for rows.Next() {
		var p domain.ChildProgress
		if err := rows.Scan(
			&p.ID, &p.ChildID, &p.GameID, &p.LevelID, &p.Stars, &p.Score, &p.MasteryPercentage, &p.IsCompleted, &p.AttemptsCount, &p.LastPlayedAt,
		); err != nil {
			return nil, err
		}
		list = append(list, p)
	}
	return list, nil
}

func (r *progressRepo) GetSummaryStats(ctx context.Context, childID string) (totalStars int, levelsPassed int, err error) {
	query := `
		SELECT COALESCE(SUM(stars), 0), COUNT(CASE WHEN is_completed = TRUE THEN 1 END)
		FROM child_progress
		WHERE child_id = $1
	`
	err = r.db.QueryRowContext(ctx, query, childID).Scan(&totalStars, &levelsPassed)
	return
}
