package usecase

import (
	"context"

	"game-kids-backend/internal/domain"
)

type DashboardUsecase interface {
	GetSummary(ctx context.Context, childID string, userID string) (*domain.DashboardSummary, error)
}

type dashboardUsecase struct {
	childRepo    domain.ChildRepository
	progressRepo domain.ProgressRepository
	rewardRepo   domain.RewardRepository
	logRepo      domain.ActivityLogRepository
}

func NewDashboardUsecase(cRepo domain.ChildRepository, pRepo domain.ProgressRepository, rRepo domain.RewardRepository, lRepo domain.ActivityLogRepository) DashboardUsecase {
	return &dashboardUsecase{
		childRepo:    cRepo,
		progressRepo: pRepo,
		rewardRepo:   rRepo,
		logRepo:      lRepo,
	}
}

func (u *dashboardUsecase) GetSummary(ctx context.Context, childID string, userID string) (*domain.DashboardSummary, error) {
	child, err := u.childRepo.GetByID(ctx, childID)
	if err != nil {
		return nil, err
	}
	if child.UserID != userID {
		return nil, domain.ErrUnauthorized
	}

	totalStars, levelsPassed, _ := u.progressRepo.GetSummaryStats(ctx, childID)
	totalDuration, _ := u.logRepo.GetTotalDuration(ctx, childID)
	playMinutes := totalDuration / 60
	if playMinutes == 0 && totalDuration > 0 {
		playMinutes = 1
	}

	progressList, _ := u.progressRepo.GetByChildID(ctx, childID)

	readingCount, readingSum := 0, 0
	countingCount, countingSum := 0, 0

	for _, p := range progressList {
		if p.GameID == "reading-adventure" {
			readingCount++
			readingSum += p.MasteryPercentage
		} else if p.GameID == "counting-adventure" {
			countingCount++
			countingSum += p.MasteryPercentage
		}
	}

	readingMastery := 0
	if readingCount > 0 {
		readingMastery = readingSum / readingCount
	}

	countingMastery := 0
	if countingCount > 0 {
		countingMastery = countingSum / countingCount
	}

	rewards, _ := u.rewardRepo.GetByChildID(ctx, childID)
	recentLogs, _ := u.logRepo.GetRecentByChildID(ctx, childID, 8)

	// Tailored real-world tips for parents based on 5-year-old development
	parentTips := []string{
		"Ajak anak mencari 3 benda berawalan huruf 'B' atau 'M' di sekitar rumah (misal: Buku, Bola, Meja).",
		"Saat menyiapkan makan siang, ajak si kecil menghitung sendok atau buah apel bersama.",
		"Beri apresiasi atas usaha anak, bukan hanya hasil akhirnya, untuk menumbuhkan rasa percaya diri.",
		"Luangkan 5-10 menit sehari untuk bermain bersama Milo agar anak belajar secara konsisten tanpa cepat bosan.",
	}

	return &domain.DashboardSummary{
		Child:              child,
		TotalStars:         totalStars,
		TotalLevelsPassed:  levelsPassed,
		TotalPlayMinutes:   playMinutes,
		ReadingMasteryPct:  readingMastery,
		CountingMasteryPct: countingMastery,
		RecentRewards:      rewards,
		RecentLogs:         recentLogs,
		ParentTips:         parentTips,
	}, nil
}
