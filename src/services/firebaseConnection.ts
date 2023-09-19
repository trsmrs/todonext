
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDF9YTR3xQKavPDiOkVhyXElTa0tYEVLew",
    authDomain: "tarefas-7b078.firebaseapp.com",
    projectId: "tarefas-7b078",
    storageBucket: "tarefas-7b078.appspot.com",
    messagingSenderId: "589686934882",
    appId: "1:589686934882:web:1a33a914d39dac0441303b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp)

export { db }