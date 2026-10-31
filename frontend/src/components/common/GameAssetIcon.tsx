import React from 'react';

interface GameAssetIconProps {
  nameOrEmoji?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const GameAssetIcon: React.FC<GameAssetIconProps> = ({
  nameOrEmoji = '',
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xl',
    md: 'w-14 h-14 text-3xl',
    lg: 'w-20 h-20 text-5xl',
    xl: 'w-28 h-28 text-6xl',
  };

  const key = nameOrEmoji?.toLowerCase().trim() || '';

  // Render high-definition cartoon SVG illustrations for game items
  if (key.includes('apel') || key.includes('🍎') || key === 'apple') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        {/* Leaf */}
        <path d="M 50 25 C 60 10, 75 18, 65 28 C 55 35, 52 26, 50 25 Z" fill="#2ECC71" stroke="#27AE60" strokeWidth="2" />
        {/* Stem */}
        <path d="M 50 30 C 50 18, 45 12, 40 10" stroke="#795548" strokeWidth="4" strokeLinecap="round" />
        {/* Apple Body */}
        <path d="M 50 35 C 30 25, 12 40, 16 65 C 20 85, 38 95, 50 92 C 62 95, 80 85, 84 65 C 88 40, 70 25, 50 35 Z" fill="#E74C3C" stroke="#C0392B" strokeWidth="3" />
        {/* Apple Highlight */}
        <path d="M 28 45 C 25 55, 26 68, 30 75" stroke="#FFA39E" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      </svg>
    );
  }

  if (key.includes('ikan') || key.includes('🐟') || key.includes('🐠') || key === 'fish') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        {/* Tail fin */}
        <path d="M 72 50 L 92 32 C 90 50, 90 50, 92 68 Z" fill="#3498DB" stroke="#2980B9" strokeWidth="3" strokeLinejoin="round" />
        {/* Back Fin */}
        <path d="M 40 28 C 50 18, 60 25, 58 35 Z" fill="#2980B9" />
        {/* Fish Body */}
        <ellipse cx="46" cy="50" rx="32" ry="22" fill="#00CEC9" stroke="#0984E3" strokeWidth="3" />
        {/* Belly */}
        <path d="M 24 54 C 34 68, 60 68, 70 54 Z" fill="#81ECEC" />
        {/* Eye */}
        <circle cx="28" cy="44" r="6" fill="#FFFFFF" stroke="#2D3436" strokeWidth="2" />
        <circle cx="27" cy="44" r="3" fill="#2D3436" />
        <circle cx="25" cy="42" r="1.2" fill="#FFFFFF" />
        {/* Smile */}
        <path d="M 16 52 Q 22 56 26 52" stroke="#2D3436" strokeWidth="2.5" strokeLinecap="round" />
        {/* Blushing Cheek */}
        <ellipse cx="33" cy="52" rx="3.5" ry="2.5" fill="#FF7675" opacity="0.7" />
      </svg>
    );
  }

  if (key.includes('bintang') || key.includes('⭐') || key === 'star') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <polygon
          points="50,10 62,38 92,38 68,56 78,85 50,68 22,85 32,56 8,38 38,38"
          fill="#F1C40F"
          stroke="#F39C12"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Smile on star */}
        <circle cx="43" cy="46" r="2.5" fill="#2C3E50" />
        <circle cx="57" cy="46" r="2.5" fill="#2C3E50" />
        <path d="M 46 53 Q 50 57 54 53" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" />
        {/* Blushing cheeks */}
        <ellipse cx="40" cy="51" rx="2" ry="1.5" fill="#E74C3C" opacity="0.6" />
        <ellipse cx="60" cy="51" rx="2" ry="1.5" fill="#E74C3C" opacity="0.6" />
      </svg>
    );
  }

  if (key.includes('jeruk') || key.includes('🍊') || key === 'orange') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 50 20 C 58 10, 70 15, 62 25 Z" fill="#2ECC71" stroke="#27AE60" strokeWidth="2" />
        <circle cx="50" cy="55" r="34" fill="#FF9F43" stroke="#EE5253" strokeWidth="3" />
        <ellipse cx="50" cy="55" rx="26" ry="26" fill="#FECA57" opacity="0.3" />
        <circle cx="38" cy="42" r="3" fill="#FFFFFF" opacity="0.7" />
      </svg>
    );
  }

  if (key.includes('kucing') || key.includes('🐱') || key === 'cat') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        {/* Ears */}
        <polygon points="25,40 32,15 50,30" fill="#FF9F43" stroke="#2D3436" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="28,36 34,20 46,30" fill="#FFB8B8" />
        <polygon points="75,40 68,15 50,30" fill="#FF9F43" stroke="#2D3436" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="72,36 66,20 54,30" fill="#FFB8B8" />
        {/* Head */}
        <circle cx="50" cy="56" r="32" fill="#FF9F43" stroke="#2D3436" strokeWidth="3" />
        {/* Eyes */}
        <ellipse cx="38" cy="52" rx="4" ry="5.5" fill="#2D3436" />
        <circle cx="37" cy="50" r="1.5" fill="#FFFFFF" />
        <ellipse cx="62" cy="52" rx="4" ry="5.5" fill="#2D3436" />
        <circle cx="61" cy="50" r="1.5" fill="#FFFFFF" />
        {/* Nose & Mouth */}
        <polygon points="48,60 52,60 50,63" fill="#E84393" />
        <path d="M 46 64 Q 48 68 50 65 Q 52 68 54 64" stroke="#2D3436" strokeWidth="2" strokeLinecap="round" />
        {/* Cheeks */}
        <ellipse cx="32" cy="62" rx="3.5" ry="2.5" fill="#FF7675" opacity="0.7" />
        <ellipse cx="68" cy="62" rx="3.5" ry="2.5" fill="#FF7675" opacity="0.7" />
      </svg>
    );
  }

  if (key.includes('permen') || key.includes('🍬') || key === 'candy') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        {/* Wrappers */}
        <polygon points="28,50 10,32 12,68" fill="#FF7675" stroke="#D63031" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="72,50 90,32 88,68" fill="#FF7675" stroke="#D63031" strokeWidth="2" strokeLinejoin="round" />
        {/* Candy Ball */}
        <circle cx="50" cy="50" r="26" fill="#FD79A8" stroke="#E84393" strokeWidth="3" />
        <path d="M 32 40 Q 50 50 68 40" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 32 60 Q 50 50 68 60" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (key.includes('balon') || key.includes('🎈') || key === 'balloon') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        {/* String */}
        <path d="M 50 78 Q 45 86 52 94" stroke="#B2BEC3" strokeWidth="2.5" strokeLinecap="round" />
        {/* Knot */}
        <polygon points="46,78 54,78 50,73" fill="#E84393" stroke="#D63031" strokeWidth="1" />
        {/* Balloon Body */}
        <ellipse cx="50" cy="44" rx="28" ry="32" fill="#FF7675" stroke="#D63031" strokeWidth="3" />
        {/* Highlight */}
        <ellipse cx="40" cy="32" rx="4" ry="10" transform="rotate(-30 40 32)" fill="#FFFFFF" opacity="0.6" />
      </svg>
    );
  }

  if (key.includes('bunga') || key.includes('🌻') || key === 'flower') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        {/* Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse
            key={i}
            cx="50"
            cy="24"
            rx="9"
            ry="16"
            fill="#F1C40F"
            stroke="#F39C12"
            strokeWidth="2"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
        {/* Center */}
        <circle cx="50" cy="50" r="18" fill="#795548" stroke="#4E342E" strokeWidth="3" />
        {/* Smile in center */}
        <circle cx="44" cy="46" r="2" fill="#FFE082" />
        <circle cx="56" cy="46" r="2" fill="#FFE082" />
        <path d="M 46 54 Q 50 58 54 54" stroke="#FFE082" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (key.includes('donat') || key.includes('🍩') || key === 'donut') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        {/* Pastry */}
        <circle cx="50" cy="50" r="34" fill="#F39C12" stroke="#D35400" strokeWidth="3" />
        {/* Glaze */}
        <circle cx="50" cy="50" r="28" fill="#FD79A8" stroke="#E84393" strokeWidth="2" />
        {/* Hole */}
        <circle cx="50" cy="50" r="11" fill="#FFF9EE" stroke="#D35400" strokeWidth="3" />
        {/* Sprinkles */}
        <line x1="36" y1="36" x2="42" y2="34" stroke="#2ECC71" strokeWidth="3" strokeLinecap="round" />
        <line x1="60" y1="36" x2="64" y2="42" stroke="#F1C40F" strokeWidth="3" strokeLinecap="round" />
        <line x1="35" y1="58" x2="41" y2="62" stroke="#3498DB" strokeWidth="3" strokeLinecap="round" />
        <line x1="58" y1="64" x2="64" y2="60" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (key.includes('hati') || key.includes('cinta') || key.includes('💖') || key === 'heart') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path
          d="M 50 82 C 18 60, 14 30, 32 20 C 44 14, 48 24, 50 28 C 52 24, 56 14, 68 20 C 86 30, 82 60, 50 82 Z"
          fill="#FF7675"
          stroke="#D63031"
          strokeWidth="3.5"
        />
        {/* Sparkles */}
        <polygon points="72,25 76,32 83,36 76,40 72,47 68,40 61,36 68,32" fill="#F1C40F" />
      </svg>
    );
  }

  if (key.includes('bola') || key.includes('⚽') || key === 'ball') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <circle cx="50" cy="50" r="35" fill="#FFFFFF" stroke="#2D3436" strokeWidth="3.5" />
        {/* Pentagons */}
        <polygon points="50,38 60,46 56,58 44,58 40,46" fill="#2D3436" />
        <line x1="50" y1="38" x2="50" y2="15" stroke="#2D3436" strokeWidth="3" />
        <line x1="60" y1="46" x2="80" y2="38" stroke="#2D3436" strokeWidth="3" />
        <line x1="56" y1="58" x2="72" y2="76" stroke="#2D3436" strokeWidth="3" />
        <line x1="44" y1="58" x2="28" y2="76" stroke="#2D3436" strokeWidth="3" />
        <line x1="40" y1="46" x2="20" y2="38" stroke="#2D3436" strokeWidth="3" />
      </svg>
    );
  }

  if (key.includes('buku') || key.includes('📖') || key === 'book') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        {/* Spine */}
        <path d="M 50 26 L 50 78" stroke="#795548" strokeWidth="4" />
        {/* Left page */}
        <path d="M 50 26 C 36 22, 22 25, 14 30 L 14 74 C 22 69, 36 66, 50 70 Z" fill="#FFEAA7" stroke="#F39C12" strokeWidth="3" />
        {/* Right page */}
        <path d="M 50 26 C 64 22, 78 25, 86 30 L 86 74 C 78 69, 64 66, 50 70 Z" fill="#FFEAA7" stroke="#F39C12" strokeWidth="3" />
        {/* Bookmark ribbon */}
        <path d="M 50 26 L 50 55 L 56 50 L 62 55 L 62 25" fill="#E74C3C" />
      </svg>
    );
  }

  if (key.includes('sapi') || key.includes('🐄') || key === 'cow') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        {/* Ears & Horns */}
        <polygon points="32,25 36,36 28,34" fill="#F1C40F" />
        <polygon points="68,25 64,36 72,34" fill="#F1C40F" />
        <ellipse cx="22" cy="38" rx="8" ry="5" fill="#FFFFFF" stroke="#2D3436" strokeWidth="2" />
        <ellipse cx="78" cy="38" rx="8" ry="5" fill="#FFFFFF" stroke="#2D3436" strokeWidth="2" />
        {/* Head */}
        <ellipse cx="50" cy="46" rx="26" ry="22" fill="#FFFFFF" stroke="#2D3436" strokeWidth="3" />
        <circle cx="38" cy="38" r="7" fill="#2D3436" />
        {/* Eyes */}
        <circle cx="42" cy="46" r="3.5" fill="#2D3436" />
        <circle cx="58" cy="46" r="3.5" fill="#2D3436" />
        {/* Snout */}
        <ellipse cx="50" cy="62" rx="18" ry="12" fill="#FFB8B8" stroke="#2D3436" strokeWidth="2.5" />
        <circle cx="44" cy="62" r="2.5" fill="#E84393" />
        <circle cx="56" cy="62" r="2.5" fill="#E84393" />
      </svg>
    );
  }

  if (key.includes('biskuit') || key.includes('🍪') || key === 'cookie') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <circle cx="50" cy="50" r="34" fill="#D4A373" stroke="#8D5B4C" strokeWidth="3" />
        {/* Chocolate chips */}
        <circle cx="38" cy="36" r="4.5" fill="#582F0E" />
        <circle cx="62" cy="38" r="5" fill="#582F0E" />
        <circle cx="46" cy="54" r="4" fill="#582F0E" />
        <circle cx="34" cy="62" r="4.5" fill="#582F0E" />
        <circle cx="60" cy="64" r="4.5" fill="#582F0E" />
      </svg>
    );
  }

  if (key.includes('kue') || key.includes('🧁') || key === 'cupcake') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        {/* Cup */}
        <polygon points="28,55 72,55 64,88 36,88" fill="#F39C12" stroke="#D35400" strokeWidth="2.5" />
        {/* Frosting */}
        <ellipse cx="50" cy="52" rx="26" ry="14" fill="#FD79A8" stroke="#E84393" strokeWidth="2.5" />
        <ellipse cx="50" cy="40" rx="18" ry="12" fill="#FD79A8" stroke="#E84393" strokeWidth="2.5" />
        {/* Cherry */}
        <circle cx="50" cy="24" r="7" fill="#E74C3C" stroke="#C0392B" strokeWidth="2" />
      </svg>
    );
  }

  // Safe fallback if not matched: render the text or emoji cleanly
  // If the string contains '????', provide a default cute star or apple instead!
  if (nameOrEmoji.includes('?') || nameOrEmoji === '') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <polygon
          points="50,15 61,38 86,38 66,54 74,78 50,63 26,78 34,54 14,38 39,38"
          fill="#F1C40F"
          stroke="#F39C12"
          strokeWidth="3"
        />
      </svg>
    );
  }

  return <span className={`${sizeClasses[size]} select-none inline-flex items-center justify-center ${className}`}>{nameOrEmoji}</span>;
};
