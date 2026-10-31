package postgres

import (
	"context"
	"database/sql"
	"time"

	"game-kids-backend/internal/domain"
)

type activityLogRepo struct {
	db *sql.DB
}

func NewActivityLogRepository(db *sql.DB) domain.ActivityLogRepository {
	return &activityLogRepo{db: db}
}

func (r *activityLogRepo) Create(ctx context.Context, log *domain.ActivityLog) error {
	query := `
		INSERT INTO activity_logs (id, child_id, game_id, level_id, duration_seconds, correct_answers, wrong_answers, played_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
	`
	log.PlayedAt = time.Now()
	_, err := r.db.ExecContext(ctx, query,
		log.ID, log.ChildID, log.GameID, log.LevelID, log.DurationSeconds, log.CorrectAnswers, log.WrongAnswers, log.PlayedAt,
	)
	return err
}

func (r *activityLogRepo) GetRecentByChildID(ctx context.Context, childID string, limit int) ([]domain.ActivityLog, error) {
	if limit <= 0 {
		limit = 10
	}
	query := `
		SELECT id, child_id, game_id, level_id, duration_seconds, correct_answers, wrong_answers, played_at
		FROM activity_logs
		WHERE child_id = $1
		ORDER BY played_at DESC
		LIMIT $2
	`
	rows, err := r.db.QueryContext(ctx, query, childID, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var logs []domain.ActivityLog
	for rows.Next() {
		var l domain.ActivityLog
		if err := rows.Scan(
			&l.ID, &l.ChildID, &l.GameID, &l.LevelID, &l.DurationSeconds, &l.CorrectAnswers, &l.WrongAnswers, &l.PlayedAt,
		); err != nil {
			return nil, err
		}
		logs = append(logs, l)
	}
	return logs, nil
}

func (r *activityLogRepo) GetTotalDuration(ctx context.Context, childID string) (int, error) {
	query := `SELECT COALESCE(SUM(duration_seconds), 0) FROM activity_logs WHERE child_id = $1`
	var totalSeconds int
	err := r.db.QueryRowContext(ctx, query, childID).Scan(&totalSeconds)
	return totalSeconds, err
}
