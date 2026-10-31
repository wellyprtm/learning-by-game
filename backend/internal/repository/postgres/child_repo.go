package postgres

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"game-kids-backend/internal/domain"
)

type childRepo struct {
	db *sql.DB
}

func NewChildRepository(db *sql.DB) domain.ChildRepository {
	return &childRepo{db: db}
}

func (r *childRepo) Create(ctx context.Context, c *domain.Child) error {
	query := `
		INSERT INTO children (id, user_id, name, age, avatar_cat, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
	`
	now := time.Now()
	c.CreatedAt = now
	c.UpdatedAt = now

	_, err := r.db.ExecContext(ctx, query, c.ID, c.UserID, c.Name, c.Age, c.AvatarCat, c.CreatedAt, c.UpdatedAt)
	return err
}

func (r *childRepo) GetByID(ctx context.Context, id string) (*domain.Child, error) {
	query := `
		SELECT id, user_id, name, age, avatar_cat, created_at, updated_at
		FROM children
		WHERE id = $1
	`
	var c domain.Child
	err := r.db.QueryRowContext(ctx, query, id).Scan(
		&c.ID, &c.UserID, &c.Name, &c.Age, &c.AvatarCat, &c.CreatedAt, &c.UpdatedAt,
	)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, domain.ErrChildNotFound
		}
		return nil, err
	}
	return &c, nil
}

func (r *childRepo) GetByUserID(ctx context.Context, userID string) ([]domain.Child, error) {
	query := `
		SELECT id, user_id, name, age, avatar_cat, created_at, updated_at
		FROM children
		WHERE user_id = $1
		ORDER BY created_at ASC
	`
	rows, err := r.db.QueryContext(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var children []domain.Child
	for rows.Next() {
		var c domain.Child
		if err := rows.Scan(&c.ID, &c.UserID, &c.Name, &c.Age, &c.AvatarCat, &c.CreatedAt, &c.UpdatedAt); err != nil {
			return nil, err
		}
		children = append(children, c)
	}
	return children, nil
}

func (r *childRepo) Update(ctx context.Context, c *domain.Child) error {
	query := `
		UPDATE children
		SET name = $1, age = $2, avatar_cat = $3, updated_at = $4
		WHERE id = $5 AND user_id = $6
	`
	c.UpdatedAt = time.Now()
	_, err := r.db.ExecContext(ctx, query, c.Name, c.Age, c.AvatarCat, c.UpdatedAt, c.ID, c.UserID)
	return err
}

func (r *childRepo) Delete(ctx context.Context, id string, userID string) error {
	query := `DELETE FROM children WHERE id = $1 AND user_id = $2`
	_, err := r.db.ExecContext(ctx, query, id, userID)
	return err
}
