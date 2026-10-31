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


  // 39. Cokelat (Chocolate Bar)
  if (key.includes('cokelat') || key.includes('chocolate') || key.includes('🍫')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <rect x="22" y="24" width="56" height="56" rx="8" fill="#6D4C41" stroke="#4E342E" strokeWidth="3" />
        <path d="M 22 52 L 78 44 L 78 80 C 78 84, 74 88, 70 88 L 30 88 C 26 88, 22 84, 22 80 Z" fill="#E53935" stroke="#C62828" strokeWidth="2.5" />
        <path d="M 22 52 L 32 50 L 42 53 L 52 48 L 62 52 L 72 46 L 78 48" stroke="#FFD54F" strokeWidth="2.5" />
        <rect x="28" y="30" width="20" height="16" rx="2" fill="#8D6E63" stroke="#4E342E" strokeWidth="1.5" />
        <rect x="52" y="30" width="20" height="16" rx="2" fill="#8D6E63" stroke="#4E342E" strokeWidth="1.5" />
      </svg>
    );
  }

  // 40. Cacing (Earthworm)
  if (key.includes('cacing') || key.includes('🪱') || key === 'worm') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 20 75 Q 32 55 45 70 T 70 65 Q 82 50 80 32" stroke="#FF8A80" strokeWidth="14" strokeLinecap="round" />
        <circle cx="80" cy="32" r="10" fill="#FF8A80" />
        <circle cx="83" cy="30" r="2.5" fill="#2D3436" />
        <circle cx="76" cy="30" r="2.5" fill="#2D3436" />
        <path d="M 76 36 Q 80 39 84 36" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
        <ellipse cx="87" cy="34" rx="2" ry="1.5" fill="#FF5252" opacity="0.7" />
      </svg>
    );
  }

  // 41. Cincin (Diamond Ring)
  if (key.includes('cincin') || key.includes('💍') || key === 'ring') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <circle cx="50" cy="58" r="24" stroke="#F1C40F" strokeWidth="7" fill="none" />
        <polygon points="50,20 62,32 38,32" fill="#00D2D3" stroke="#01A3A4" strokeWidth="2" />
        <polygon points="38,32 62,32 56,38 44,38" fill="#54A0FF" />
        <circle cx="50" cy="28" r="2" fill="#FFFFFF" />
      </svg>
    );
  }

  // 42. Cumi (Squid)
  if (key.includes('cumi') || key.includes('🦑') || key === 'squid') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 50 18 C 30 18, 32 55, 34 68 L 66 68 C 68 55, 70 18, 50 18 Z" fill="#FF6B81" stroke="#ED4C67" strokeWidth="3" />
        <polygon points="50,14 36,26 64,26" fill="#ED4C67" />
        <circle cx="42" cy="52" r="5" fill="#FFFFFF" />
        <circle cx="42" cy="52" r="2.5" fill="#2D3436" />
        <circle cx="58" cy="52" r="5" fill="#FFFFFF" />
        <circle cx="58" cy="52" r="2.5" fill="#2D3436" />
        <path d="M 36 68 Q 34 85 32 90 M 44 68 Q 44 85 46 92 M 56 68 Q 56 85 54 92 M 64 68 Q 66 85 68 90" stroke="#FF6B81" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  // 43. Ceri (Cherries)
  if (key.includes('ceri') || key.includes('cherry') || key.includes('🍒')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 36 60 Q 48 35 60 22 Q 68 35 68 62" stroke="#27AE60" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M 60 22 Q 74 18 80 24 Q 72 28 60 22" fill="#2ECC71" stroke="#27AE60" strokeWidth="1.5" />
        <circle cx="34" cy="65" r="16" fill="#E74C3C" stroke="#C0392B" strokeWidth="2.5" />
        <circle cx="68" cy="65" r="16" fill="#E74C3C" stroke="#C0392B" strokeWidth="2.5" />
        <circle cx="28" cy="60" r="3.5" fill="#FFA39E" />
        <circle cx="62" cy="60" r="3.5" fill="#FFA39E" />
      </svg>
    );
  }

  // 44. Bebek (Duck)
  if (key.includes('bebek') || key.includes('🦆') || key === 'duck') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <ellipse cx="48" cy="65" rx="30" ry="20" fill="#F1C40F" stroke="#D4AC0D" strokeWidth="3" />
        <circle cx="62" cy="40" r="15" fill="#F1C40F" stroke="#D4AC0D" strokeWidth="3" />
        <ellipse cx="76" cy="42" rx="10" ry="5" fill="#E67E22" stroke="#D35400" strokeWidth="1.5" />
        <circle cx="65" cy="36" r="3" fill="#2D3436" />
        <circle cx="66" cy="35" r="1" fill="#FFFFFF" />
      </svg>
    );
  }

  // 45. Daun (Leaf)
  if (key.includes('daun') || key.includes('🍃') || key.includes('leaf')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 25 75 Q 25 30 75 25 Q 75 70 25 75 Z" fill="#2ECC71" stroke="#27AE60" strokeWidth="3" />
        <path d="M 25 75 Q 45 55 75 25" stroke="#27AE60" strokeWidth="2.5" />
        <path d="M 42 58 Q 50 62 58 64 M 52 48 Q 62 50 68 50" stroke="#27AE60" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // 46. Durian
  if (key.includes('durian') || key.includes('🍈')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <ellipse cx="50" cy="54" rx="28" ry="32" fill="#A0D468" stroke="#8CC152" strokeWidth="3" />
        <path d="M 50 22 L 50 12" stroke="#795548" strokeWidth="4" strokeLinecap="round" />
        <polygon points="26,45 20,47 26,50" fill="#8CC152" />
        <polygon points="26,60 19,63 26,66" fill="#8CC152" />
        <polygon points="74,45 80,47 74,50" fill="#8CC152" />
        <polygon points="74,60 81,63 74,66" fill="#8CC152" />
        <circle cx="42" cy="50" r="3" fill="#8CC152" />
        <circle cx="58" cy="50" r="3" fill="#8CC152" />
        <circle cx="50" cy="62" r="3" fill="#8CC152" />
      </svg>
    );
  }

  // 47. Gigi (Tooth)
  if (key.includes('gigi') || key.includes('🦷') || key === 'tooth') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 30 30 C 22 45, 22 65, 35 84 C 42 75, 46 65, 50 65 C 54 65, 58 75, 65 84 C 78 65, 78 45, 70 30 C 62 20, 38 20, 30 30 Z" fill="#FFFFFF" stroke="#BDC3C7" strokeWidth="3" />
        <circle cx="42" cy="42" r="3" fill="#2D3436" />
        <circle cx="58" cy="42" r="3" fill="#2D3436" />
        <path d="M 44 48 Q 50 54 56 48" stroke="#FF5252" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="68,26 72,20 76,26 82,30 76,34 72,40 68,34 62,30" fill="#F1C40F" />
      </svg>
    );
  }

  // 48. Gajah (Elephant)
  if (key.includes('gajah') || key.includes('🐘') || key === 'elephant') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <ellipse cx="48" cy="54" rx="26" ry="22" fill="#A4B0BE" stroke="#747D8C" strokeWidth="3" />
        <circle cx="28" cy="44" r="16" fill="#CED6E0" stroke="#747D8C" strokeWidth="2.5" />
        <path d="M 20 48 Q 12 55 10 70 Q 14 74 18 68 Q 20 56 22 52" fill="#CED6E0" stroke="#747D8C" strokeWidth="2" />
        <circle cx="26" cy="40" r="3" fill="#2D3436" />
        <circle cx="27" cy="39" r="1" fill="#FFFFFF" />
        <ellipse cx="40" cy="42" rx="9" ry="12" fill="#FFA39E" stroke="#747D8C" strokeWidth="2" />
      </svg>
    );
  }

  // 49. Gula (Sugar)
  if (key.includes('gula') || key.includes('sugar')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <rect x="25" y="42" width="26" height="26" rx="4" fill="#F8F9FA" stroke="#BDC3C7" strokeWidth="2.5" />
        <rect x="46" y="32" width="28" height="28" rx="4" fill="#FFFFFF" stroke="#BDC3C7" strokeWidth="2.5" />
        <polygon points="68,22 71,17 74,22 79,25 74,28 71,33 68,28 63,25" fill="#F1C40F" />
      </svg>
    );
  }

  // 50. Gelas (Glass)
  if (key.includes('gelas') || key.includes('glass')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 30 30 L 36 82 C 36 85, 42 88, 50 88 C 58 88, 64 85, 64 82 L 70 30 Z" fill="#E0F7FA" stroke="#00ACC1" strokeWidth="3" />
        <path d="M 33 52 L 36 80 C 37 83, 43 85, 50 85 C 57 85, 63 83, 64 80 L 67 52 Z" fill="#FF8A80" opacity="0.85" />
        <line x1="50" y1="16" x2="60" y2="70" stroke="#FFD54F" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  // 51. Hidung (Nose)
  if (key.includes('hidung') || key.includes('👃') || key === 'nose') {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 50 25 Q 56 55 64 62 Q 58 72 50 70 Q 42 72 36 62 Q 44 55 50 25" fill="#FFCCBC" stroke="#FF8A65" strokeWidth="3" />
        <circle cx="40" cy="65" r="2.5" fill="#D84315" />
        <circle cx="60" cy="65" r="2.5" fill="#D84315" />
      </svg>
    );
  }

  // 52. Hujan (Rain)
  if (key.includes('hujan') || key.includes('🌧') || key.includes('rain')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 30 52 C 24 52, 20 46, 22 40 C 24 34, 30 32, 34 34 C 36 24, 48 20, 56 26 C 62 20, 74 22, 76 30 C 82 32, 84 40, 80 46 C 82 52, 76 54, 72 52 Z" fill="#B2EBF2" stroke="#00BCD4" strokeWidth="3" />
        <line x1="36" y1="62" x2="30" y2="76" stroke="#0288D1" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1="62" x2="44" y2="76" stroke="#0288D1" strokeWidth="3" strokeLinecap="round" />
        <line x1="64" y1="62" x2="58" y2="76" stroke="#0288D1" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  // 53. Jari (Finger)
  if (key.includes('jari') || key.includes('👉') || key.includes('finger')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 25 45 L 54 45 L 75 45 C 80 45, 84 49, 84 54 C 84 59, 80 63, 75 63 L 52 63 L 52 75 C 52 80, 46 84, 40 84 L 25 84 Z" fill="#FFE0B2" stroke="#FB8C00" strokeWidth="3" />
        <line x1="52" y1="63" x2="68" y2="63" stroke="#FB8C00" strokeWidth="2.5" />
      </svg>
    );
  }

  // 54. Jerapah (Giraffe)
  if (key.includes('jerapah') || key.includes('🦒') || key.includes('giraffe')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 40 90 L 44 45 C 44 38, 48 30, 56 30 C 64 30, 68 38, 68 45 L 64 90 Z" fill="#F1C40F" stroke="#D4AC0D" strokeWidth="3" />
        <circle cx="56" cy="30" r="14" fill="#F1C40F" stroke="#D4AC0D" strokeWidth="2.5" />
        <circle cx="52" cy="28" r="2.5" fill="#2D3436" />
        <circle cx="60" cy="28" r="2.5" fill="#2D3436" />
        <ellipse cx="48" cy="62" rx="4" ry="6" fill="#D35400" />
        <ellipse cx="60" cy="74" rx="5" ry="5" fill="#D35400" />
      </svg>
    );
  }

  // 55. Jus (Juice)
  if (key.includes('jus') || key.includes('🧃') || key.includes('juice')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <rect x="30" y="30" width="40" height="58" rx="6" fill="#FFA726" stroke="#FB8C00" strokeWidth="3" />
        <circle cx="50" cy="58" r="12" fill="#FFE082" />
        <line x1="50" y1="16" x2="50" y2="30" stroke="#EF5350" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  // 56. Kipas (Fan)
  if (key.includes('kipas') || key.includes('🪭') || key.includes('fan')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 50 78 L 20 40 Q 50 18 80 40 Z" fill="#FF80AB" stroke="#C51162" strokeWidth="3" />
        <line x1="50" y1="78" x2="35" y2="32" stroke="#C51162" strokeWidth="2" />
        <line x1="50" y1="78" x2="50" y2="28" stroke="#C51162" strokeWidth="2" />
        <line x1="50" y1="78" x2="65" y2="32" stroke="#C51162" strokeWidth="2" />
        <circle cx="50" cy="78" r="4" fill="#C51162" />
      </svg>
    );
  }

  // 57. Kopi (Coffee)
  if (key.includes('kopi') || key.includes('☕') || key.includes('coffee')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <rect x="25" y="38" width="45" height="42" rx="8" fill="#8D6E63" stroke="#5D4037" strokeWidth="3" />
        <path d="M 70 46 C 80 46, 82 64, 70 66" stroke="#5D4037" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M 38 28 Q 42 22 38 16 M 52 28 Q 56 22 52 16" stroke="#BCAAA4" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 58. Labu (Pumpkin)
  if (key.includes('labu') || key.includes('🎃') || key.includes('pumpkin')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <ellipse cx="50" cy="56" rx="30" ry="24" fill="#FF9800" stroke="#E65100" strokeWidth="3" />
        <ellipse cx="50" cy="56" rx="16" ry="24" fill="#FFA726" stroke="#E65100" strokeWidth="2" />
        <path d="M 50 32 L 50 20 Q 55 18 56 16" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" fill="none" />
      </svg>
    );
  }

  // 59. Lebah (Bee)
  if (key.includes('lebah') || key.includes('🐝') || key.includes('bee')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <ellipse cx="48" cy="56" rx="24" ry="18" fill="#F1C40F" stroke="#2D3436" strokeWidth="3" />
        <path d="M 42 38 L 42 74 M 54 38 L 54 74" stroke="#2D3436" strokeWidth="5" />
        <circle cx="28" cy="52" r="2.5" fill="#2D3436" />
        <ellipse cx="45" cy="34" rx="12" ry="7" transform="rotate(-30 45 34)" fill="#E0F7FA" stroke="#00BCD4" strokeWidth="1.5" />
      </svg>
    );
  }

  // 60. Lilin (Candle)
  if (key.includes('lilin') || key.includes('🕯') || key.includes('candle')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <rect x="40" y="44" width="20" height="42" rx="3" fill="#FF80AB" stroke="#C51162" strokeWidth="2.5" />
        <line x1="50" y1="44" x2="50" y2="36" stroke="#2D3436" strokeWidth="2.5" />
        <path d="M 50 18 Q 58 26 50 36 Q 42 26 50 18 Z" fill="#FFD54F" stroke="#FF9800" strokeWidth="1.5" />
      </svg>
    );
  }

  // 61. Meja (Table)
  if (key.includes('meja') || key.includes('table')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <rect x="18" y="42" width="64" height="12" rx="3" fill="#A1887F" stroke="#5D4037" strokeWidth="3" />
        <line x1="28" y1="54" x2="28" y2="84" stroke="#5D4037" strokeWidth="5" strokeLinecap="round" />
        <line x1="72" y1="54" x2="72" y2="84" stroke="#5D4037" strokeWidth="5" strokeLinecap="round" />
      </svg>
    );
  }

  // 62. Mobil (Car)
  if (key.includes('mobil') || key.includes('🚗') || key.includes('car')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 20 62 L 25 45 Q 35 34 50 34 L 70 34 L 80 50 L 85 62 Z" fill="#E74C3C" stroke="#C0392B" strokeWidth="3" />
        <circle cx="36" cy="68" r="9" fill="#2D3436" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="68" cy="68" r="9" fill="#2D3436" stroke="#FFFFFF" strokeWidth="2" />
        <rect x="42" y="38" width="16" height="12" rx="2" fill="#E0F7FA" />
      </svg>
    );
  }

  // 63. Mulut (Mouth)
  if (key.includes('mulut') || key.includes('👄') || key.includes('mouth')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 22 50 Q 50 36 78 50 Q 50 78 22 50 Z" fill="#FF5252" stroke="#D32F2F" strokeWidth="3" />
        <path d="M 32 50 Q 50 56 68 50" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      </svg>
    );
  }

  // 64. Nanas (Pineapple)
  if (key.includes('nanas') || key.includes('🍍') || key.includes('pineapple')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <ellipse cx="50" cy="60" rx="22" ry="26" fill="#FFA726" stroke="#E65100" strokeWidth="3" />
        <path d="M 40 40 L 32 20 Q 42 26 50 38 Q 58 26 68 20 L 60 40" fill="#66BB6A" stroke="#2E7D32" strokeWidth="2" />
        <line x1="36" y1="50" x2="64" y2="70" stroke="#E65100" strokeWidth="1.5" />
        <line x1="64" y1="50" x2="36" y2="70" stroke="#E65100" strokeWidth="1.5" />
      </svg>
    );
  }

  // 65. Payung (Umbrella)
  if (key.includes('payung') || key.includes('☂') || key.includes('umbrella')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 18 52 Q 50 16 82 52 Q 66 48 50 52 Q 34 48 18 52 Z" fill="#42A5F5" stroke="#1565C0" strokeWidth="3" />
        <line x1="50" y1="26" x2="50" y2="76" stroke="#795548" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 50 76 Q 50 84 44 84" stroke="#795548" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  // 66. Pohon (Tree)
  if (key.includes('pohon') || key.includes('🌳') || key.includes('tree')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <rect x="44" y="58" width="12" height="28" rx="2" fill="#8D6E63" stroke="#4E342E" strokeWidth="2.5" />
        <circle cx="50" cy="40" r="24" fill="#66BB6A" stroke="#2E7D32" strokeWidth="3" />
        <circle cx="36" cy="44" r="14" fill="#81C784" />
        <circle cx="64" cy="44" r="14" fill="#81C784" />
      </svg>
    );
  }

  // 67. Pulau (Island)
  if (key.includes('pulau') || key.includes('🏝') || key.includes('island')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <ellipse cx="50" cy="74" rx="36" ry="12" fill="#FFE082" stroke="#FFA000" strokeWidth="2.5" />
        <path d="M 46 72 Q 48 50 54 42" stroke="#8D6E63" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M 54 42 Q 40 38 32 46 M 54 42 Q 68 38 76 46 M 54 42 Q 54 28 50 24" stroke="#43A047" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M 14 84 Q 30 80 50 84 Q 70 88 86 84" stroke="#29B6F6" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  // 68. Radio
  if (key.includes('radio') || key.includes('📻')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <line x1="30" y1="36" x2="20" y2="18" stroke="#78909C" strokeWidth="3" strokeLinecap="round" />
        <rect x="22" y="36" width="56" height="42" rx="8" fill="#FFB74D" stroke="#E65100" strokeWidth="3" />
        <circle cx="42" cy="57" r="13" fill="#FFFFFF" stroke="#E65100" strokeWidth="2" />
        <circle cx="64" cy="50" r="4" fill="#E65100" />
        <circle cx="64" cy="64" r="4" fill="#E65100" />
      </svg>
    );
  }

  // 69. Rumah (House)
  if (key.includes('rumah') || key.includes('🏠') || key.includes('house')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <polygon points="50,22 22,46 78,46" fill="#EF5350" stroke="#C62828" strokeWidth="3" />
        <rect x="28" y="46" width="44" height="38" fill="#FFF59D" stroke="#F57F17" strokeWidth="3" />
        <rect x="44" y="60" width="12" height="24" fill="#8D6E63" stroke="#4E342E" strokeWidth="2" />
        <rect x="34" y="52" width="10" height="10" fill="#E0F7FA" stroke="#00ACC1" strokeWidth="1.5" />
      </svg>
    );
  }

  // 70. Sisir (Comb)
  if (key.includes('sisir') || key.includes('comb')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <rect x="20" y="36" width="60" height="14" rx="4" fill="#AB47BC" stroke="#6A1B9A" strokeWidth="2.5" />
        <line x1="26" y1="50" x2="26" y2="70" stroke="#6A1B9A" strokeWidth="3" strokeLinecap="round" />
        <line x1="34" y1="50" x2="34" y2="70" stroke="#6A1B9A" strokeWidth="3" strokeLinecap="round" />
        <line x1="42" y1="50" x2="42" y2="70" stroke="#6A1B9A" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1="50" x2="50" y2="70" stroke="#6A1B9A" strokeWidth="3" strokeLinecap="round" />
        <line x1="58" y1="50" x2="58" y2="70" stroke="#6A1B9A" strokeWidth="3" strokeLinecap="round" />
        <line x1="66" y1="50" x2="66" y2="70" stroke="#6A1B9A" strokeWidth="3" strokeLinecap="round" />
        <line x1="74" y1="50" x2="74" y2="70" stroke="#6A1B9A" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  // 71. Sosis (Sausage)
  if (key.includes('sosis') || key.includes('🌭') || key.includes('sausage')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 22 62 Q 50 80 78 48 C 84 40, 78 30, 70 34 Q 46 62 26 48 C 18 42, 16 56, 22 62 Z" fill="#E53935" stroke="#B71C1C" strokeWidth="3" />
        <path d="M 36 54 Q 44 48 48 54 M 54 46 Q 62 40 66 46" stroke="#FFD54F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    );
  }

  // 72. Tali (Rope)
  if (key.includes('tali') || key.includes('rope')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <circle cx="50" cy="50" r="24" stroke="#D7CCC8" strokeWidth="12" fill="none" />
        <circle cx="50" cy="50" r="24" stroke="#8D6E63" strokeWidth="12" strokeDasharray="6 6" fill="none" />
      </svg>
    );
  }

  // 73. Telur (Egg)
  if (key.includes('telur') || key.includes('🥚') || key.includes('egg')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 30 46 C 24 60, 36 78, 54 78 C 72 78, 80 64, 76 48 C 72 32, 54 28, 42 34 Z" fill="#FFFFFF" stroke="#ECEFF1" strokeWidth="3" />
        <circle cx="52" cy="52" r="14" fill="#FFB300" stroke="#FFA000" strokeWidth="2" />
        <circle cx="48" cy="48" r="3" fill="#FFFFFF" opacity="0.8" />
      </svg>
    );
  }

  // 74. Tidur (Sleeping Moon)
  if (key.includes('tidur') || key.includes('moon') || key.includes('sleep')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 64 24 C 42 24, 28 42, 34 66 C 38 80, 52 86, 64 82 C 48 76, 44 52, 58 38 C 62 34, 68 30, 64 24 Z" fill="#FDD835" stroke="#FBC02D" strokeWidth="2.5" />
        <path d="M 44 54 Q 48 58 52 54" stroke="#2D3436" strokeWidth="2" strokeLinecap="round" />
        <text x="68" y="36" fill="#42A5F5" fontSize="16" fontWeight="bold">Z</text>
        <text x="76" y="24" fill="#42A5F5" fontSize="12" fontWeight="bold">z</text>
      </svg>
    );
  }

  // 75. Topi (Cap)
  if (key.includes('topi') || key.includes('🧢') || key.includes('cap')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <path d="M 26 58 C 26 36, 68 36, 68 58 Z" fill="#1E88E5" stroke="#1565C0" strokeWidth="3" />
        <path d="M 26 58 L 84 62 C 86 64, 82 68, 76 68 L 26 64 Z" fill="#1565C0" stroke="#0D47A1" strokeWidth="2" />
        <circle cx="47" cy="38" r="3" fill="#FFD54F" />
      </svg>
    );
  }

  // 76. Tupai (Squirrel)
  if (key.includes('tupai') || key.includes('🐿') || key.includes('squirrel')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <ellipse cx="44" cy="58" rx="16" ry="20" fill="#8D6E63" stroke="#5D4037" strokeWidth="2.5" />
        <circle cx="44" cy="36" r="12" fill="#8D6E63" stroke="#5D4037" strokeWidth="2.5" />
        <circle cx="48" cy="35" r="2.5" fill="#2D3436" />
        <path d="M 52 74 C 74 74, 84 50, 76 34 C 70 24, 60 28, 62 36 C 64 44, 72 48, 62 64 Z" fill="#A1887F" stroke="#5D4037" strokeWidth="2.5" />
      </svg>
    );
  }

  // 77. Ulat (Caterpillar)
  if (key.includes('ulat') || key.includes('🐛') || key.includes('caterpillar')) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <circle cx="70" cy="46" r="12" fill="#81C784" stroke="#2E7D32" strokeWidth="2.5" />
        <circle cx="54" cy="52" r="10" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="2" />
        <circle cx="40" cy="52" r="9" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="2" />
        <circle cx="28" cy="54" r="8" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="2" />
        <circle cx="74" cy="44" r="2" fill="#2D3436" />
        <line x1="72" y1="36" x2="76" y2="26" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // Mapping fallback for all Indonesian items in curriculum
  const EMOJI_MAP: Record<string, string> = {
    desa: '🏡', dinding: '🧱', ember: '🪣', gol: '⚽', hewan: '🐶',
    hotel: '🏨', joran: '🎣', kaki: '🦶', loket: '🎟️', nenek: '👵',
    nila: '🐟', nomor: '🔢', nuri: '🦜', pipi: '😊', rem: '🛑', rimba: '🌴'
  };

  if (EMOJI_MAP[key]) {
    return (
      <span className={`${sizeClasses[size]} select-none inline-flex items-center justify-center ${className}`}>
        {EMOJI_MAP[key]}
      </span>
    );
  }

  // Safe fallback if not matched or placeholder
  if (nameOrEmoji.includes('?') || nameOrEmoji === '' || /^[a-zA-Z\s]{3,}$/.test(nameOrEmoji)) {
    return (
      <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`} fill="none">
        <polygon
          points="50,15 61,38 86,38 66,54 74,78 50,63 26,78 34,54 14,38 39,38"
          fill="#F1C40F"
          stroke="#F39C12"
          strokeWidth="3"
        />
        <circle cx="50" cy="50" r="12" fill="#FFFFFF" opacity="0.6" />
      </svg>
    );
  }

  return (
    <span className={`${sizeClasses[size]} select-none inline-flex items-center justify-center ${className}`}>
      {nameOrEmoji}
    </span>
  );
};
