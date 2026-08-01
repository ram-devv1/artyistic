export type CopyResetTimer = { current: ReturnType<typeof setTimeout> | null };

export function clearCopyReset(timer: CopyResetTimer) {
  if (timer.current === null) return;
  clearTimeout(timer.current);
  timer.current = null;
}

export function scheduleCopyReset(timer: CopyResetTimer, reset: () => void) {
  clearCopyReset(timer);
  timer.current = setTimeout(() => {
    timer.current = null;
    reset();
  }, 1600);
}
