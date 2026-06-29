import {

initializeApp,
getApps,
getApp

}

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {

getFirestore,
doc,
getDoc,
setDoc

}

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {

getAuth

}

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const firebaseConfig={

apiKey:"AIzaSyBS7uI4tD1XihrIbK2p1cNYGk4b1ipLg3o",
authDomain:"vocabulairesite.firebaseapp.com",
projectId:"vocabulairesite",
storageBucket:"vocabulairesite.firebasestorage.app",
messagingSenderId:"1002919769364",
appId:"1:1002919769364:web:face9ebdbe3cb1db37fe01"

};

const app=

getApps().length
?getApp()
:initializeApp(firebaseConfig);

const db=
getFirestore(app);

const auth=
getAuth(app);

export async function tryChristmasGift(){

// Slechts 5% kans op een pakje

if(Math.random()>0.05){

return;

}
window.tryChristmasGift = tryChristmasGift;

const user=
auth.currentUser;

if(!user) return;

const random=
Math.random()*100;

let xp=0;

let title=null;

if(random<65){

xp=10;

}else if(random<85){

xp=50;

}else if(random<95){

xp=100;

}else{

title="Kerstman";

}

const userRef=
doc(db,"users",user.uid);

const snap=
await getDoc(userRef);

let data={};

if(snap.exists()){

data=snap.data();

}

data.xp=(data.xp||0)+xp;

await setDoc(

userRef,

data,

{merge:true}

);

if(title){

await setDoc(

doc(db,"titles",user.uid),

{

christmas2026:true

},

{merge:true}

);

alert("🎅 Je hebt de exclusieve titel Kerstman gekregen!");

}else{

alert("🎁 Cadeautje!\n+"+xp+" XP");

}

}
