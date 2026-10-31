export interface GameTheme {
  headerBg: string;
  badgeBg: string;
  badgeText: string;
  buttonBg: string;
  buttonHover: string;
  border: string;
  titleColor: string;
  subtitleColor: string;
  iconBg: string;
}

export const getGameTheme = (gameId: string): GameTheme => {
  switch (gameId) {
    case 'reading-adventure':
      return {
        // Warm sunshine golden-amber for reading
        headerBg: 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500',
        badgeBg: 'bg-amber-100',
        badgeText: 'text-amber-950',
        buttonBg: 'bg-amber-500',
        buttonHover: 'hover:bg-amber-600',
        border: 'border-amber-300',
        titleColor: 'text-amber-950',
        subtitleColor: 'text-amber-900',
        iconBg: 'bg-white text-amber-600',
      };
    case 'counting-adventure':
      return {
        // Deep vibrant emerald-teal for counting with crisp high-contrast white text
        headerBg: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700',
        badgeBg: 'bg-emerald-100',
        badgeText: 'text-emerald-950',
        buttonBg: 'bg-emerald-600',
        buttonHover: 'hover:bg-emerald-700',
        border: 'border-emerald-300',
        titleColor: 'text-white',
        subtitleColor: 'text-teal-100',
        iconBg: 'bg-white text-emerald-600',
      };
    case 'feed-cat':
      return {
        // Cheerful rose-pink for feeding cat
        headerBg: 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600',
        badgeBg: 'bg-pink-100',
        badgeText: 'text-pink-950',
        buttonBg: 'bg-pink-500',
        buttonHover: 'hover:bg-pink-600',
        border: 'border-pink-300',
        titleColor: 'text-white',
        subtitleColor: 'text-pink-100',
        iconBg: 'bg-white text-pink-600',
      };
    default:
      return {
        headerBg: 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500',
        badgeBg: 'bg-amber-100',
        badgeText: 'text-amber-950',
        buttonBg: 'bg-amber-500',
        buttonHover: 'hover:bg-amber-600',
        border: 'border-amber-300',
        titleColor: 'text-amber-950',
        subtitleColor: 'text-amber-900',
        iconBg: 'bg-white text-amber-600',
      };
  }
};
