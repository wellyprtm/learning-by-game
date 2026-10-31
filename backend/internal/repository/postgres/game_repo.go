package postgres

import (
	"context"
	"database/sql"
	"errors"

	"game-kids-backend/internal/domain"
)

type gameRepo struct {
	db *sql.DB
}

func NewGameRepository(db *sql.DB) domain.GameRepository {
	return &gameRepo{db: db}
}

func (r *gameRepo) GetAll(ctx context.Context) ([]domain.Game, error) {
	query := `
		SELECT id, title, subtitle, category, icon, theme_color, description, min_age, max_age, order_num, is_active
		FROM game_catalog
		WHERE is_active = TRUE
		ORDER BY order_num ASC
	`
	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var games []domain.Game
	for rows.Next() {
		var g domain.Game
		if err := rows.Scan(
			&g.ID, &g.Title, &g.Subtitle, &g.Category, &g.Icon, &g.ThemeColor,
			&g.Description, &g.MinAge, &g.MaxAge, &g.OrderNum, &g.IsActive,
		); err != nil {
			return nil, err
		}
		games = append(games, g)
	}
	return games, nil
}

func (r *gameRepo) GetByID(ctx context.Context, id string) (*domain.Game, error) {
	query := `
		SELECT id, title, subtitle, category, icon, theme_color, description, min_age, max_age, order_num, is_active
		FROM game_catalog
		WHERE id = $1
	`
	var g domain.Game
	err := r.db.QueryRowContext(ctx, query, id).Scan(
		&g.ID, &g.Title, &g.Subtitle, &g.Category, &g.Icon, &g.ThemeColor,
		&g.Description, &g.MinAge, &g.MaxAge, &g.OrderNum, &g.IsActive,
	)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, domain.ErrGameNotFound
		}
		return nil, err
	}
	return &g, nil
}

func (r *gameRepo) GetLevelsByGameID(ctx context.Context, gameID string, childID string) ([]domain.GameLevel, error) {
	query := `
		SELECT 
			gl.id, gl.game_id, gl.level_code, gl.title, gl.description, gl.order_num,
			gl.activity_type, gl.items_json, gl.unlock_stars_required, gl.created_at,
			COALESCE(cp.stars, 0) as stars,
			COALESCE(cp.is_completed, FALSE) as is_completed,
			COALESCE(cp.mastery_percentage, 0) as mastery_percentage
		FROM game_levels gl
		LEFT JOIN child_progress cp ON cp.level_id = gl.id AND cp.child_id = $2
		WHERE gl.game_id = $1
		ORDER BY gl.order_num ASC
	`
	rows, err := r.db.QueryContext(ctx, query, gameID, childID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var levels []domain.GameLevel
	var previousCompleted = true // First level is always unlocked

	for rows.Next() {
		var l domain.GameLevel
		var itemsRaw []byte

		if err := rows.Scan(
			&l.ID, &l.GameID, &l.LevelCode, &l.Title, &l.Description, &l.OrderNum,
			&l.ActivityType, &itemsRaw, &l.UnlockStarsRequired, &l.CreatedAt,
			&l.Stars, &l.IsCompleted, &l.MasteryPercentage,
		); err != nil {
			return nil, err
		}
		l.ItemsJSON = itemsRaw

		// An unlocked level is either the first level, or previous level completed, or child has enough stars
		if l.OrderNum == 1 || previousCompleted || l.IsCompleted {
			l.IsUnlocked = true
		} else {
			l.IsUnlocked = false
		}
		previousCompleted = l.IsCompleted

		levels = append(levels, l)
	}
	return levels, nil
}

func (r *gameRepo) GetLevelByID(ctx context.Context, levelID string) (*domain.GameLevel, error) {
	query := `
		SELECT id, game_id, level_code, title, description, order_num, activity_type, items_json, unlock_stars_required, created_at
		FROM game_levels
		WHERE id = $1
	`
	var l domain.GameLevel
	var itemsRaw []byte
	err := r.db.QueryRowContext(ctx, query, levelID).Scan(
		&l.ID, &l.GameID, &l.LevelCode, &l.Title, &l.Description, &l.OrderNum,
		&l.ActivityType, &itemsRaw, &l.UnlockStarsRequired, &l.CreatedAt,
	)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, domain.ErrLevelNotFound
		}
		return nil, err
	}
	l.ItemsJSON = itemsRaw
	l.IsUnlocked = true
	return &l, nil
}
