import { halloweenConfig } from "https://mvanherzeele18.github.io/Franse-Nederlandse-woorden/events/halloween2026.js";

const ALL_EVENTS = [
  halloweenConfig
  // later: christmasConfig, easterConfig, ...
];

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

export async function loadActiveEvents() {
  const app = await firebaseBase();
  const { getFirestore, doc, getDoc } = await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js");

  const db = getFirestore(app);
  const now = Date.now();
  const activeEvents = [];

  for (const event of ALL_EVENTS) {
    const snap = await getDoc(doc(db, "events", event.id));
    if (!snap.exists()) continue;

    const data = snap.data();
    if (!data.active) continue;
    if (data.start && now < data.start) continue;
    if (data.end && now > data.end) continue;

    activeEvents.push(event);
  }

  return activeEvents;
}
