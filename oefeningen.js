// oefeningen.js
// Gebruik:
// <body data-jaar="3dejaar" data-dossier="1" data-richting="nl-fr">
// <script type="module" src="/Franse-Nederlandse-woorden/oefeningen.js"></script>

const firebaseConfig = {
  apiKey: "AIzaSyBS7uI4tD1XihrIbK2p1cNYGk4b1ipLg3o",
  authDomain: "vocabulairesite.firebaseapp.com",
  projectId: "vocabulairesite",
  storageBucket: "vocabulairesite.firebasestorage.app",
  messagingSenderId: "1002919769364",
  appId: "1:1002919769364:web:face9ebdbe3cb1db37fe01",
  measurementId: "G-5FVEW59WH3"
};

const jaar = document.body.dataset.jaar;
const dossier = document.body.dataset.dossier;
const richting = document.body.dataset.richting;

if (!jaar || !dossier || !richting) {
  throw new Error(
    "De oefenpagina mist data-jaar, data-dossier of data-richting."
  );
}

let words = [];
let currentIndex = 0;
let score = 0;
let answered = false;
let activeEvents = [];
let startTime = Date.now();

const multiplayerCode = localStorage.getItem("multiplayerCode");

const isNlFr = richting === "nl-fr";

const sourcePage = isNlFr
  ? "nederlands-frans.html"
  : "frans-nederlands.html";

const questionKey = isNlFr ? "nl" : "fr";
const answerKey = isNlFr ? "fr" : "nl";


// ===============================
// FIREBASE
// ===============================

async function firebaseBase() {
  const {
    initializeApp,
    getApps,
    getApp
  } = await import(
    "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js"
  );

  return getApps().length
    ? getApp()
    : initializeApp(firebaseConfig);
}


async function getCurrentUser() {
  const app = await firebaseBase();

  const {
    getAuth,
    onAuthStateChanged
  } = await import(
    "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js"
  );

  const auth = getAuth(app);

  if (auth.currentUser) {
    return auth.currentUser;
  }

  return new Promise(resolve => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe();
      resolve(user);
    });
  });
}


// ===============================
// HTML ELEMENTEN
// ===============================

function getElements() {
  return {
    word: document.getElementById(
      isNlFr ? "dutchWord" : "frenchWord"
    ),

    answer: document.getElementById("answer"),

    feedback: document.getElementById("feedback"),

    checkBtn: document.getElementById("checkBtn"),

    nextBtn: document.getElementById("nextBtn"),

    score: document.getElementById("score"),

    total: document.getElementById("total"),

    progressBar: document.getElementById("progressBar"),

    progressText: document.getElementById("progressText"),

    completionMessage:
      document.getElementById("completionMessage"),

    finalScore:
      document.getElementById("finalScore"),

    candyPopup:
      document.getElementById("candyPopup")
  };
}


// ===============================
// EVENTS
// ===============================

async function loadEvents() {
  try {
    const {
      loadActiveEvents
    } = await import(
      "https://mvanherzeele18.github.io/Franse-Nederlandse-woorden/events/events-loader.js"
    );

    activeEvents = await loadActiveEvents();

    const {
      applyHalloweenTheme
    } = await import(
      "https://mvanherzeele18.github.io/Franse-Nederlandse-woorden/events/halloween-theme.js"
    );

    applyHalloweenTheme(activeEvents);

    console.log("Actieve events:", activeEvents);

  } catch (error) {
    console.error(
      "Events konden niet geladen worden:",
      error
    );

    activeEvents = [];
  }
}


// ===============================
// WOORDEN LADEN
// ===============================

async function loadWords() {
  const url =
    `https://mvanherzeele18.github.io/Franse-Nederlandse-woorden/${jaar}/${sourcePage}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Woordenpagina kon niet geladen worden: ${response.status}`
      );
    }

    const html = await response.text();

    const parser = new DOMParser();

    const doc = parser.parseFromString(
      html,
      "text/html"
    );

    const section = doc.querySelector(
      `[data-dossier="${CSS.escape(dossier)}"]`
    );

    if (!section) {
      throw new Error(
        `Dossier ${dossier} niet gevonden in ${jaar}/${sourcePage}`
      );
    }

    const cards =
      section.querySelectorAll(".word-card");

    words = [];

    cards.forEach(card => {

      const nl =
        card.querySelector(".nl")?.textContent.trim();

      const fr =
        card.querySelector(".fr")?.textContent.trim();

      if (nl && fr) {
        words.push({
          nl,
          fr
        });
      }

    });

    shuffle(words);

    const elements = getElements();

    if (elements.total) {
      elements.total.textContent =
        words.length;
    }

    showWord();

  } catch (error) {

    console.error(
      "Fout bij laden van woorden:",
      error
    );

    const elements = getElements();

    if (elements.word) {
      elements.word.textContent =
        "Woorden konden niet geladen worden.";
    }
  }
}


