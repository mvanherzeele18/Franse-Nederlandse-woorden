import { halloweenConfig } from "./halloween2026.js";

async function firebaseBase() {
  const { initializeApp, getApps, getApp } =
    await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js");

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

async function getUserAndDb() {
  const app = await firebaseBase();
  const { getFirestore } =
    await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js");
  const { getAuth } =
    await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js");

  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;

  return { db, user };
}

async function loadCandy() {
  const { db, user } = await getUserAndDb();
  const candyEl = document.getElementById("candyAmount");
  const statusEl = document.getElementById("statusMessage");

  if (!user) {
    candyEl.textContent = "–";
    statusEl.className = "status-message status-error";
    statusEl.innerHTML = `<span class="icon">⚠️</span><span class="text">Niet ingelogd.</span>`;
    return null;
  }

  const { doc, getDoc } =
    await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js");

  const ref = doc(db, "users", user.uid, "eventCurrencies", halloweenConfig.id);
  const snap = await getDoc(ref);

  const currencyName = halloweenConfig.currencyName;
  const amount = snap.exists() ? (snap.data()[currencyName] || 0) : 0;

  candyEl.textContent = amount;
  statusEl.className = "status-message status-ok";
  statusEl.innerHTML = `<span class="icon">✅</span><span class="text">Shop klaar.</span>`;

  return amount;
}

function renderShop() {
  const grid = document.getElementById("shopGrid");
  grid.innerHTML = "";

  const items = halloweenConfig.shop;
  for (const key of Object.keys(items)) {
    const item = items[key];

    const card = document.createElement("div");
    card.className = "shop-item";

    const title = document.createElement("div");
    title.className = "shop-title";
    title.textContent = item.label || key;

    const type = document.createElement("div");
    type.className = "shop-type";
    type.textContent =
      item.type === "xp" ? "XP‑boost" :
      item.type === "title" ? "Titel‑unlock" :
      "Beloning";

    const meta = document.createElement("div");
    meta.className = "shop-meta";
    meta.innerHTML = `
      <span class="shop-cost">🍬 ${item.cost} snoepjes</span>
      <span>${item.type === "xp" ? `${item.amount} XP` : item.titleName || ""}</span>
    `;

    const action = document.createElement("div");
    action.className = "shop-action";

    const btn = document.createElement("button");
    btn.className = "btn btn-primary";
    btn.textContent = "Kopen";

    btn.addEventListener("click", () => handlePurchase(item));

    action.appendChild(btn);

    card.appendChild(title);
    card.appendChild(type);
    card.appendChild(meta);
    card.appendChild(action);

    grid.appendChild(card);
  }
}

async function handlePurchase(item) {
  const statusEl = document.getElementById("statusMessage");
  statusEl.className = "status-message status-loading";
  statusEl.innerHTML = `<span class="icon">⏳</span><span class="text">Aankoop verwerken…</span>`;

  const { db, user } = await getUserAndDb();
  if (!user) {
    statusEl.className = "status-message status-error";
    statusEl.innerHTML = `<span class="icon">⚠️</span><span class="text">Je bent niet ingelogd.</span>`;
    return;
  }

  const { doc, getDoc, setDoc } =
    await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js");

  const currencyName = halloweenConfig.currencyName;
  const currencyRef = doc(db, "users", user.uid, "eventCurrencies", halloweenConfig.id);
  const currencySnap = await getDoc(currencyRef);
  let current = currencySnap.exists() ? (currencySnap.data()[currencyName] || 0) : 0;

  if (current < item.cost) {
    statusEl.className = "status-message status-error";
    statusEl.innerHTML = `<span class="icon">❌</span><span class="text">Onvoldoende snoepjes.</span>`;
    return;
  }

  current -= item.cost;
  await setDoc(currencyRef, { [currencyName]: current }, { merge: true });

  if (item.type === "xp") {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    let xp = userSnap.exists() ? (userSnap.data().xp || 0) : 0;
    xp += item.amount;
    await setDoc(userRef, { xp }, { merge: true });
  } else if (item.type === "title") {
    const achRef = doc(db, "achievements", user.uid);
    await setDoc(achRef, {
      [item.titleName]: { date: Date.now(), source: "halloween2026" }
    }, { merge: true });
  }

  document.getElementById("candyAmount").textContent = current;
  statusEl.className = "status-message status-ok";
  statusEl.innerHTML = `<span class="icon">✅</span><span class="text">Aankoop gelukt.</span>`;
}

document.getElementById("refreshBtn").addEventListener("click", () => {
  const statusEl = document.getElementById("statusMessage");
  statusEl.className = "status-message status-loading";
  statusEl.innerHTML = `<span class="icon">⏳</span><span class="text">Shop wordt vernieuwd…</span>`;
  loadCandy();
});

renderShop();
loadCandy();
