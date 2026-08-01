import assert from "node:assert/strict";
import test from "node:test";

import { clearCopyReset, scheduleCopyReset } from "../components/copy-reset-timer.ts";

test("a repeated copy restarts one reset timer", (context) => {
  context.mock.timers.enable({ apis: ["setTimeout"] });
  const timer = { current: null };
  let resets = 0;

  scheduleCopyReset(timer, () => { resets += 1; });
  context.mock.timers.tick(1000);
  scheduleCopyReset(timer, () => { resets += 1; });
  context.mock.timers.tick(600);

  assert.equal(resets, 0, "the first click must not clear a newer success state");

  context.mock.timers.tick(1000);
  assert.equal(resets, 1);
  assert.equal(timer.current, null);
});

test("unmount cleanup cancels the pending copy reset", (context) => {
  context.mock.timers.enable({ apis: ["setTimeout"] });
  const timer = { current: null };
  let resets = 0;

  scheduleCopyReset(timer, () => { resets += 1; });
  clearCopyReset(timer);
  context.mock.timers.tick(1600);

  assert.equal(resets, 0);
  assert.equal(timer.current, null);
});
