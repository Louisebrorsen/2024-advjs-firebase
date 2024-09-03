
 import { 
  getFirestore, 
  collection, 
} from 'firebase/firestore'; //alt der kræver live data skal dette bruges - den opdaterer systemet automatisk 

import { getAuth } from 'firebase/auth'; //alt der kræver login skal dette bruges


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); /* dette er en funktion man får adgang til via fireStore.  */

const auth = getAuth(app); 



// step 3.5: create a reference to the movies collection in firebase
const moviesFirebaseCollectionRef = 'movies';

const moviesCollection = collection(db, moviesFirebaseCollectionRef)

export { auth, db, moviesCollection, moviesFirebaseCollectionRef }; //exporter disse variabler så de kan bruges i andre filer.