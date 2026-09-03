import { FORCE_LABELS, type Dir, type Force } from "@/lib/fbd-tasks";

type Props = {
  forces: Partial<Record<Dir, Force>>;
  onArrowTap?: (dir: Dir) => void;
};

const CX = 170;
const CY = 150;
const BOX = 62;

function len(mag: number) {
  return 42 + mag * 24;
}

export function Diagram({ forces, onArrowTap }: Props) {
  const dirs: Dir[] = ["up", "down", "left", "right"];

  return (
    <svg viewBox="0 0 340 300" className="w-full max-w-[340px]">
      <rect
        x={CX - BOX / 2}
        y={CY - BOX / 2}
        width={BOX}
        height={BOX}
        fill="none"
        stroke="var(--fbd-outline)"
        strokeWidth={3}
      />
      <circle cx={CX} cy={CY} r={5} fill="var(--fbd-outline)" />

      {dirs.map((dir) => {
        const f = forces[dir];
        if (!f) return null;
        const L = len(f.mag);
        const head = 9;

        let x2 = CX;
        let y2 = CY;
        if (dir === "up") y2 = CY - L;
        if (dir === "down") y2 = CY + L;
        if (dir === "left") x2 = CX - L;
        if (dir === "right") x2 = CX + L;

        const tri =
          dir === "up"
            ? `${x2},${y2 - head} ${x2 - head},${y2 + head / 1.5} ${x2 + head},${y2 + head / 1.5}`
            : dir === "down"
              ? `${x2},${y2 + head} ${x2 - head},${y2 - head / 1.5} ${x2 + head},${y2 - head / 1.5}`
              : dir === "left"
                ? `${x2 - head},${y2} ${x2 + head / 1.5},${y2 - head} ${x2 + head / 1.5},${y2 + head}`
                : `${x2 + head},${y2} ${x2 - head / 1.5},${y2 - head} ${x2 - head / 1.5},${y2 + head}`;

        const lx = dir === "left" ? x2 - 14 : dir === "right" ? x2 + 14 : x2 + 12;
        const ly = dir === "up" ? y2 - 6 : dir === "down" ? y2 + 14 : y2 - 10;
        const anchor = dir === "left" ? "end" : "start";

        return (
          <g
            key={dir}
            onClick={() => onArrowTap?.(dir)}
            style={{ cursor: onArrowTap ? "pointer" : "default" }}
          >
            <line
              x1={CX}
              y1={CY}
              x2={x2}
              y2={y2}
              stroke="var(--fbd-red)"
              strokeWidth={4}
            />
            <polygon points={tri} fill="var(--fbd-red)" />
            <line
              x1={CX}
              y1={CY}
              x2={x2}
              y2={y2}
              stroke="transparent"
              strokeWidth={22}
            />
            <text
              x={lx}
              y={ly}
              textAnchor={anchor}
              fontSize={19}
              fontFamily="var(--font-fbd-stack)"
              fill="var(--fbd-ink)"
            >
              F
              <tspan fontSize={13} dy={5}>
                {FORCE_LABELS[f.type]}
              </tspan>
            </text>
          </g>
        );
      })}
    </svg>
  );
}
