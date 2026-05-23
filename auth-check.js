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

    document.body.style.display = "flex";

    document.body.style.justifyContent = "center";

    document.body.style.alignItems = "center";

    document.body.style.minHeight = "100vh";

    document.body.style.background = "#F1F8E9";

    document.body.style.fontFamily = "Arial";

    document.body.innerHTML = `

      <div style="

        background:white;
        padding:3rem;
        border-radius:16px;
        border:3px solid #6BBE3A;
        text-align:center;
        max-width:400px;
        box-shadow:0 8px 24px rgba(107,190,58,0.2);

      ">

        <h1 style="

          color:#2E7D32;
          margin-bottom:1rem;

        ">

          Niet ingelogd

        </h1>

        <p style="

          color:#1B5E20;
          margin-bottom:2rem;

        ">

          Je moet eerst inloggen om deze pagina te bekijken.

        </p>

        <button id="loginBtn" style="

          background:#6BBE3A;
          color:white;
          border:none;
          padding:12px 24px;
          border-radius:8px;
          cursor:pointer;
          font-size:16px;

        ">

          Login

        </button>

      </div>

    `;

    document.getElementById("loginBtn")
      .addEventListener("click", () => {

        window.location.href =
  "https://mvanherzeele.github.io/Franse-Nederlandse-woorden/login.html?redirect=" +
  encodeURIComponent(window.location.pathname);

      });

  }

});
