// firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyCp2xHQUeMipoA44g_QyZ71dnaRHnpGJtQ",
    authDomain: "wastech-8d384.firebaseapp.com",
    projectId: "wastech-8d384",
    storageBucket: "wastech-8d384.appspot.com",
    messagingSenderId: "957838233480",
    appId: "1:957838233480:web:576ae21101e425ed0d343d"
};

// Inicializa Firebase (apenas uma vez)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
