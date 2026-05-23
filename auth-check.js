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

  appId: "1:1002919769364:web:face9ebdbe3cb1db37fe01"

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

        <div style="
          display:flex;
          gap:1rem;
          justify-content:center;
        ">

          <button id="loginBtn" style="
            background:#6BBE3A;
            color:white;
            border:none;
            padding:12px 24px;
            border-radius:8px;
            cursor:pointer;
            font-size:16px;
            font-weight:600;
            transition:all 0.3s;
          ">
            Login
          </button>

          <button id="registerBtn" style="
            background:#FDD835;
            color:#1B5E20;
            border:none;
            padding:12px 24px;
            border-radius:8px;
            cursor:pointer;
            font-size:16px;
            font-weight:600;
            transition:all 0.3s;
          ">
            Registreren
          </button>

        </div>

      </div>

    `;

    const loginBtn =
      document.getElementById("loginBtn");

    const registerBtn =
      document.getElementById("registerBtn");

    loginBtn.addEventListener("click", () => {

      window.location.href =
        "/login.html?redirect=" +
        encodeURIComponent(window.location.pathname);

    });

    registerBtn.addEventListener("click", () => {

      window.location.href =
        "/register.html";

    });

    loginBtn.addEventListener("mouseenter", () => {

      loginBtn.style.transform = "translateY(-2px)";

      loginBtn.style.boxShadow =
        "0 4px 12px rgba(107, 190, 58, 0.25)";

      loginBtn.style.background = "#81C784";

    });

    loginBtn.addEventListener("mouseleave", () => {

      loginBtn.style.transform = "translateY(0)";

      loginBtn.style.boxShadow = "none";

      loginBtn.style.background = "#6BBE3A";

    });

    registerBtn.addEventListener("mouseenter", () => {

      registerBtn.style.transform = "translateY(-2px)";

      registerBtn.style.boxShadow =
        "0 4px 12px rgba(107, 190, 58, 0.25)";

      registerBtn.style.background = "#FFE082";

    });

    registerBtn.addEventListener("mouseleave", () => {

      registerBtn.style.transform = "translateY(0)";

      registerBtn.style.boxShadow = "none";

      registerBtn.style.background = "#FDD835";

    });

  }

});
