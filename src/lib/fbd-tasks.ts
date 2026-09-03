export type Dir = "right" | "left" | "up" | "down";

export const FORCE_TYPES = [
  "Fgrav",
  "Fnorm",
  "Fapp",
  "Ffrict",
  "Ftens",
  "Fair",
  "Fspring",
] as const;

export type ForceType = (typeof FORCE_TYPES)[number];

export const FORCE_LABELS: Record<ForceType, string> = {
  Fgrav: "grav",
  Fnorm: "norm",
  Fapp: "app",
  Ffrict: "frict",
  Ftens: "tens",
  Fair: "air",
  Fspring: "spring",
};

export type Force = { type: ForceType; mag: 1 | 2 | 3 };

export type FbdTask = {
  /** Object name, rendered in bold inside the prompt. */
  object: string;
  /** Sentence with {obj} placeholder for the bold object name. */
  prompt: string;
  answer: Partial<Record<Dir, Force>>;
  hint: string;
};

export const TASKS: FbdTask[] = [
  {
    object: "football",
    prompt:
      "A {obj} is moving upward and rightward towards the peak of its trajectory. Ignore air resistance.",
    answer: { down: { type: "Fgrav", mag: 2 } },
    hint: "A projectile with no air resistance has only one force acting upon it: gravity.",
  },
  {
    object: "book",
    prompt: "A {obj} is at rest on a level tabletop.",
    answer: {
      down: { type: "Fgrav", mag: 2 },
      up: { type: "Fnorm", mag: 2 },
    },
    hint: "At rest means balanced forces: the upward normal force equals the downward force of gravity.",
  },
  {
    object: "crate",
    prompt:
      "A {obj} is pushed rightward across a rough floor at a constant speed.",
    answer: {
      down: { type: "Fgrav", mag: 2 },
      up: { type: "Fnorm", mag: 2 },
      right: { type: "Fapp", mag: 2 },
      left: { type: "Ffrict", mag: 2 },
    },
    hint: "Constant speed means every pair of opposite forces is equal in size.",
  },
  {
    object: "skydiver",
    prompt: "A {obj} is falling downward at a constant terminal velocity.",
    answer: {
      down: { type: "Fgrav", mag: 2 },
      up: { type: "Fair", mag: 2 },
    },
    hint: "Terminal velocity: air resistance has grown until it balances gravity.",
  },
  {
    object: "skydiver",
    prompt:
      "A {obj} has just jumped from a plane and is speeding up as she falls.",
    answer: {
      down: { type: "Fgrav", mag: 3 },
      up: { type: "Fair", mag: 1 },
    },
    hint: "Speeding up downward means the downward force of gravity is larger than air resistance.",
  },
  {
    object: "bucket",
    prompt:
      "A {obj} is attached to a rope and is being pulled upward, gaining speed as it rises.",
    answer: {
      up: { type: "Ftens", mag: 3 },
      down: { type: "Fgrav", mag: 2 },
    },
    hint: "Accelerating upward means the upward tension force is larger than gravity.",
  },
  {
    object: "car",
    prompt: "A {obj} moving rightward skids to a halt on a level road.",
    answer: {
      down: { type: "Fgrav", mag: 2 },
      up: { type: "Fnorm", mag: 2 },
      left: { type: "Ffrict", mag: 2 },
    },
    hint: "A skidding car has no applied force; friction opposes the rightward motion.",
  },
  {
    object: "picture",
    prompt: "A {obj} hangs at rest from a single vertical cable.",
    answer: {
      up: { type: "Ftens", mag: 2 },
      down: { type: "Fgrav", mag: 2 },
    },
    hint: "At rest on one cable: tension up balances gravity down.",
  },
  {
    object: "box",
    prompt:
      "A {obj} is pushed rightward across a rough floor and is speeding up.",
    answer: {
      down: { type: "Fgrav", mag: 2 },
      up: { type: "Fnorm", mag: 2 },
      right: { type: "Fapp", mag: 3 },
      left: { type: "Ffrict", mag: 1 },
    },
    hint: "Speeding up rightward means the applied force is larger than friction; vertical forces balance.",
  },
  {
    object: "elevator",
    prompt: "An {obj} is being lifted upward by a cable at a constant speed.",
    answer: {
      up: { type: "Ftens", mag: 2 },
      down: { type: "Fgrav", mag: 2 },
    },
    hint: "Constant speed means tension and gravity are equal in size.",
  },
  {
    object: "hockey puck",
    prompt: "A {obj} slides rightward across frictionless, level ice.",
    answer: {
      down: { type: "Fgrav", mag: 2 },
      up: { type: "Fnorm", mag: 2 },
    },
    hint: "Frictionless and level: only gravity and the normal force act, and they balance.",
  },
  {
    object: "baseball",
    prompt:
      "A {obj} has been thrown straight upward and is still rising. Ignore air resistance.",
    answer: { down: { type: "Fgrav", mag: 2 } },
    hint: "Once released, the only force on the ball is gravity, no matter which way it moves.",
  },
];

export const DIRS: { dir: Dir; label: string }[] = [
  { dir: "right", label: "Right" },
  { dir: "left", label: "Left" },
  { dir: "up", label: "Up" },
  { dir: "down", label: "Down" },
];
