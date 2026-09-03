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
  {
    object: "sled",
    prompt: "A {obj} is pulled rightward by a rope across a rough, level snowfield at a constant speed.",
    answer: {
      down: { type: "Fgrav", mag: 2 },
      up: { type: "Fnorm", mag: 2 },
      right: { type: "Ftens", mag: 2 },
      left: { type: "Ffrict", mag: 2 },
    },
    hint: "A rope pulls with tension; constant speed means opposite forces are equal.",
  },
  {
    object: "chandelier",
    prompt: "A {obj} hangs motionless from a chain attached to the ceiling.",
    answer: {
      up: { type: "Ftens", mag: 2 },
      down: { type: "Fgrav", mag: 2 },
    },
    hint: "Motionless means balanced: chain tension up equals gravity down.",
  },
  {
    object: "book",
    prompt: "A {obj} is being pushed rightward across a level table but is slowing down.",
    answer: {
      down: { type: "Fgrav", mag: 2 },
      up: { type: "Fnorm", mag: 2 },
      right: { type: "Fapp", mag: 1 },
      left: { type: "Ffrict", mag: 3 },
    },
    hint: "Slowing while moving rightward means the leftward friction force is larger.",
  },
  {
    object: "rock",
    prompt: "A {obj} is falling through the air and encountering air resistance while speeding up.",
    answer: {
      down: { type: "Fgrav", mag: 3 },
      up: { type: "Fair", mag: 1 },
    },
    hint: "Speeding up downward: gravity outweighs air resistance.",
  },
  {
    object: "toy car",
    prompt: "A {obj} rolls rightward across a frictionless, level surface at a constant speed.",
    answer: {
      down: { type: "Fgrav", mag: 2 },
      up: { type: "Fnorm", mag: 2 },
    },
    hint: "No friction and no push: only vertical forces act, and they balance.",
  },
  {
    object: "bucket",
    prompt: "A {obj} of water is lowered by a rope, slowing down as it approaches the ground.",
    answer: {
      up: { type: "Ftens", mag: 3 },
      down: { type: "Fgrav", mag: 2 },
    },
    hint: "Slowing while moving down means the net force points upward.",
  },
  {
    object: "box",
    prompt: "A {obj} sits at rest on a level floor while a person pushes rightward, but it does not budge.",
    answer: {
      down: { type: "Fgrav", mag: 2 },
      up: { type: "Fnorm", mag: 2 },
      right: { type: "Fapp", mag: 2 },
      left: { type: "Ffrict", mag: 2 },
    },
    hint: "At rest means all forces balance, including friction against the push.",
  },
  {
    object: "mass",
    prompt: "A {obj} hangs at rest from the bottom of a stretched vertical spring.",
    answer: {
      up: { type: "Fspring", mag: 2 },
      down: { type: "Fgrav", mag: 2 },
    },
    hint: "A stretched spring pulls upward with a spring force equal to gravity when at rest.",
  },
  {
    object: "arrow",
    prompt: "An {obj} has left the bow and is flying upward and rightward. Ignore air resistance.",
    answer: { down: { type: "Fgrav", mag: 2 } },
    hint: "After release, only gravity acts on a projectile with no air resistance.",
  },
  {
    object: "feather",
    prompt: "A {obj} drifts downward through the air at a constant slow speed.",
    answer: {
      down: { type: "Fgrav", mag: 2 },
      up: { type: "Fair", mag: 2 },
    },
    hint: "Constant speed means air resistance exactly balances gravity.",
  },
  {
    object: "truck",
    prompt: "A {obj} accelerates rightward down a level highway while experiencing air resistance.",
    answer: {
      down: { type: "Fgrav", mag: 2 },
      up: { type: "Fnorm", mag: 2 },
      right: { type: "Fapp", mag: 3 },
      left: { type: "Fair", mag: 1 },
    },
    hint: "Speeding up rightward: the forward applied force beats the backward air resistance.",
  },
  {
    object: "crate",
    prompt: "A {obj} slides leftward across a rough floor and gradually comes to a stop.",
    answer: {
      down: { type: "Fgrav", mag: 2 },
      up: { type: "Fnorm", mag: 2 },
      right: { type: "Ffrict", mag: 2 },
    },
    hint: "Friction opposes motion, so it points rightward when the crate moves leftward.",
  },
  {
    object: "balloon",
    prompt: "A helium {obj} tied to a string floats motionless above a table.",
    answer: {
      down: { type: "Ftens", mag: 2 },
      up: { type: "Fair", mag: 3 },
      // gravity also acts downward on the balloon
    },
    hint: "The buoyant air force lifts upward while the string tension and gravity pull down.",
  },
  {
    object: "wagon",
    prompt: "A {obj} is pulled rightward by a horizontal handle across a rough sidewalk and speeds up.",
    answer: {
      down: { type: "Fgrav", mag: 2 },
      up: { type: "Fnorm", mag: 2 },
      right: { type: "Ftens", mag: 3 },
      left: { type: "Ffrict", mag: 1 },
    },
    hint: "A handle or rope pull is a tension force; speeding up means it beats friction.",
  },
  {
    object: "book",
    prompt: "A {obj} is held at rest against a vertical wall by a horizontal push toward the wall.",
    answer: {
      down: { type: "Fgrav", mag: 2 },
      up: { type: "Ffrict", mag: 2 },
      right: { type: "Fapp", mag: 2 },
      left: { type: "Fnorm", mag: 2 },
    },
    hint: "The wall pushes back with a normal force, and friction along the wall holds the book up.",
  },
  {
    object: "ball",
    prompt: "A {obj} is at the very peak of its trajectory after being thrown. Ignore air resistance.",
    answer: { down: { type: "Fgrav", mag: 2 } },
    hint: "Even at the peak, gravity is still the only force acting.",
  },
  {
    object: "block",
    prompt: "A {obj} is compressed against a horizontal spring on a frictionless table and is pushed rightward.",
    answer: {
      down: { type: "Fgrav", mag: 2 },
      up: { type: "Fnorm", mag: 2 },
      right: { type: "Fspring", mag: 2 },
    },
    hint: "The spring supplies the horizontal push; there is no friction to oppose it.",
  },
  {
    object: "climber",
    prompt: "A {obj} hangs at rest from a rope, gripping it with both hands.",
    answer: {
      up: { type: "Ftens", mag: 2 },
      down: { type: "Fgrav", mag: 2 },
    },
    hint: "The rope's tension balances the climber's weight.",
  },
];

export const DIRS: { dir: Dir; label: string }[] = [
  { dir: "right", label: "Right" },
  { dir: "left", label: "Left" },
  { dir: "up", label: "Up" },
  { dir: "down", label: "Down" },
];
