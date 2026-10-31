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

  // 1. Apel (Apple)
  if (key.includes('apel') || key.includes('🍎') || key === 'apple') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 50 25 C 60 10, 75 18, 65 28 C 55 35, 52 26, 50 25 Z" fill="#2ECC71" stroke="#27AE60" strokeWidth="2" />
        <path d="M 50 30 C 50 18, 45 12, 40 10" stroke="#795548" strokeWidth="4" strokeLinecap="round" />
        <path d="M 50 35 C 30 25, 12 40, 16 65 C 20 85, 38 95, 50 92 C 62 95, 80 85, 84 65 C 88 40, 70 25, 50 35 Z" fill="#E74C3C" stroke="#C0392B" strokeWidth="3" />
        <path d="M 28 45 C 25 55, 26 68, 30 75" stroke="#FFA39E" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      </svg>
    );
  }

  // 2. Ikan Emas (Goldfish)
  if (key.includes('emas') || key.includes('🐠') || key === 'goldfish') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 72 50 L 94 30 C 90 50, 90 50, 94 70 Z" fill="#FF793F" stroke="#CD6133" strokeWidth="3" strokeLinejoin="round" />
        <path d="M 40 28 C 50 16, 62 25, 60 36 Z" fill="#FF793F" />
        <ellipse cx="46" cy="50" rx="32" ry="22" fill="#FFB142" stroke="#CC8E35" strokeWidth="3" />
        <path d="M 24 54 C 34 68, 60 68, 70 54 Z" fill="#FFEAA7" />
        <circle cx="28" cy="44" r="6" fill="#FFFFFF" stroke="#2D3436" strokeWidth="2" />
        <circle cx="27" cy="44" r="3" fill="#2D3436" />
        <circle cx="25" cy="42" r="1.2" fill="#FFFFFF" />
        <path d="M 16 52 Q 22 56 26 52" stroke="#2D3436" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="33" cy="52" rx="3.5" ry="2.5" fill="#FF5252" opacity="0.7" />
      </svg>
    );
  }

  // 3. Ikan Biru / Umum (Fish)
  if (key.includes('ikan') || key.includes('🐟') || key.includes('🐡') || key === 'fish') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 72 50 L 92 32 C 90 50, 90 50, 92 68 Z" fill="#3498DB" stroke="#2980B9" strokeWidth="3" strokeLinejoin="round" />
        <path d="M 40 28 C 50 18, 60 25, 58 35 Z" fill="#2980B9" />
        <ellipse cx="46" cy="50" rx="32" ry="22" fill="#00CEC9" stroke="#0984E3" strokeWidth="3" />
        <path d="M 24 54 C 34 68, 60 68, 70 54 Z" fill="#81ECEC" />
        <circle cx="28" cy="44" r="6" fill="#FFFFFF" stroke="#2D3436" strokeWidth="2" />
        <circle cx="27" cy="44" r="3" fill="#2D3436" />
        <circle cx="25" cy="42" r="1.2" fill="#FFFFFF" />
        <path d="M 16 52 Q 22 56 26 52" stroke="#2D3436" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="33" cy="52" rx="3.5" ry="2.5" fill="#FF7675" opacity="0.7" />
      </svg>
    );
  }

  // 4. Bintang (Star)
  if (key.includes('bintang') || key.includes('⭐') || key.includes('🌟') || key === 'star') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <polygon
          points="50,10 62,38 92,38 68,56 78,85 50,68 22,85 32,56 8,38 38,38"
          fill="#F1C40F"
          stroke="#F39C12"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <circle cx="43" cy="46" r="2.5" fill="#2C3E50" />
        <circle cx="57" cy="46" r="2.5" fill="#2C3E50" />
        <path d="M 46 53 Q 50 57 54 53" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="40" cy="51" rx="2" ry="1.5" fill="#E74C3C" opacity="0.6" />
        <ellipse cx="60" cy="51" rx="2" ry="1.5" fill="#E74C3C" opacity="0.6" />
      </svg>
    );
  }

  // 5. Jeruk (Orange)
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

  // 6. Kucing (Cat)
  if (key.includes('kucing') || key.includes('🐱') || key === 'cat') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <polygon points="25,40 32,15 50,30" fill="#FF9F43" stroke="#2D3436" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="28,36 34,20 46,30" fill="#FFB8B8" />
        <polygon points="75,40 68,15 50,30" fill="#FF9F43" stroke="#2D3436" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="72,36 66,20 54,30" fill="#FFB8B8" />
        <circle cx="50" cy="56" r="32" fill="#FF9F43" stroke="#2D3436" strokeWidth="3" />
        <ellipse cx="38" cy="52" rx="4" ry="5.5" fill="#2D3436" />
        <circle cx="37" cy="50" r="1.5" fill="#FFFFFF" />
        <ellipse cx="62" cy="52" rx="4" ry="5.5" fill="#2D3436" />
        <circle cx="61" cy="50" r="1.5" fill="#FFFFFF" />
        <polygon points="48,60 52,60 50,63" fill="#E84393" />
        <path d="M 46 64 Q 48 68 50 65 Q 52 68 54 64" stroke="#2D3436" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="32" cy="62" rx="3.5" ry="2.5" fill="#FF7675" opacity="0.7" />
        <ellipse cx="68" cy="62" rx="3.5" ry="2.5" fill="#FF7675" opacity="0.7" />
      </svg>
    );
  }

  // 7. Permen (Candy)
  if (key.includes('permen') || key.includes('🍬') || key === 'candy') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <polygon points="28,50 10,32 12,68" fill="#FF7675" stroke="#D63031" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="72,50 90,32 88,68" fill="#FF7675" stroke="#D63031" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="50" cy="50" r="26" fill="#FD79A8" stroke="#E84393" strokeWidth="3" />
        <path d="M 32 40 Q 50 50 68 40" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 32 60 Q 50 50 68 60" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 8. Balon (Balloon)
  if (key.includes('balon') || key.includes('🎈') || key === 'balloon') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 50 78 Q 45 86 52 94" stroke="#B2BEC3" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="46,78 54,78 50,73" fill="#E84393" stroke="#D63031" strokeWidth="1" />
        <ellipse cx="50" cy="44" rx="28" ry="32" fill="#FF7675" stroke="#D63031" strokeWidth="3" />
        <ellipse cx="40" cy="32" rx="4" ry="10" transform="rotate(-30 40 32)" fill="#FFFFFF" opacity="0.6" />
      </svg>
    );
  }

  // 9. Bunga (Sunflower)
  if (key.includes('bunga') || key.includes('🌻') || key.includes('🌸') || key === 'flower') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
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
        <circle cx="50" cy="50" r="18" fill="#795548" stroke="#4E342E" strokeWidth="3" />
        <circle cx="44" cy="46" r="2" fill="#FFE082" />
        <circle cx="56" cy="46" r="2" fill="#FFE082" />
        <path d="M 46 54 Q 50 58 54 54" stroke="#FFE082" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // 10. Donat (Donut)
  if (key.includes('donat') || key.includes('🍩') || key === 'donut') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <circle cx="50" cy="50" r="34" fill="#F39C12" stroke="#D35400" strokeWidth="3" />
        <circle cx="50" cy="50" r="28" fill="#FD79A8" stroke="#E84393" strokeWidth="2" />
        <circle cx="50" cy="50" r="11" fill="#FFF9EE" stroke="#D35400" strokeWidth="3" />
        <line x1="36" y1="36" x2="42" y2="34" stroke="#2ECC71" strokeWidth="3" strokeLinecap="round" />
        <line x1="60" y1="36" x2="64" y2="42" stroke="#F1C40F" strokeWidth="3" strokeLinecap="round" />
        <line x1="35" y1="58" x2="41" y2="62" stroke="#3498DB" strokeWidth="3" strokeLinecap="round" />
        <line x1="58" y1="64" x2="64" y2="60" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  // 11. Hati (Heart)
  if (key.includes('hati') || key.includes('cinta') || key.includes('💖') || key === 'heart') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path
          d="M 50 82 C 18 60, 14 30, 32 20 C 44 14, 48 24, 50 28 C 52 24, 56 14, 68 20 C 86 30, 82 60, 50 82 Z"
          fill="#FF7675"
          stroke="#D63031"
          strokeWidth="3.5"
        />
        <polygon points="72,25 76,32 83,36 76,40 72,47 68,40 61,36 68,32" fill="#F1C40F" />
      </svg>
    );
  }

  // 12. Bola (Ball)
  if (key.includes('bola') || key.includes('⚽') || key === 'ball') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <circle cx="50" cy="50" r="35" fill="#FFFFFF" stroke="#2D3436" strokeWidth="3.5" />
        <polygon points="50,38 60,46 56,58 44,58 40,46" fill="#2D3436" />
        <line x1="50" y1="38" x2="50" y2="15" stroke="#2D3436" strokeWidth="3" />
        <line x1="60" y1="46" x2="80" y2="38" stroke="#2D3436" strokeWidth="3" />
        <line x1="56" y1="58" x2="72" y2="76" stroke="#2D3436" strokeWidth="3" />
        <line x1="44" y1="58" x2="28" y2="76" stroke="#2D3436" strokeWidth="3" />
        <line x1="40" y1="46" x2="20" y2="38" stroke="#2D3436" strokeWidth="3" />
      </svg>
    );
  }

  // 13. Buku (Book)
  if (key.includes('buku') || key.includes('📖') || key === 'book') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 50 26 L 50 78" stroke="#795548" strokeWidth="4" />
        <path d="M 50 26 C 36 22, 22 25, 14 30 L 14 74 C 22 69, 36 66, 50 70 Z" fill="#FFEAA7" stroke="#F39C12" strokeWidth="3" />
        <path d="M 50 26 C 64 22, 78 25, 86 30 L 86 74 C 78 69, 64 66, 50 70 Z" fill="#FFEAA7" stroke="#F39C12" strokeWidth="3" />
        <path d="M 50 26 L 50 55 L 56 50 L 62 55 L 62 25" fill="#E74C3C" />
      </svg>
    );
  }

  // 14. Sapi (Cow)
  if (key.includes('sapi') || key.includes('🐄') || key === 'cow') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <polygon points="32,25 36,36 28,34" fill="#F1C40F" />
        <polygon points="68,25 64,36 72,34" fill="#F1C40F" />
        <ellipse cx="22" cy="38" rx="8" ry="5" fill="#FFFFFF" stroke="#2D3436" strokeWidth="2" />
        <ellipse cx="78" cy="38" rx="8" ry="5" fill="#FFFFFF" stroke="#2D3436" strokeWidth="2" />
        <ellipse cx="50" cy="46" rx="26" ry="22" fill="#FFFFFF" stroke="#2D3436" strokeWidth="3" />
        <circle cx="38" cy="38" r="7" fill="#2D3436" />
        <circle cx="42" cy="46" r="3.5" fill="#2D3436" />
        <circle cx="58" cy="46" r="3.5" fill="#2D3436" />
        <ellipse cx="50" cy="62" rx="18" ry="12" fill="#FFB8B8" stroke="#2D3436" strokeWidth="2.5" />
        <circle cx="44" cy="62" r="2.5" fill="#E84393" />
        <circle cx="56" cy="62" r="2.5" fill="#E84393" />
      </svg>
    );
  }

  // 15. Biskuit (Cookie)
  if (key.includes('biskuit') || key.includes('🍪') || key === 'cookie') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <circle cx="50" cy="50" r="34" fill="#D4A373" stroke="#8D5B4C" strokeWidth="3" />
        <circle cx="38" cy="36" r="4.5" fill="#582F0E" />
        <circle cx="62" cy="38" r="5" fill="#582F0E" />
        <circle cx="46" cy="54" r="4" fill="#582F0E" />
        <circle cx="34" cy="62" r="4.5" fill="#582F0E" />
        <circle cx="60" cy="64" r="4.5" fill="#582F0E" />
      </svg>
    );
  }

  // 16. Kue (Cupcake)
  if (key.includes('kue') || key.includes('🧁') || key === 'cupcake') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <polygon points="28,55 72,55 64,88 36,88" fill="#F39C12" stroke="#D35400" strokeWidth="2.5" />
        <ellipse cx="50" cy="52" rx="26" ry="14" fill="#FD79A8" stroke="#E84393" strokeWidth="2.5" />
        <ellipse cx="50" cy="40" rx="18" ry="12" fill="#FD79A8" stroke="#E84393" strokeWidth="2.5" />
        <circle cx="50" cy="24" r="7" fill="#E74C3C" stroke="#C0392B" strokeWidth="2" />
      </svg>
    );
  }

  // 17. Roti (Bread)
  if (key.includes('roti') || key.includes('🍞') || key === 'bread') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 22 45 C 22 25, 78 25, 78 45 L 74 78 C 74 84, 26 84, 26 78 Z" fill="#F39C12" stroke="#D35400" strokeWidth="3" />
        <path d="M 26 46 C 26 30, 74 30, 74 46 L 70 76 C 70 80, 30 80, 30 76 Z" fill="#FFEAA7" />
        <line x1="38" y1="45" x2="42" y2="60" stroke="#F39C12" strokeWidth="3" strokeLinecap="round" />
        <line x1="58" y1="45" x2="62" y2="60" stroke="#F39C12" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  // 18. Susu (Milk)
  if (key.includes('susu') || key.includes('🥛') || key === 'milk') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <polygon points="30,28 70,28 64,86 36,86" fill="#74B9FF" stroke="#0984E3" strokeWidth="3" />
        <polygon points="33,36 67,36 63,82 37,82" fill="#FFFFFF" />
        <path d="M 45 52 C 45 48, 55 48, 55 52 C 55 58, 45 58, 45 52 Z" fill="#74B9FF" />
        {/* Straw */}
        <line x1="62" y1="12" x2="52" y2="40" stroke="#FF7675" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  // 19. Madu (Honey)
  if (key.includes('madu') || key.includes('🍯') || key === 'honey') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <ellipse cx="50" cy="30" rx="22" ry="7" fill="#F39C12" stroke="#D35400" strokeWidth="2.5" />
        <path d="M 28 30 C 20 45, 20 75, 50 82 C 80 75, 80 45, 72 30 Z" fill="#F1C40F" stroke="#F39C12" strokeWidth="3" />
        <ellipse cx="50" cy="55" rx="14" ry="10" fill="#FFEAA7" />
        <circle cx="50" cy="55" r="5" fill="#D35400" opacity="0.3" />
      </svg>
    );
  }

  // 20. Keju (Cheese)
  if (key.includes('keju') || key.includes('🧀') || key === 'cheese') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <polygon points="18,72 82,72 75,34 32,34" fill="#F1C40F" stroke="#F39C12" strokeWidth="3" />
        <polygon points="75,34 82,72 86,55" fill="#F39C12" />
        <circle cx="40" cy="52" r="5" fill="#F39C12" />
        <circle cx="62" cy="46" r="4" fill="#F39C12" />
        <circle cx="55" cy="62" r="6" fill="#F39C12" />
      </svg>
    );
  }

  // 21. Sepeda (Bicycle)
  if (key.includes('sepeda') || key.includes('🚲') || key === 'bicycle') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <circle cx="28" cy="65" r="16" fill="none" stroke="#2D3436" strokeWidth="4" />
        <circle cx="72" cy="65" r="16" fill="none" stroke="#2D3436" strokeWidth="4" />
        <polygon points="28,65 50,65 42,42 22,42" fill="none" stroke="#E74C3C" strokeWidth="3.5" />
        <line x1="50" y1="65" x2="68" y2="42" stroke="#E74C3C" strokeWidth="3.5" />
        <line x1="42" y1="42" x2="68" y2="42" stroke="#E74C3C" strokeWidth="3.5" />
        <line x1="68" y1="42" x2="72" y2="65" stroke="#E74C3C" strokeWidth="3.5" />
        <line x1="68" y1="42" x2="64" y2="34" stroke="#2D3436" strokeWidth="4" strokeLinecap="round" />
        <line x1="58" y1="34" x2="70" y2="34" stroke="#2D3436" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  // 22. Kemeja (Shirt)
  if (key.includes('kemeja') || key.includes('baju') || key.includes('👔') || key === 'shirt') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 32 26 L 50 36 L 68 26 L 82 40 L 72 50 L 68 44 L 68 84 L 32 84 L 32 44 L 28 50 L 18 40 Z" fill="#3498DB" stroke="#2980B9" strokeWidth="3" />
        <polygon points="50,36 42,26 58,26" fill="#FFFFFF" stroke="#BDC3C7" strokeWidth="1" />
        <circle cx="50" cy="48" r="2.5" fill="#FFFFFF" />
        <circle cx="50" cy="62" r="2.5" fill="#FFFFFF" />
        <circle cx="50" cy="74" r="2.5" fill="#FFFFFF" />
      </svg>
    );
  }

  // 23. Kelapa (Coconut)
  if (key.includes('kelapa') || key.includes('🥥') || key === 'coconut') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <circle cx="50" cy="55" r="32" fill="#8D5B4C" stroke="#582F0E" strokeWidth="3" />
        <circle cx="42" cy="45" r="5" fill="#582F0E" />
        <circle cx="58" cy="45" r="5" fill="#582F0E" />
        <circle cx="50" cy="62" r="6" fill="#582F0E" />
      </svg>
    );
  }

  // 24. Boneka (Doll / Teddy Bear)
  if (key.includes('boneka') || key.includes('🧸') || key === 'doll') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <circle cx="28" cy="30" r="10" fill="#D4A373" stroke="#8D5B4C" strokeWidth="2.5" />
        <circle cx="72" cy="30" r="10" fill="#D4A373" stroke="#8D5B4C" strokeWidth="2.5" />
        <circle cx="50" cy="44" r="24" fill="#D4A373" stroke="#8D5B4C" strokeWidth="3" />
        <circle cx="42" cy="40" r="3" fill="#2D3436" />
        <circle cx="58" cy="40" r="3" fill="#2D3436" />
        <ellipse cx="50" cy="48" rx="8" ry="6" fill="#FAEDCD" />
        <circle cx="50" cy="46" r="3" fill="#582F0E" />
        <ellipse cx="50" cy="74" rx="20" ry="16" fill="#D4A373" stroke="#8D5B4C" strokeWidth="3" />
        <ellipse cx="50" cy="74" rx="12" ry="10" fill="#FAEDCD" />
      </svg>
    );
  }

  // 25. Anak (Child)
  if (key.includes('anak') || key.includes('🧒') || key === 'child') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 28 35 C 28 15, 72 15, 72 35 C 72 38, 28 38, 28 35 Z" fill="#2C3E50" />
        <circle cx="50" cy="48" r="24" fill="#FFEAA7" stroke="#F39C12" strokeWidth="3" />
        <circle cx="42" cy="46" r="3" fill="#2D3436" />
        <circle cx="58" cy="46" r="3" fill="#2D3436" />
        <path d="M 46 54 Q 50 58 54 54" stroke="#E74C3C" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="36" cy="52" rx="3" ry="2" fill="#FF7675" opacity="0.6" />
        <ellipse cx="64" cy="52" rx="3" ry="2" fill="#FF7675" opacity="0.6" />
      </svg>
    );
  }

  // 26. Malam (Moon / Night)
  if (key.includes('malam') || key.includes('🌙') || key === 'moon') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 65 18 C 38 22, 22 48, 30 76 C 58 84, 82 66, 82 45 C 68 55, 50 45, 52 28 C 55 22, 60 18, 65 18 Z" fill="#F1C40F" stroke="#F39C12" strokeWidth="3" />
        <polygon points="76,22 78,28 84,30 78,32 76,38 74,32 68,30 74,28" fill="#F39C12" />
      </svg>
    );
  }

  // 27. Pasar (Market Stall)
  if (key.includes('pasar') || key.includes('toko') || key.includes('🏪') || key === 'market') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <polygon points="20,40 80,40 74,22 26,22" fill="#E74C3C" stroke="#C0392B" strokeWidth="2.5" />
        <rect x="26" y="40" width="48" height="40" fill="#FFEAA7" stroke="#D35400" strokeWidth="2.5" />
        <rect x="36" y="52" width="28" height="28" fill="#3498DB" />
      </svg>
    );
  }

  // 28. Bus (Bus)
  if (key.includes('bus') || key.includes('🚌') || key === 'bus') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <rect x="18" y="28" width="64" height="42" rx="8" fill="#F1C40F" stroke="#D35400" strokeWidth="3" />
        <rect x="24" y="34" width="16" height="14" rx="2" fill="#74B9FF" />
        <rect x="44" y="34" width="16" height="14" rx="2" fill="#74B9FF" />
        <rect x="64" y="34" width="14" height="14" rx="2" fill="#74B9FF" />
        <circle cx="32" cy="72" r="8" fill="#2D3436" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="68" cy="72" r="8" fill="#2D3436" stroke="#FFFFFF" strokeWidth="2" />
      </svg>
    );
  }

  // 29. Obat (Medicine)
  if (key.includes('obat') || key.includes('💊') || key === 'medicine') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <rect x="34" y="22" width="32" height="56" rx="16" transform="rotate(45 50 50)" fill="#E74C3C" stroke="#C0392B" strokeWidth="3" />
        <rect x="34" y="50" width="32" height="28" rx="0" transform="rotate(45 50 50)" fill="#3498DB" />
      </svg>
    );
  }

  // 30. Piring (Plate)
  if (key.includes('piring') || key.includes('🍽️') || key === 'plate') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <ellipse cx="50" cy="50" rx="36" ry="36" fill="#F8F9FA" stroke="#BDC3C7" strokeWidth="4" />
        <ellipse cx="50" cy="50" rx="24" ry="24" fill="#EDF2F7" stroke="#CBD5E0" strokeWidth="2" />
      </svg>
    );
  }

  // 31. Pisang (Banana)
  if (key.includes('pisang') || key.includes('🍌') || key === 'banana') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 28 72 C 30 40, 55 25, 78 22 C 76 34, 52 50, 36 78 Z" fill="#F1C40F" stroke="#F39C12" strokeWidth="3" />
        <path d="M 78 22 L 84 18" stroke="#795548" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  // 32. Lampu (Lightbulb / Lamp)
  if (key.includes('lampu') || key.includes('💡') || key === 'lamp') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 34 40 C 34 25, 66 25, 66 40 C 66 52, 58 56, 58 66 L 42 66 C 42 56, 34 52, 34 40 Z" fill="#F1C40F" stroke="#F39C12" strokeWidth="3" />
        <rect x="42" y="66" width="16" height="8" rx="2" fill="#BDC3C7" stroke="#7F8C8D" strokeWidth="2" />
        <ellipse cx="50" cy="76" rx="5" ry="3" fill="#7F8C8D" />
      </svg>
    );
  }

  // 33. Kursi (Chair)
  if (key.includes('kursi') || key.includes('🪑') || key === 'chair') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <rect x="32" y="16" width="36" height="34" rx="4" fill="#D35400" stroke="#A04000" strokeWidth="2.5" />
        <rect x="28" y="50" width="44" height="10" rx="3" fill="#E67E22" stroke="#A04000" strokeWidth="2.5" />
        <line x1="32" y1="60" x2="30" y2="86" stroke="#A04000" strokeWidth="4" strokeLinecap="round" />
        <line x1="68" y1="60" x2="70" y2="86" stroke="#A04000" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  // 34. Pensil (Pencil)
  if (key.includes('pensil') || key.includes('✏️') || key === 'pencil') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <polygon points="26,74 24,82 32,80" fill="#2D3436" />
        <polygon points="26,74 32,80 72,40 66,34" fill="#F1C40F" stroke="#F39C12" strokeWidth="2" />
        <polygon points="66,34 72,40 80,32 74,26" fill="#FF7675" stroke="#D63031" strokeWidth="2" />
      </svg>
    );
  }

  // 35. Pintu (Door)
  if (key.includes('pintu') || key.includes('🚪') || key === 'door') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <rect x="26" y="16" width="48" height="72" rx="4" fill="#D35400" stroke="#78281F" strokeWidth="3" />
        <rect x="32" y="24" width="36" height="26" rx="2" fill="#E59866" stroke="#78281F" strokeWidth="2" />
        <rect x="32" y="54" width="36" height="26" rx="2" fill="#E59866" stroke="#78281F" strokeWidth="2" />
        <circle cx="64" cy="54" r="3" fill="#F1C40F" stroke="#78281F" strokeWidth="1.5" />
      </svg>
    );
  }

  // 36. Nyamuk (Mosquito)
  if (key.includes('nyamuk') || key.includes('🦟') || key === 'mosquito') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <ellipse cx="50" cy="52" rx="14" ry="20" fill="#7F8C8D" stroke="#2D3436" strokeWidth="2.5" />
        <ellipse cx="36" cy="38" rx="16" ry="8" transform="rotate(-30 36 38)" fill="#BDC3C7" opacity="0.7" />
        <ellipse cx="64" cy="38" rx="16" ry="8" transform="rotate(30 64 38)" fill="#BDC3C7" opacity="0.7" />
        <circle cx="50" cy="32" r="7" fill="#2D3436" />
        <line x1="50" y1="32" x2="50" y2="18" stroke="#2D3436" strokeWidth="2" />
      </svg>
    );
  }

  // 37. Mangkuk (Bowl)
  if (key.includes('mangkuk') || key.includes('🥣') || key === 'bowl') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 20 45 C 20 78, 80 78, 80 45 Z" fill="#3498DB" stroke="#2980B9" strokeWidth="3.5" />
        <ellipse cx="50" cy="45" rx="30" ry="10" fill="#74B9FF" stroke="#2980B9" strokeWidth="3" />
        <line x1="36" y1="78" x2="64" y2="78" stroke="#2980B9" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  // 38. Mata (Eye)
  if (key.includes('mata') || key.includes('👀') || key === 'eye') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <ellipse cx="50" cy="50" rx="34" ry="22" fill="#FFFFFF" stroke="#2D3436" strokeWidth="3" />
        <circle cx="50" cy="50" r="14" fill="#3498DB" stroke="#2D3436" strokeWidth="2" />
        <circle cx="50" cy="50" r="7" fill="#2D3436" />
        <circle cx="47" cy="46" r="3" fill="#FFFFFF" />
      </svg>
    );
  }

  // Safe fallback if not matched: render the text or emoji cleanly
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

  return (
    <span className={`${sizeClasses[size]} select-none inline-flex items-center justify-center ${className}`}>
      {nameOrEmoji}
    </span>
  );
};
