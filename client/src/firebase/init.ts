import { getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getFunctions, httpsCallable } from "firebase/functions"

// yes, firebase credentials are public, thats how it works lol
const firebaseConfig = {
    apiKey: "AIzaSyCs-szwiIaxWnA10oB3ahrfnSKqnZCccZo",
    authDomain: "ice-breaker-website.firebaseapp.com",
    databaseURL: "https://ice-breaker-website-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ice-breaker-website",
    storageBucket: "ice-breaker-website.appspot.com",
    messagingSenderId: "176374861101",
    appId: "1:176374861101:web:cb606bcb98832e68b357a4",
}

export const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
export const auth = getAuth(app)
const functions = getFunctions(app)

// get cloud function
export const createUserWithUsername = httpsCallable(functions, "createUserWithUsername")
export const getAverageRating = httpsCallable(functions, "getAverageRating")
