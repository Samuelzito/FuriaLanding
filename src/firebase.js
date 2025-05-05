// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB4iufTHPeeUZgA0f6DpHZFT-F9gU7HgmY",
    authDomain: "furia-fanhub-36c1d.firebaseapp.com",
    projectId: "furia-fanhub-36c1d",
    storageBucket: "furia-fanhub-36c1d.appspot.com",
    messagingSenderId: "681988637824",
    appId: "1:681988637824:web:ee2994c50849e6c5f79265",
    measurementId: "G-CT5FD1EC2K"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, db, auth, analytics };
