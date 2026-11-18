import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { loadActiveEvents } from "./events-loader.js";
import { applyHalloweenTheme } from "./halloween-theme.js";
import { applyChristmasTheme } from "./christmas-theme.js";

const firebaseConfig = {
  apiKey: "AIzaSyBS7uI4tD1XihrIbK2p1cNYGk4b1ipLg3o",
  authDomain: "vocabulairesite.firebaseapp.com",
  projectId: "vocabulairesite",
  storageBucket: "vocabulairesite.firebasestorage.app",
  messagingSenderId: "1002919769364",
  appId: "1:1002919769364:web:face9ebdbe3cb1db37fe01"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, async user => {
  try {
    const events = await loadActiveEvents(user);
    applyHalloweenTheme(events);
    applyChristmasTheme(events);
  } catch (error) {
    console.error("Eventthema kon niet geladen worden:", error);
  }
});
