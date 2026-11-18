export function applyChristmasTheme(activeEvents = []) {
  const isActive = activeEvents.some(event => event.id === "christmas2026");
  document.body.classList.toggle("christmas-active", isActive);
}
