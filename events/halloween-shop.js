import { halloweenConfig } from "./halloween2026.js";

async function firebaseBase() {
  const { initializeApp, getApps, getApp } = await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js");
  const firebaseConfig = {
    apiKey:"AIzaSyBS7uI4tD1XihrIbK2p1cNYGk4b1ipLg3o",
    authDomain:"vocabulairesite.firebaseapp.com",
    projectId:"vocabulairesite",
    storageBucket:"vocabulairesite.firebasestorage.app",
    messagingSenderId:"1002919769364",
    appId:"1:1002919769364:web:face9ebdbe3cb1db37fe01",
    measurementId:"G-5FVEW59WH3"
  };
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return app;
}

async function loadCurrency() {
  const app = await firebaseBase();
  const { getFirestore, doc, getDoc } = await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js");
  const { getAuth } = await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js");

  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;
  if (!user) {
    document.getElementById("currencyDisplay").textContent = "Niet ingelogd.";
    return 0;
  }

  const ref = doc(db, "users", user.uid, "eventCurrencies", halloweenConfig.id);
  const snap = await getDoc(ref);

  const currencyName = halloweenConfig.currencyName;
  const amount = snap.exists() ? (snap.data()[currencyName] || 0) : 0;

  document.getElementById("currencyDisplay").textContent =
    `Je hebt ${amount} ${currencyName}.`;

  return amount;
}

async function buyItem(itemId) {
  const app = await firebaseBase();
  const { getFirestore, doc, getDoc, setDoc } = await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js");
  const { getAuth } = await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js");

  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;
  if (!user) {
    alert("Je moet ingelogd zijn.");
    return;
  }

  const item = halloweenConfig.shop[itemId];
  if (!item) return;

  const currencyRef = doc(db, "users", user.uid, "eventCurrencies", halloweenConfig.id);
  const currencySnap = await getDoc(currencyRef);

  const currencyName = halloweenConfig.currencyName;
  let current = currencySnap.exists() ? (currencySnap.data()[currencyName] || 0) : 0;

  if (current < item.cost) {
    alert("Niet genoeg " + currencyName + ".");
    return;
  }

  current -= item.cost;

  await setDoc(currencyRef, { [currencyName]: current }, { merge: true });

  // Beloning toepassen
  if (item.type === "xp") {
    await addXP(item.amount);
  } else if (item.type === "title") {
    await unlockTitle(item.titleName);
  }

  alert("Aankoop voltooid!");
  await loadCurrency();
}

async function addXP(amount) {
  const app = await firebaseBase();
  const { getFirestore, doc, getDoc, setDoc } = await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js");
  const { getAuth } = await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js");

  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  let xp = snap.exists() ? (snap.data().xp || 0) : 0;

  xp += amount;

  await setDoc(ref, { xp }, { merge: true });
}

async function unlockTitle(titleName) {
  const app = await firebaseBase();
  const { getFirestore, doc, setDoc } = await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js");
  const { getAuth } = await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js");

  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;
  if (!user) return;

  await setDoc(doc(db, "achievements", user.uid), {
    [titleName]: { date: Date.now() }
  }, { merge: true });
}

function renderShop() {
  const container = document.getElementById("shopItems");
  container.innerHTML = "";

  for (const [id, item] of Object.entries(halloweenConfig.shop)) {
    const div = document.createElement("div");
    div.innerHTML = `
      <div>
        <strong>${item.label}</strong><br>
        Kost: ${item.cost} ${halloweenConfig.currencyName}
      </div>
      <button data-id="${id}">Kopen</button>
    `;
    const btn = div.querySelector("button");
    btn.addEventListener("click", () => buyItem(id));
    container.appendChild(div);
  }
}

(async function init() {
  await loadCurrency();
  renderShop();
})();
