<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBS7uI4tD1XihrIbK2p1cNYGk4b1ipLg3o",
    authDomain: "vocabulairesite.firebaseapp.com",
    projectId: "vocabulairesite",
    storageBucket: "vocabulairesite.firebasestorage.app",
    messagingSenderId: "1002919769364",
    appId: "1:1002919769364:web:face9ebdbe3cb1db37fe01",
    measurementId: "G-5FVEW59WH3"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
