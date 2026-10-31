import React from 'react';

export type MascotMood = 'idle' | 'happy' | 'cheering' | 'thinking' | 'eating';

interface MiloCatProps {
  mood?: MascotMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  avatarCat?: string;
  onClick?: () => void;
  className?: string;
}

export const MiloCat: React.FC<MiloCatProps> = ({
  mood = 'idle',
  size = 'md',
  avatarCat = 'milo-orange',
  onClick,
  className = '',
}) => {
  // Dimensions based on size
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-52 h-52',
    xl: 'w-64 h-64',
  };

  // Color schemes for costume / avatar variations
  const isCalico = avatarCat === 'milo-calico';
  const isWhite = avatarCat === 'milo-white';
  const isBlueCap = avatarCat === 'milo-blue-cap';

  const bodyColor = isWhite ? '#FFFFFF' : isCalico ? '#FFE4B5' : '#FF9F43';
  const strokeColor = '#2D3436';
  const bellyColor = isWhite ? '#F0F3F4' : '#FFF2DF';

  return (
    <div
      onClick={onClick}
      className={`relative inline-block cursor-pointer select-none transition-transform duration-300 ${
        mood === 'cheering' ? 'animate-bounce' : mood === 'happy' ? 'animate-pulse' : 'animate-float'
      } ${sizeMap[size]} ${className}`}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg"
      >
        {/* Tail */}
        <path
          d={
            mood === 'cheering' || mood === 'happy'
              ? 'M 140 145 C 175 140, 185 90, 160 80 C 150 75, 142 95, 145 115'
              : 'M 140 145 C 165 155, 180 135, 175 115 C 170 100, 155 120, 145 130'
          }
          fill={bodyColor}
          stroke={strokeColor}
          strokeWidth="6"
          strokeLinecap="round"
          className="transition-all duration-300"
        />

        {/* Feet / Body */}
        <ellipse
          cx="100"
          cy="142"
          rx="52"
          ry="40"
          fill={bodyColor}
          stroke={strokeColor}
          strokeWidth="6"
        />
        <ellipse cx="100" cy="148" rx="34" ry="26" fill={bellyColor} />

        {/* Calico Patches */}
        {isCalico && (
          <>
            <path
              d="M 60 130 C 55 140, 70 155, 80 150 C 75 135, 65 125, 60 130 Z"
              fill="#D35400"
            />
            <circle cx="130" cy="140" r="14" fill="#34495E" />
          </>
        )}

        {/* Paws */}
        {mood === 'cheering' ? (
          // Paws raised in victory celebration!
          <>
            <ellipse
              cx="55"
              cy="75"
              rx="12"
              ry="16"
              fill={bodyColor}
              stroke={strokeColor}
              strokeWidth="5"
              transform="rotate(-25 55 75)"
            />
            <ellipse
              cx="145"
              cy="75"
              rx="12"
              ry="16"
              fill={bodyColor}
              stroke={strokeColor}
              strokeWidth="5"
              transform="rotate(25 145 75)"
            />
          </>
        ) : mood === 'eating' ? (
          // Paw holding delicious fish snack
          <>
            <ellipse
              cx="75"
              cy="135"
              rx="12"
              ry="10"
              fill={bodyColor}
              stroke={strokeColor}
              strokeWidth="5"
            />
            <ellipse
              cx="110"
              cy="120"
              rx="13"
              ry="11"
              fill={bodyColor}
              stroke={strokeColor}
              strokeWidth="5"
            />
            {/* Small fish snack */}
            <path
              d="M 125 118 C 135 110, 145 118, 140 125 C 132 130, 120 122, 125 118 Z"
              fill="#00CEC9"
              stroke={strokeColor}
              strokeWidth="3"
            />
          </>
        ) : mood === 'thinking' ? (
          // Paw touching cheek in thought
          <>
            <ellipse
              cx="75"
              cy="142"
              rx="12"
              ry="10"
              fill={bodyColor}
              stroke={strokeColor}
              strokeWidth="5"
            />
            <ellipse
              cx="128"
              cy="105"
              rx="12"
              ry="11"
              fill={bodyColor}
              stroke={strokeColor}
              strokeWidth="5"
            />
          </>
        ) : (
          // Regular resting front paws
          <>
            <ellipse
              cx="76"
              cy="155"
              rx="12"
              ry="10"
              fill={bodyColor}
              stroke={strokeColor}
              strokeWidth="5"
            />
            <ellipse
              cx="124"
              cy="155"
              rx="12"
              ry="10"
              fill={bodyColor}
              stroke={strokeColor}
              strokeWidth="5"
            />
          </>
        )}

        {/* Head */}
        <circle
          cx="100"
          cy="92"
          r="48"
          fill={bodyColor}
          stroke={strokeColor}
          strokeWidth="6"
        />

        {/* Ears */}
        {/* Left Ear */}
        <polygon
          points="62,60 76,20 100,50"
          fill={bodyColor}
          stroke={strokeColor}
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <polygon points="68,54 77,28 92,48" fill="#FFB8B8" />

        {/* Right Ear */}
        <polygon
          points="138,60 124,20 100,50"
          fill={bodyColor}
          stroke={strokeColor}
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <polygon points="132,54 123,28 108,48" fill="#FFB8B8" />

        {/* Explorer Hat for Milo Orange or Cap for Blue Cap */}
        {!isWhite && !isCalico && (
          <g>
            <ellipse cx="100" cy="46" rx="36" ry="9" fill="#10B981" stroke={strokeColor} strokeWidth="4" />
            <path
              d="M 80 44 C 80 28, 120 28, 120 44 Z"
              fill="#059669"
              stroke={strokeColor}
              strokeWidth="4"
            />
            <circle cx="100" cy="30" r="4" fill="#FBBF24" />
          </g>
        )}

        {isBlueCap && (
          <g>
            <path d="M 68 45 C 70 20, 130 20, 132 45 Z" fill="#3B82F6" stroke={strokeColor} strokeWidth="4" />
            <ellipse cx="130" cy="45" rx="20" ry="6" fill="#1D4ED8" stroke={strokeColor} strokeWidth="3" />
          </g>
        )}

        {/* Cheeks (Blushing pink circles) */}
        <ellipse cx="68" cy="104" rx="8" ry="5" fill="#FF8E8E" opacity="0.65" />
        <ellipse cx="132" cy="104" rx="8" ry="5" fill="#FF8E8E" opacity="0.65" />

        {/* Whiskers */}
        <line x1="56" y1="96" x2="30" y2="92" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
        <line x1="56" y1="104" x2="28" y2="105" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
        <line x1="144" y1="96" x2="170" y2="92" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
        <line x1="144" y1="104" x2="172" y2="105" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />

        {/* Eyes */}
        {mood === 'happy' || mood === 'cheering' ? (
          // Joyful smiling curved eyes ^ ^
          <>
            <path
              d="M 72 88 Q 82 74 92 88"
              fill="none"
              stroke={strokeColor}
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 108 88 Q 118 74 128 88"
              fill="none"
              stroke={strokeColor}
              strokeWidth="6"
              strokeLinecap="round"
            />
          </>
        ) : mood === 'thinking' ? (
          // Wondering wide curious eyes looking up
          <>
            <circle cx="82" cy="84" r="11" fill={strokeColor} />
            <circle cx="85" cy="80" r="4.5" fill="#FFFFFF" />
            <circle cx="118" cy="84" r="11" fill={strokeColor} />
            <circle cx="121" cy="80" r="4.5" fill="#FFFFFF" />
          </>
        ) : (
          // Big adorable sparkling cartoon eyes
          <>
            <ellipse cx="82" cy="86" rx="10" ry="12" fill={strokeColor} />
            <circle cx="84" cy="82" r="4.5" fill="#FFFFFF" />
            <circle cx="80" cy="91" r="2" fill="#FFFFFF" />

            <ellipse cx="118" cy="86" rx="10" ry="12" fill={strokeColor} />
            <circle cx="120" cy="82" r="4.5" fill="#FFFFFF" />
            <circle cx="116" cy="91" r="2" fill="#FFFFFF" />
          </>
        )}

        {/* Nose */}
        <polygon points="96,98 104,98 100,103" fill="#E84393" stroke={strokeColor} strokeWidth="2" />

        {/* Mouth */}
        {mood === 'cheering' ? (
          // Open cheering joyful mouth
          <path
            d="M 92 104 Q 100 120 108 104 Z"
            fill="#FF7675"
            stroke={strokeColor}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        ) : (
          // Cute cat w-smile
          <path
            d="M 94 103 Q 97 109 100 104 Q 103 109 106 103"
            fill="none"
            stroke={strokeColor}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
};
