
  const firebaseConfig = {
    apiKey: "AIzaSyCNUArAiSRYaur1BJef9_B0DI4QvXkAOrM",
    authDomain: "blogul-liceului.firebaseapp.com",
    projectId: "blogul-liceului",
    storageBucket: "blogul-liceului.appspot.com",
    messagingSenderId: "479423852841",
    appId: "1:479423852841:web:dd96731713d466b3ae0738",
    measurementId: "G-4M4HMS5N58"
  }

function mobileMenu() {
    var x = document.getElementById("navbar");
    if (x.className === "") {
        x.className = "mobile";
    } else {
        x.className = "";
    }
}

const yearElement = document.getElementById('year');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const postareBtn = document.getElementById('postare-btn');
const salutare = document.getElementById('username');

let user = null;
let admins = ["glia3mzdXDMr1Q2OyuMZivxZQ0G3"]
//setare bazele- conectare la serviciu 
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
//referin'a la baza de date

const db = firebase.firestore();
//referinta la postarile din Baza de date

const postariDb = db.collection('postari');

//alegem provider-ul pe care ne logam: Google]
const provider = new firebase.auth.GoogleAuthProvider();

loginBtn.onclick = function() {
    console.log("logare...");
    auth.signInWithPopup(provider).then(function() {  window.location.reload(); })
}
logoutBtn.onclick = function() {
    auth.signOut()
    window.location.reload();
}

function isAdmin() {
    let admin;

    if (user == null)
    return false;

    admin = admins.includes(user.uid); // true or false
    return admin;
}

function formatDate(time) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date. getMonth() + 1;
    let day = date.getDate();

    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

    let result = day + "-" + month + "-" + year;
    return result;
}

auth.onAuthStateChanged(function(fuser) {
    user = fuser;
    console.log(user);
    if (user != null) {
        //e logat in sistem
        logoutBtn.style.display = "block";
        loginBtn.style.display = "none";

        salutare.innerHTML = "Salutare, " + user.displayName;
        if (isAdmin() == true) {
            postareBtn.style.display = 'block'
        }
        else {
            postareBtn.style.display = 'none'
        }
    }
    else {
        //nu e logat in sistem
        logoutBtn.style.display = "none";
        loginBtn.style.display = "block";
        postareBtn.style.display = 'none'
    }

    document.querySelector('body').style.display = "block";
})

if (yearElement) {
    let date = new Date();
    
    yearElement.innerHTML = date.getFullYear() + " ©";
}

