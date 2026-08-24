const LOW_CORE_COUNT = 4;
const LOW_MEMORY_GB = 4;

/** Client-only hardware hint used to disable expensive decorative rendering. */
export function isLowPerfDevice(): boolean {
  if (typeof navigator === "undefined") return false;

  const cores = navigator.hardwareConcurrency;
  const lowCores = typeof cores === "number" && cores <= LOW_CORE_COUNT;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const lowMemory = typeof memory === "number" && memory <= LOW_MEMORY_GB;

  return lowCores || lowMemory;
}
