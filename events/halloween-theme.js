export function applyHalloweenTheme(activeEvents) {
  const isActive = activeEvents.some(e => e.id === "halloween2026");

  if (isActive) {
    document.body.classList.add("halloween-active");
  } else {
    document.body.classList.remove("halloween-active");
  }
}
