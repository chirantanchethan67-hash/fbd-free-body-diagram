import { FloppyIcon, HelpBookIcon, StarBadge } from "./Icons";

type Props = {
  current: number;
  completed: boolean[];
  progress: number;
  health: number;
  onSelectTask: (i: number) => void;
  onSave: () => void;
  onHelp: () => void;
};

function Bar({
  label,
  value,
  fill,
}: {
  label: string;
  value: number;
  fill: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[13px] font-bold text-fbd-red">{label}</span>
      <div className="flex h-[210px] w-[34px] flex-col justify-end border-[3px] border-fbd-ink bg-background p-[3px]">
        <div
          className="w-full transition-all duration-300"
          style={{ height: `${value}%`, backgroundColor: fill }}
        />
      </div>
      <span className="text-[13px] font-bold">{value} %</span>
    </div>
  );
}

export function Sidebar({
  current,
  completed,
  progress,
  health,
  onSelectTask,
  onSave,
  onHelp,
}: Props) {
  return (
    <aside className="flex w-[310px] shrink-0 flex-col border-l-[3px] border-fbd-red">
      <div className="flex h-[70px] items-center justify-center border-b-[3px] border-fbd-red text-[13px]">
        Guest
      </div>

      <div className="flex flex-1 flex-col items-center gap-4 border-b-[3px] border-fbd-red py-4">
        <span className="text-[15px] font-bold text-fbd-red">ProgressReport</span>
        <div className="grid grid-cols-4 gap-x-3 gap-y-2">
          {completed.map((done, i) => {
            const label = `#${i + 1}`;
            const isCurrent = i === current;
            return (
              <button
                key={i}
                onClick={() => onSelectTask(i)}
                className="flex h-11 w-11 items-center justify-center"
                aria-label={`Task ${i + 1}`}
              >
                {done ? (
                  <StarBadge label={label} />
                ) : (
                  <span
                    className={
                      isCurrent
                        ? "flex h-11 w-[52px] items-center justify-center rounded-md border-2 border-fbd-red text-[13px] font-bold"
                        : "text-[13px] font-bold"
                    }
                  >
                    {label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-2 flex gap-10">
          <Bar label="Progress" value={progress} fill="var(--fbd-green)" />
          <Bar label="Health" value={health} fill="var(--fbd-yellow)" />
        </div>
      </div>

      <div className="flex items-start justify-around py-4">
        <button
          onClick={onSave}
          className="flex flex-col items-center gap-1 text-[13px] font-bold"
        >
          <FloppyIcon />
          Save &amp; Exit
        </button>
        <button
          onClick={onHelp}
          className="flex flex-col items-center gap-1 text-[13px] font-bold"
        >
          <HelpBookIcon />
          Help Me!
        </button>
      </div>
    </aside>
  );
}
