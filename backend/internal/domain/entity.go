package domain

import (
	"encoding/json"
	"time"
)

type User struct {
	ID           string    `json:"id"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"`
	FullName     string    `json:"fullName"`
	ParentPIN    string    `json:"parentPin"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
}

type Child struct {
	ID        string    `json:"id"`
	UserID    string    `json:"userId"`
	Name      string    `json:"name"`
	Age       int       `json:"age"`
	AvatarCat string    `json:"avatarCat"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type Game struct {
	ID          string      `json:"id"`
	Title       string      `json:"title"`
	Subtitle    string      `json:"subtitle"`
	Category    string      `json:"category"`
	Icon        string      `json:"icon"`
	ThemeColor  string      `json:"themeColor"`
	Description string      `json:"description"`
	MinAge      int         `json:"minAge"`
	MaxAge      int         `json:"maxAge"`
	OrderNum    int         `json:"orderNum"`
	IsActive    bool        `json:"isActive"`
	Levels      []GameLevel `json:"levels,omitempty"`
}

type GameLevel struct {
	ID                   string          `json:"id"`
	GameID               string          `json:"gameId"`
	LevelCode            string          `json:"levelCode"`
	Title                string          `json:"title"`
	Description          string          `json:"description"`
	OrderNum             int             `json:"orderNum"`
	ActivityType         string          `json:"activityType"`
	ItemsJSON            json.RawMessage `json:"itemsJson"`
	UnlockStarsRequired  int             `json:"unlockStarsRequired"`
	IsUnlocked           bool            `json:"isUnlocked"`
	Stars                int             `json:"stars"`
	IsCompleted          bool            `json:"isCompleted"`
	MasteryPercentage    int             `json:"masteryPercentage"`
	CreatedAt            time.Time       `json:"createdAt"`
}

type ChildProgress struct {
	ID                string    `json:"id"`
	ChildID           string    `json:"childId"`
	GameID            string    `json:"gameId"`
	LevelID           string    `json:"levelId"`
	Stars             int       `json:"stars"`
	Score             int       `json:"score"`
	MasteryPercentage int       `json:"masteryPercentage"`
	IsCompleted       bool      `json:"isCompleted"`
	AttemptsCount     int       `json:"attemptsCount"`
	LastPlayedAt      time.Time `json:"lastPlayedAt"`
}

type ChildReward struct {
	ID          string    `json:"id"`
	ChildID     string    `json:"childId"`
	RewardType  string    `json:"rewardType"` // sticker, trophy, fish
	RewardCode  string    `json:"rewardCode"`
	Name        string    `json:"name"`
	Icon        string    `json:"icon"`
	Description string    `json:"description"`
	EarnedAt    time.Time `json:"earnedAt"`
}

type ActivityLog struct {
	ID              string    `json:"id"`
	ChildID         string    `json:"childId"`
	GameID          string    `json:"gameId"`
	LevelID         string    `json:"levelId"`
	DurationSeconds int       `json:"durationSeconds"`
	CorrectAnswers  int       `json:"correctAnswers"`
	WrongAnswers    int       `json:"wrongAnswers"`
	PlayedAt        time.Time `json:"playedAt"`
}

// Request and Response DTOs
type RegisterRequest struct {
	Email     string `json:"email"`
	Password  string `json:"password"`
	FullName  string `json:"fullName"`
	ParentPIN string `json:"parentPin"`
	ChildName string `json:"childName"`
	ChildAge  int    `json:"childAge"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AuthResponse struct {
	Token    string  `json:"token"`
	User     *User   `json:"user"`
	Children []Child `json:"children"`
}

type VerifyPINRequest struct {
	PIN string `json:"pin"`
}

type UpdateProfileRequest struct {
	FullName  string `json:"fullName"`
	ParentPIN string `json:"parentPin"`
}

type CreateChildRequest struct {
	Name      string `json:"name"`
	Age       int    `json:"age"`
	AvatarCat string `json:"avatarCat"`
}

type UpdateChildRequest struct {
	Name      string `json:"name"`
	Age       int    `json:"age"`
	AvatarCat string `json:"avatarCat"`
}

type SaveProgressRequest struct {
	ChildID         string `json:"childId"`
	GameID          string `json:"gameId"`
	LevelID         string `json:"levelId"`
	Stars           int    `json:"stars"`
	Score           int    `json:"score"`
	Mastery         int    `json:"mastery"`
	DurationSeconds int    `json:"durationSeconds"`
	CorrectAnswers  int    `json:"correctAnswers"`
	WrongAnswers    int    `json:"wrongAnswers"`
}

type DashboardSummary struct {
	Child              *Child         `json:"child"`
	TotalStars         int            `json:"totalStars"`
	TotalLevelsPassed  int            `json:"totalLevelsPassed"`
	TotalPlayMinutes   int            `json:"totalPlayMinutes"`
	ReadingMasteryPct  int            `json:"readingMasteryPct"`
	CountingMasteryPct int            `json:"countingMasteryPct"`
	RecentRewards      []ChildReward  `json:"recentRewards"`
	RecentLogs         []ActivityLog  `json:"recentLogs"`
	ParentTips         []string       `json:"parentTips"`
}
