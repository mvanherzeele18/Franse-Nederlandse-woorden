export function applyHalloweenTheme(activeEvents) {
  if (!activeEvents || activeEvents.length === 0) {
    document.body.classList.remove("halloween-active");
    return;
  }

  // Als Halloween actief is → thema aan
  if (activeEvents.some(e => e.id === "halloween2026")) {
    document.body.classList.add("halloween-active");
  }
}
