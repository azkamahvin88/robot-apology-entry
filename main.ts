// The Robot Apology — a make.fun entry (Node 22+, standard library
// only, no network, no model calls, fully deterministic: the same
// two lines every run).
//
// The entry is a robot's apology in two lines: the mistake, then the
// lesson. The robot ran the sprinklers during a rainstorm because its
// weather feed said sunny — it trusted the feed more than the window.
// The lesson follows the mistake exactly: look out of the window
// before believing the forecast, and check the sky before watering
// the lawn. Machine habits (weather feed, forecast, watering
// schedule) with a human-scale fix; the turn lands in the second
// line, where the window outranks the feed.
//
// The two lines are written to /output/entry.txt, joined by a single
// newline, no trailing newline: 129 + 1 + 125 = 255 characters.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE1 =
  "I'm sorry I ran the sprinklers during the rainstorm because my weather feed said sunny and I trust the feed more than the window.";
const LINE2 =
  "I've learned to look out of the window before I believe the forecast, so from now on I check the sky before I water the lawn.";

// The entry is exactly the two lines joined by one newline: 255
// characters in total. Check before writing so a bad build fails
// loudly here instead of shipping an entry the gate refuses.
const ENTRY = LINE1 + '\n' + LINE2;
const chars = [...ENTRY].length;
if (chars !== 255) {
  throw new Error(`entry is ${chars} characters; expected exactly 255`);
}
if ([...LINE1].length !== 129 || [...LINE2].length !== 125) {
  throw new Error(
    `line lengths are ${[...LINE1].length} and ${[...LINE2].length}; expected 129 and 125`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim()
  ? process.env.MAKEFUN_OUTPUT_DIR
  : '/output';

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), ENTRY, 'utf8');

console.log(LINE1);
console.log(LINE2);
console.log(`wrote entry.txt (${chars} characters)`);
