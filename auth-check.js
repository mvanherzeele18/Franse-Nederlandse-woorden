import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBS7uI4tD1XihrIbK2p1cNYGk4b1ipLg3o",
  authDomain: "vocabulairesite.firebaseapp.com",
  projectId: "vocabulairesite",
  storageBucket: "vocabulairesite.firebasestorage.app",
  messagingSenderId: "1002919769364",
  appId: "1:1002919769364:web:face9ebdbe3cb1db37fe01",
  measurementId: "G-5FVEW59WH3"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {

  if (user) {

    document.body.style.display = "block";

  } else {

    window.location.href = "/login.html";

  }

});
