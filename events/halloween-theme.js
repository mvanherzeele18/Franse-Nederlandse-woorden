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
