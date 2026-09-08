// E-mails die Halloween mogen zien
const halloweenAllowed = [
  "vanherzeele.matteo@groenhoveschool.be",
  // extra e-mails hier
];

export function applyHalloweenTheme() {
  // Firebase auth ophalen
  import("https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js").then(({ getAuth, onAuthStateChanged }) => {
    const auth = getAuth();

    onAuthStateChanged(auth, user => {
      if (!user) {
        document.body.classList.remove("halloween-active");
        return;
      }

      const allowed = halloweenAllowed.includes(user.email);

      if (allowed) {
        document.body.classList.add("halloween-active");
      } else {
        document.body.classList.remove("halloween-active");
      }
    });
  });
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

// ───────────────────────────────
// VALLENDE OBJECTEN
// ───────────────────────────────

const fallImages = [
  "https://mvanherzeele18.github.io/Franse-Nederlandse-woorden/events/assets/pumpkin.png",
  "https://mvanherzeele18.github.io/Franse-Nederlandse-woorden/events/assets/candy1.png",
  "https://mvanherzeele18.github.io/Franse-Nederlandse-woorden/events/assets/candy2.png"
];

function spawnFallingObject() {
  if (!document.body.classList.contains("halloween-active")) return;

  const el = document.createElement("div");
  el.className = "halloween-fall";

  el.style.setProperty("--size", `${Math.random() * 40 + 30}px`);
  el.style.setProperty("--duration", `${Math.random() * 4 + 5}s`);

  el.style.left = `${Math.random() * 100}vw`;
  el.style.backgroundImage = `url("${fallImages[Math.floor(Math.random() * fallImages.length)]}")`;

  document.body.appendChild(el);

  setTimeout(() => el.remove(), 8000);
}

// Laat er af en toe eentje vallen
setInterval(() => {
  if (Math.random() < 0.08) spawnFallingObject(); // 8% kans per interval
}, 3000);

// ───────────────────────────────
// JUMPSCARE SPIN
// ───────────────────────────────

function spawnSpider() {
  if (!document.body.classList.contains("halloween-active")) return;

  const spider = document.createElement("div");
  spider.className = "halloween-spider";
  document.body.appendChild(spider);

  setTimeout(() => spider.remove(), 2500);
}

// Heel zeldzaam jumpscare
setInterval(() => {
  if (Math.random() < 0.005) spawnSpider(); // 0.5% kans per interval
}, 4000);
