interface ElephantMascotProps {
  size?: number
  className?: string
  animated?: boolean
}

export default function ElephantMascot({ size = 160, className = '', animated = false }: ElephantMascotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animated ? 'animate-float' : ''} ${className}`}
      aria-label="Eto, la mascotte éléphant de Sɛto"
    >
      {/* Left ear */}
      <ellipse cx="28" cy="98" rx="32" ry="38" fill="#E87040" opacity="0.9" />
      <ellipse cx="30" cy="98" rx="22" ry="26" fill="#F09060" opacity="0.6" />

      {/* Right ear */}
      <ellipse cx="172" cy="98" rx="32" ry="38" fill="#E87040" opacity="0.9" />
      <ellipse cx="170" cy="98" rx="22" ry="26" fill="#F09060" opacity="0.6" />

      {/* Body */}
      <ellipse cx="100" cy="148" rx="52" ry="46" fill="#1E3450" />

      {/* Head */}
      <circle cx="100" cy="88" r="48" fill="#1E3450" />

      {/* Forehead highlight */}
      <ellipse cx="100" cy="72" rx="24" ry="14" fill="#243B55" opacity="0.5" />

      {/* Left eye white */}
      <circle cx="82" cy="82" r="9" fill="#F0EDE8" />
      {/* Right eye white */}
      <circle cx="118" cy="82" r="9" fill="#F0EDE8" />

      {/* Left pupil */}
      <circle cx="84" cy="83" r="5.5" fill="#0D1B2E" />
      {/* Right pupil */}
      <circle cx="120" cy="83" r="5.5" fill="#0D1B2E" />

      {/* Eye highlights */}
      <circle cx="86" cy="81" r="2" fill="#F0EDE8" />
      <circle cx="122" cy="81" r="2" fill="#F0EDE8" />

      {/* Trunk */}
      <path
        d="M 92 110 Q 80 128 84 148 Q 86 158 96 156"
        stroke="#1E3450"
        strokeWidth="13"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 92 110 Q 80 128 84 148 Q 86 158 96 156"
        stroke="#243B55"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />

      {/* Trunk tip curl */}
      <circle cx="96" cy="157" r="6" fill="#243B55" />

      {/* Smile */}
      <path
        d="M 88 98 Q 100 107 112 98"
        stroke="#8BA3BC"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Left cheek blush */}
      <ellipse cx="72" cy="94" rx="10" ry="6" fill="#E87040" opacity="0.3" />
      {/* Right cheek blush */}
      <ellipse cx="128" cy="94" rx="10" ry="6" fill="#E87040" opacity="0.3" />

      {/* Legs */}
      <rect x="64" y="183" width="20" height="22" rx="8" fill="#1E3450" />
      <rect x="116" y="183" width="20" height="22" rx="8" fill="#1E3450" />
      <rect x="76" y="183" width="16" height="20" rx="6" fill="#243B55" opacity="0.5" />
      <rect x="108" y="183" width="16" height="20" rx="6" fill="#243B55" opacity="0.5" />

      {/* Tail */}
      <path
        d="M 148 145 Q 162 138 160 152 Q 158 162 164 165"
        stroke="#243B55"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* Small decorative dots on ears */}
      <circle cx="20" cy="90" r="3" fill="#FAC5A8" opacity="0.6" />
      <circle cx="26" cy="106" r="2" fill="#FAC5A8" opacity="0.5" />
      <circle cx="180" cy="90" r="3" fill="#FAC5A8" opacity="0.6" />
      <circle cx="174" cy="106" r="2" fill="#FAC5A8" opacity="0.5" />
    </svg>
  )
}
