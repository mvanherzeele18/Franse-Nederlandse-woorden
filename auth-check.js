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

    document.body.style.display = "block";

    document.body.innerHTML = `

<div style="

  min-height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  background:#F1F8E9;
  font-family:'DM Sans', sans-serif;
  padding:2rem;

">

  <div style="

    background:white;
    padding:3rem 2.5rem;
    border-radius:16px;
    border:3px solid #6BBE3A;
    text-align:center;
    max-width:420px;
    width:100%;
    box-shadow:0 8px 24px rgba(107,190,58,0.2);

  ">

    <h1 style="

      font-family:'Playfair Display', serif;
      color:#2E7D32;
      margin-bottom:1rem;
      font-size:2rem;

    ">

      Niet ingelogd

    </h1>

    <p style="

      color:#1B5E20;
      margin-bottom:2rem;
      line-height:1.6;

    ">

      Je moet eerst inloggen om deze pagina te bekijken.

    </p>

    <button id="loginBtn" style="

      background:#6BBE3A;
      color:white;
      border:none;
      padding:14px 28px;
      border-radius:10px;
      cursor:pointer;
      font-size:1rem;
      font-weight:600;
      transition:0.3s;

    ">

      Login

    </button>

  </div>

</div>

`;

    document.getElementById("loginBtn")
      .addEventListener("click", () => {

        window.location.href = "/login.html";

      });

  }

});
