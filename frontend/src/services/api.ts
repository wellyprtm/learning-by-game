import type { AuthResponse, Child, DashboardSummary, Game, GameLevel } from '../types';

const API_BASE = '/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('milo_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(json.error || 'Terjadi kesalahan pada jaringan.');
  }

  return json.data !== undefined ? json.data : json;
}

export const api = {
  // Auth
  register: (payload: {
    email: string;
    password: string;
    fullName?: string;
    parentPin?: string;
    childName?: string;
    childAge?: number;
  }) => request<AuthResponse>('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),

  login: (payload: { email: string; password: string }) =>
    request<AuthResponse>('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),

  getMe: () => request<{ user: any; children: Child[] }>('/auth/me'),

  verifyPin: (pin: string) =>
    request<{ valid: boolean }>('/auth/verify-pin', {
      method: 'POST',
      body: JSON.stringify({ pin }),
    }),

  updateProfile: (payload: { fullName?: string; parentPin?: string }) =>
    request<any>('/auth/profile', { method: 'PUT', body: JSON.stringify(payload) }),

  // Children
  createChild: (payload: { name: string; age: number; avatarCat: string }) =>
    request<Child>('/children', { method: 'POST', body: JSON.stringify(payload) }),

  listChildren: () => request<Child[]>('/children'),

  updateChild: (childId: string, payload: { name: string; age: number; avatarCat: string }) =>
    request<Child>(`/children/${childId}`, { method: 'PUT', body: JSON.stringify(payload) }),

  // Games
  listGames: () => request<Game[]>('/games'),

  getGameWithLevels: (gameId: string, childId?: string) =>
    request<Game>(`/games/${gameId}${childId ? `?childId=${childId}` : ''}`),

  getLevelDetail: (levelId: string) => request<GameLevel>(`/levels/${levelId}`),

  // Progress & Rewards
  saveProgress: (payload: {
    childId: string;
    gameId: string;
    levelId: string;
    stars: number;
    score: number;
    mastery: number;
    durationSeconds: number;
    correctAnswers: number;
    wrongAnswers: number;
  }) => request<{ progress: any; newRewards: any[] }>('/progress', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),

  getRewards: (childId: string) => request<any[]>(`/rewards/${childId}`),

  // Parent Dashboard
  getDashboardSummary: (childId: string) => request<DashboardSummary>(`/dashboard/${childId}`),
};