// ===============================
// SHUFFLE
// ===============================

function shuffle(array) {

  for (
    let i = array.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(Math.random() * (i + 1));

    [
      array[i],
      array[j]
    ] = [
      array[j],
      array[i]
    ];
  }
}


// ===============================
// WOORD TONEN
// ===============================

function showWord() {

  const elements = getElements();

  if (currentIndex >= words.length) {
    showCompletion();
    return;
  }

  const word =
    words[currentIndex];

  if (elements.word) {
    elements.word.textContent =
      word[questionKey];
  }

  if (elements.answer) {

    elements.answer.value = "";

    elements.answer.focus();
  }

  answered = false;

  elements.feedback?.classList.add(
    "hidden"
  );

  if (elements.checkBtn) {

    elements.checkBtn.style.display =
      "block";

    elements.checkBtn.disabled =
      false;
  }

  if (elements.nextBtn) {
    elements.nextBtn.style.display =
      "none";
  }

  updateProgress();
}


// ===============================
// VOORTGANG
// ===============================

function updateProgress() {

  const elements = getElements();

  const progress =
    words.length
      ? (currentIndex / words.length) * 100
      : 0;

  if (elements.progressBar) {

    elements.progressBar.style.width =
      progress + "%";
  }

  if (elements.progressText) {

    elements.progressText.textContent =
      `${currentIndex} / ${words.length}`;
  }
}


// ===============================
// XP
// ===============================

async function addXP(amount) {

  try {

    const app =
      await firebaseBase();

    const {
      getFirestore,
      doc,
      getDoc,
      setDoc
    } = await import(
      "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js"
    );

    const user =
      await getCurrentUser();

    if (!user) {
      console.warn(
        "Geen ingelogde gebruiker."
      );

      return;
    }

    const db =
      getFirestore(app);

    const ref =
      doc(
        db,
        "users",
        user.uid
      );

    const snap =
      await getDoc(ref);

    const currentXP =
      snap.exists()
        ? Number(snap.data().xp) || 0
        : 0;

    await setDoc(
      ref,
      {
        xp: currentXP + amount
      },
      {
        merge: true
      }
    );

    console.log(
      `+${amount} XP`
    );

  } catch (error) {

    console.error(
      "XP kon niet worden opgeslagen:",
      error
    );
  }
}


// ===============================
// EVENT BELONING
// ===============================

function giveEventCurrency(eventConfig) {

  const chances =
    Array.isArray(
      eventConfig.rewardChances
    )
      ? eventConfig.rewardChances
      : [1];

  return chances[
    Math.floor(
      Math.random() * chances.length
    )
  ];
}


async function addEventCurrency(
  eventConfig,
  amount
) {

  if (amount <= 0) {
    return;
  }

  try {

    const app =
      await firebaseBase();

    const {
      getFirestore,
      doc,
      getDoc,
      setDoc
    } = await import(
      "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js"
    );

    const user =
      await getCurrentUser();

    if (!user) {
      return;
    }

    const db =
      getFirestore(app);

    const ref =
      doc(
        db,
        "users",
        user.uid,
        "eventCurrencies",
        eventConfig.id
      );

    const snap =
      await getDoc(ref);

    const currencyName =
      eventConfig.currencyName;

    const current =
      snap.exists()
        ? Number(
            snap.data()[currencyName]
          ) || 0
        : 0;

    await setDoc(
      ref,
      {
        [currencyName]:
          current + amount
      },
      {
        merge: true
      }
    );

  } catch (error) {

    console.error(
      "Eventbeloning kon niet worden opgeslagen:",
      error
    );
  }
}


// ===============================
// CANDY POPUP
// ===============================

function showCandyPopup(amount) {

  const elements =
    getElements();

  if (!elements.candyPopup) {
    return;
  }

  elements.candyPopup.textContent =
    `🎃 +${amount} snoepjes!`;

  elements.candyPopup.classList.remove(
    "hidden"
  );

  setTimeout(() => {

    elements.candyPopup.classList.add(
      "show"
    );

  }, 10);

  setTimeout(() => {

    elements.candyPopup.classList.remove(
      "show"
    );

  }, 2000);
}


// ===============================
// ANTWOORD CONTROLEREN
// ===============================

