export interface User {
  id: string;
  email: string;
  fullName: string;
  parentPin: string;
  createdAt: string;
  updatedAt: string;
}

export interface Child {
  id: string;
  userId: string;
  name: string;
  age: number;
  avatarCat: string;
  createdAt: string;
  updatedAt: string;
}

export interface GameLevel {
  id: string;
  gameId: string;
  levelCode: string;
  title: string;
  description: string;
  orderNum: number;
  activityType: 'tap-choose' | 'build-word' | 'count-tap' | 'feed-mascot' | 'drag-drop';
  itemsJson: any;
  unlockStarsRequired: number;
  isUnlocked: boolean;
  stars: number;
  isCompleted: boolean;
  masteryPercentage: number;
  createdAt: string;
}

export interface Game {
  id: string;
  title: string;
  subtitle: string;
  category: 'reading' | 'math' | 'mini-game';
  icon: string;
  themeColor: string;
  description: string;
  minAge: number;
  maxAge: number;
  orderNum: number;
  isActive: boolean;
  levels?: GameLevel[];
}

export interface ChildProgress {
  id: string;
  childId: string;
  gameId: string;
  levelId: string;
  stars: number;
  score: number;
  masteryPercentage: number;
  isCompleted: boolean;
  attemptsCount: number;
  lastPlayedAt: string;
}

export interface ChildReward {
  id: string;
  childId: string;
  rewardType: string;
  rewardCode: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: string;
}

export interface ActivityLog {
  id: string;
  childId: string;
  gameId: string;
  levelId: string;
  durationSeconds: number;
  correctAnswers: number;
  wrongAnswers: number;
  playedAt: string;
}

export interface DashboardSummary {
  child: Child;
  totalStars: number;
  totalLevelsPassed: number;
  totalPlayMinutes: number;
  readingMasteryPct: number;
  countingMasteryPct: number;
  recentRewards: ChildReward[];
  recentLogs: ActivityLog[];
  parentTips: string[];
}

export interface AuthResponse {
  token: string;
  user: User;
  children: Child[];
}
