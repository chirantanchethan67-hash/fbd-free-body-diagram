import { Diagram } from "./Diagram";

export function SplashScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex min-h-[820px] flex-1 flex-col items-center pt-4">
      <h1 className="text-[76px] font-bold leading-none text-fbd-red">
        Free-Body Diagrams
      </h1>
      <p className="mt-6 text-[15px] font-bold text-muted-foreground">
        Version 3.2
      </p>

      <div className="mt-2 w-[300px]">
        <Diagram
          forces={{
            up: { type: "Fnorm", mag: 2 },
            down: { type: "Fgrav", mag: 2 },
            left: { type: "Ffrict", mag: 2 },
            right: { type: "Fapp", mag: 2 },
          }}
        />
      </div>

      <p className="mt-4 text-[15px] font-bold text-muted-foreground">
        Now with Task Tracker Compatibility
      </p>
      <p className="mt-8 text-[15px] font-bold text-muted-foreground">
        Learn More
      </p>

      <button
        onClick={onStart}
        className="mb-8 mt-auto border border-fbd-outline bg-fbd-button px-10 py-3 text-[21px] font-bold hover:bg-fbd-panel"
      >
        Start
      </button>
    </div>
  );
}