async function checkAnswer() {

  if (
    answered ||
    !words[currentIndex]
  ) {
    return;
  }

  const elements =
    getElements();

  const userAnswer =
    elements.answer?.value
      .toLowerCase()
      .trim() || "";

  const correctAnswer =
    words[currentIndex][answerKey]
      .toLowerCase()
      .trim();

  answered = true;

  if (
    userAnswer === correctAnswer
  ) {

    score++;

    // XP
    await addXP(5);

    // Multiplayer
    await updateMultiplayerScore();

    // Events
    for (
      const event of activeEvents
    ) {

      const reward =
        giveEventCurrency(event);

      await addEventCurrency(
        event,
        reward
      );

      showCandyPopup(
        reward
      );
    }

    if (elements.feedback) {

      elements.feedback.textContent =
        "Juist! Goed gedaan!";

      elements.feedback.className =
        "feedback correct";
    }

  } else {

    if (elements.feedback) {

      elements.feedback.textContent =
        `Niet juist. Het juiste antwoord is: "${words[currentIndex][answerKey]}"`;

      elements.feedback.className =
        "feedback incorrect";
    }
  }

  elements.feedback?.classList.remove(
    "hidden"
  );

  if (elements.score) {

    elements.score.textContent =
      score;
  }

  if (elements.checkBtn) {

    elements.checkBtn.style.display =
      "none";
  }

  if (elements.nextBtn) {

    elements.nextBtn.style.display =
      "block";
  }
}


// ===============================
// VOLGENDE WOORD
// ===============================

function nextWord() {

  currentIndex++;

  showWord();
}


// ===============================
// EINDE OEFENING
// ===============================

async function showCompletion() {

  if (!words.length) {
    return;
  }

  const elements =
    getElements();

  const percentage =
    Math.round(
      (score / words.length) * 100
    );

  // Voltooiingsbonus
  await addXP(25);

  await updateMultiplayerScore();

  await finishMultiplayer();

  if (elements.finalScore) {

    elements.finalScore.textContent =
      percentage + "%";
  }

  if (elements.completionMessage) {

    elements.completionMessage.classList.add(
      "show"
    );
  }

  document
    .querySelector(".word-display")
    ?.style.setProperty(
      "display",
      "none"
    );

  document
    .querySelector(".input-group")
    ?.style.setProperty(
      "display",
      "none"
    );

  document
    .querySelector(".button-group")
    ?.style.setProperty(
      "display",
      "none"
    );

  elements.feedback?.classList.add(
    "hidden"
  );
}


// ===============================
// MULTIPLAYER
// ===============================

async function updateMultiplayerScore() {

  if (!multiplayerCode) {
    return;
  }

  try {

    const app =
      await firebaseBase();

    const {
      getFirestore,
      doc,
      updateDoc
    } = await import(
      "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js"
    );

    const user =
      await getCurrentUser();

    if (!user) {
      return;
    }

    const db =
      getFirestore(app);

    await updateDoc(
      doc(
        db,
        "multiplayerGames",
        multiplayerCode,
        "players",
        user.uid
      ),
      {
        score
      }
    );

  } catch (error) {

    console.error(
      "Multiplayer-score kon niet worden opgeslagen:",
      error
    );
  }
}


async function finishMultiplayer() {

  if (!multiplayerCode) {
    return;
  }

  try {

    const app =
      await firebaseBase();

    const {
      getFirestore,
      doc,
      updateDoc
    } = await import(
      "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js"
    );

    const user =
      await getCurrentUser();

    if (!user) {
      return;
    }

    const db =
      getFirestore(app);

    await updateDoc(
      doc(
        db,
        "multiplayerGames",
        multiplayerCode,
        "players",
        user.uid
      ),
      {
        score,
        finished: true,
        time:
          Date.now() - startTime
      }
    );

    localStorage.removeItem(
      "multiplayerCode"
    );

  } catch (error) {

    console.error(
      "Multiplayer-oefening kon niet worden afgesloten:",
      error
    );
  }
}


// ===============================
// KNOPPEN
// ===============================

function bindControls() {

  const elements =
    getElements();

  elements.checkBtn
    ?.addEventListener(
      "click",
      checkAnswer
    );

  elements.nextBtn
    ?.addEventListener(
      "click",
      nextWord
    );

  elements.answer
    ?.addEventListener(
      "keydown",
      event => {

        if (event.key !== "Enter") {
          return;
        }

        event.preventDefault();

        if (!answered) {

          checkAnswer();

        } else {

          nextWord();

        }
      }
    );
}


// ===============================
// START
// ===============================

async function initExercise() {

  try {

    await loadEvents();

    await loadWords();

    document.body.style.display =
      "flex";

  } catch (error) {

    console.error(
      "Oefening kon niet starten:",
      error
    );
  }
}

bindControls();

initExercise();
