import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Diagram } from "@/components/fbd/Diagram";
import { Sidebar } from "@/components/fbd/Sidebar";
import {
  DIRS,
  FORCE_LABELS,
  FORCE_TYPES,
  TASKS,
  type Dir,
  type Force,
  type ForceType,
} from "@/lib/fbd-tasks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Free-Body Diagrams with Task Tracker" },
      {
        name: "description",
        content:
          "Build free-body diagrams for 12 physics scenarios: pick force directions, name the force types, size the arrows, and check your answer.",
      },
      { property: "og:title", content: "Free-Body Diagrams with Task Tracker" },
      {
        property: "og:description",
        content:
          "Interactive free-body diagram practice with a 12-task progress tracker, health bar, and instant feedback.",
      },
    ],
  }),
  component: Index,
});

type Forces = Partial<Record<Dir, Force>>;
type Feedback =
  | { kind: "types" }
  | { kind: "mags" }
  | { kind: "empty" }
  | { kind: "correct" }
  | { kind: "hint"; text: string }
  | { kind: "saved" }
  | null;

const STORAGE_KEY = "fbd-task-tracker";

function Index() {
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState<boolean[]>(
    Array(TASKS.length).fill(false),
  );
  const [health, setHealth] = useState(100);
  const [forces, setForces] = useState<Forces>({});
  const [selectedDir, setSelectedDir] = useState<Dir | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const s = JSON.parse(raw);
      if (Array.isArray(s.completed) && s.completed.length === TASKS.length) {
        setCompleted(s.completed);
        setHealth(typeof s.health === "number" ? s.health : 100);
        setCurrent(typeof s.current === "number" ? s.current : 0);
      }
    } catch {
      /* ignore corrupt saves */
    }
  }, []);

  const task = TASKS[current]!;
  const done = completed.filter(Boolean).length;
  const progress = Math.round((done / TASKS.length) * 100);

  function goToTask(i: number) {
    setCurrent(i);
    setForces({});
    setSelectedDir(null);
    setFeedback(null);
  }

  function setForceType(type: ForceType) {
    if (!selectedDir) return;
    setForces((prev) => ({ ...prev, [selectedDir]: { type, mag: 2 } }));
    setSelectedDir(null);
  }

  function removeForce() {
    if (!selectedDir) return;
    setForces((prev) => {
      const next = { ...prev };
      delete next[selectedDir];
      return next;
    });
    setSelectedDir(null);
  }

  function cycleMag(dir: Dir) {
    setForces((prev) => {
      const f = prev[dir];
      if (!f) return prev;
      const mag = ((f.mag % 3) + 1) as 1 | 2 | 3;
      return { ...prev, [dir]: { ...f, mag } };
    });
  }

  function checkAnswer() {
    const answer = task.answer;
    const drawn = Object.keys(forces) as Dir[];
    if (drawn.length === 0) {
      setFeedback({ kind: "empty" });
      return;
    }

    const answerDirs = Object.keys(answer) as Dir[];
    const typesOk =
      drawn.length === answerDirs.length &&
      answerDirs.every((d) => forces[d]?.type === answer[d]!.type);

    if (!typesOk) {
      setHealth((h) => Math.max(0, h - 2));
      setFeedback({ kind: "types" });
      return;
    }

    const magsOk = answerDirs.every(
      (d) => forces[d]!.mag === answer[d]!.mag,
    );
    if (!magsOk) {
      setHealth((h) => Math.max(0, h - 2));
      setFeedback({ kind: "mags" });
      return;
    }

    setCompleted((prev) => {
      const next = [...prev];
      next[current] = true;
      return next;
    });
    setFeedback({ kind: "correct" });
  }

  function save() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ completed, health, current }),
    );
    setFeedback({ kind: "saved" });
  }

  function dismiss() {
    if (feedback?.kind === "correct") {
      const nextIdx = completed.findIndex((c, i) => !c && i !== current);
      setFeedback(null);
      goToTask(nextIdx === -1 ? current : nextIdx);
      return;
    }
    setFeedback(null);
  }

  const promptParts = task.prompt.split("{obj}");

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4 font-fbd text-fbd-ink">
      <div className="flex w-full max-w-[1180px] border-[3px] border-fbd-ink">
        {/* Left: activity */}
        <section className="flex min-w-0 flex-1 flex-col">
          <h1 className="border-b-[3px] border-fbd-ink px-3 py-2 text-[17px] font-bold text-fbd-red">
            Free-Body Diagrams with Task Tracker
          </h1>

          <div className="m-2 flex flex-1 flex-col border border-fbd-outline p-3">
            <h2 className="text-[27px] leading-tight">
              {promptParts[0]}
              <strong>{task.object}</strong>
              {promptParts[1]}
            </h2>

            <p className="mt-8 text-center text-[17px] leading-snug">
              Identify the type of forces and their relative magnitude.
              <br />
              Tap a direction and ID the force type. Tap an arrow on the diagram
              to change the size of the force. Tap Check Answer when ready.
            </p>

            <div className="mt-6 grid flex-1 grid-cols-2 gap-4">
              {/* controls / feedback */}
              <div className="relative">
                {feedback ? (
                  <FeedbackPanel feedback={feedback} onDismiss={dismiss} />
                ) : (
                  <div>
                    <p className="mb-2 text-[17px]">
                      {selectedDir
                        ? "Identify the force type:"
                        : "Select a direction:"}
                    </p>
                    {selectedDir ? (
                      <div className="flex flex-wrap gap-2">
                        {FORCE_TYPES.map((t) => (
                          <button
                            key={t}
                            onClick={() => setForceType(t)}
                            className="border border-fbd-outline bg-fbd-button px-3 py-1 text-[17px] hover:bg-fbd-panel"
                          >
                            F<sub>{FORCE_LABELS[t]}</sub>
                          </button>
                        ))}
                        <button
                          onClick={removeForce}
                          className="border border-fbd-outline bg-fbd-button px-3 py-1 text-[17px] hover:bg-fbd-panel"
                        >
                          None
                        </button>
                        <button
                          onClick={() => setSelectedDir(null)}
                          className="border border-fbd-outline bg-fbd-button px-3 py-1 text-[17px] hover:bg-fbd-panel"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {DIRS.map((d) => (
                          <button
                            key={d.dir}
                            onClick={() => setSelectedDir(d.dir)}
                            className="min-w-[86px] border border-fbd-outline bg-background px-4 py-1 text-[19px] hover:bg-fbd-button"
                          >
                            {d.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* diagram */}
              <div className="flex flex-col items-center">
                <p className="self-start text-[19px] font-bold">
                  Free-Body Diagram:
                </p>
                <Diagram forces={forces} onArrowTap={cycleMag} />
              </div>
            </div>

            <div className="mt-2 flex justify-end">
              {!feedback && (
                <button
                  onClick={checkAnswer}
                  className="border border-fbd-outline bg-fbd-button px-8 py-3 text-[21px] font-bold hover:bg-fbd-panel"
                >
                  Check Answer
                </button>
              )}
            </div>
          </div>
        </section>

        <Sidebar
          current={current}
          completed={completed}
          progress={progress}
          health={health}
          onSelectTask={goToTask}
          onSave={save}
          onHelp={() => setFeedback({ kind: "hint", text: task.hint })}
        />
      </div>
    </main>
  );
}

function FeedbackPanel({
  feedback,
  onDismiss,
}: {
  feedback: NonNullable<Feedback>;
  onDismiss: () => void;
}) {
  const lines: string[] =
    feedback.kind === "types"
      ? [
          "Drats! Your FBD has errors.",
          "To begin with, you need to correct your Force Types. One or more of the Force Types you have chosen is incorrect.",
          "Please try again.",
        ]
      : feedback.kind === "mags"
        ? [
            "Drats! Your FBD has errors.",
            "Your Force Types are correct, but the relative sizes of one or more forces are wrong. Tap an arrow to resize it.",
            "Please try again.",
          ]
        : feedback.kind === "empty"
          ? [
              "Hold on!",
              "Your free-body diagram is empty. Tap a direction and identify the force type acting that way.",
            ]
          : feedback.kind === "correct"
            ? [
                "Nice work! Your FBD is correct.",
                "You have earned a star for this task.",
              ]
            : feedback.kind === "saved"
              ? ["Progress saved.", "Come back any time to keep practicing."]
              : ["Help & Hints", feedback.text];

  return (
    <div className="flex h-full min-h-[300px] flex-col justify-between bg-fbd-panel p-6">
      <div className="space-y-6 text-center text-[19px] leading-snug text-fbd-red">
        {lines.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
      </div>
      <div className="mt-6">
        <button
          onClick={onDismiss}
          className="border border-fbd-outline bg-fbd-button px-6 py-3 text-[19px] font-bold hover:bg-background"
        >
          OK. I Got This!
        </button>
      </div>
    </div>
  );
}
