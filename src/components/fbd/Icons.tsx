export function StarBadge({ label }: { label: string }) {
  return (
    <span className="relative inline-flex h-11 w-11 items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <polygon
          points="50,3 61,38 98,38 68,60 79,96 50,73 21,96 32,60 2,38 39,38"
          fill="var(--fbd-yellow)"
          stroke="var(--fbd-red)"
          strokeWidth={5}
        />
      </svg>
      <span className="relative text-[13px] font-bold text-fbd-red">{label}</span>
    </span>
  );
}

export function FloppyIcon() {
  return (
    <span className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-fbd-yellow">
      <svg viewBox="0 0 48 48" className="h-10 w-10">
        <rect
          x="6"
          y="6"
          width="36"
          height="36"
          rx="2"
          fill="none"
          stroke="var(--fbd-red)"
          strokeWidth={3}
        />
        <rect x="16" y="6" width="16" height="14" fill="var(--fbd-red)" />
        <rect
          x="14"
          y="26"
          width="20"
          height="16"
          fill="none"
          stroke="var(--fbd-red)"
          strokeWidth={3}
        />
      </svg>
    </span>
  );
}

export function HelpBookIcon() {
  return (
    <span className="flex h-[74px] w-[74px] items-center justify-center">
      <svg viewBox="0 0 100 100" className="h-[70px] w-[70px]">
        <g transform="rotate(-8 50 50)">
          <rect
            x="18"
            y="12"
            width="64"
            height="76"
            fill="var(--fbd-yellow)"
            stroke="var(--fbd-ink)"
            strokeWidth={3}
          />
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={i}
              x1="22"
              y1={20 + i * 8}
              x2="78"
              y2={20 + i * 8}
              stroke="var(--fbd-ink)"
              strokeWidth={1}
            />
          ))}
          <text
            x="50"
            y="42"
            textAnchor="middle"
            fontSize="11"
            fontWeight="bold"
            fill="var(--fbd-red)"
            fontFamily="Georgia, serif"
          >
            PHYSICS
          </text>
          <text
            x="50"
            y="55"
            textAnchor="middle"
            fontSize="11"
            fontWeight="bold"
            fill="var(--fbd-red)"
            fontFamily="Georgia, serif"
          >
            HELP
          </text>
          <text
            x="50"
            y="68"
            textAnchor="middle"
            fontSize="11"
            fontWeight="bold"
            fill="var(--fbd-red)"
            fontFamily="Georgia, serif"
          >
            &amp; HINTS
          </text>
        </g>
      </svg>
    </span>
  );
}
