// ───────────────────────────────
// E-mails die Halloween mogen zien
// ───────────────────────────────
const halloweenAllowed = [
  "vanherzeele.matteo@groenhoveschool.be",
];

// ───────────────────────────────
// Activeer Halloween-thema
// ───────────────────────────────
export function applyHalloweenTheme(user) {
  if (!user) return;

  const isAllowed = halloweenAllowed.includes(user.email);

  if (isAllowed) {
    document.body.classList.add("halloween-active");
  } else {
    document.body.classList.remove("halloween-active");
  }
}



//export function applyHalloweenTheme(activeEvents) {
//  const isActive = activeEvents.some(e => e.id === "halloween2026");
//
//  if (isActive) {
//    document.body.classList.add("halloween-active");
//  } else {
//    document.body.classList.remove("halloween-active");
//  }
//}
