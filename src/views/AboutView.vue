<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input type="text" v-model="newMovieTitle" placeholder="Add a new movie" />
    <button @click="addMovie">Add Movie</button>
    <ul>
      <li v-for="movie in movies" :key="movie">
        Title: {{ movie.title }}
        <button @click="deleteMovie(movie.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  deleteDoc, 
  doc 
} from 'firebase/firestore'; /* alt der kræver live data skal dette bruges - den opdaterer systemet automatisk */

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
  
  /* apiKey: "AIzaSyDH4mknVgYCU9NM2OwKgYikQVM-vcYcins",
  authDomain: "inclass-firebase-d753e.firebaseapp.com",
  projectId: "inclass-firebase-d753e",
  storageBucket: "inclass-firebase-d753e.appspot.com",
  messagingSenderId: "1001655490306",
  appId: "1:1001655490306:web:922e2955a118a7803f541b" */
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); /* dette er en funktion man får adgang til via fireStore.  */

// step 1: create a new movie title and store it in the newMovieTitle variable
const newMovieTitle = ref('');

// step 2: create a list of movies and store it in a ref
const movies = ref([]);

// step 3.5: create a reference to the movies collection in firebase
const moviesFirebaseCollectionRef = 'movies';

const moviesCollection = collection(db, moviesFirebaseCollectionRef)

// step 3: create a function to retrive a new movie to the list of movies
onMounted(() => {
  onSnapshot(moviesCollection, (snapshot) => {
    movies.value = snapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data() // spread operator  
/* title: doc.data().title /* Dette skal gøres for hvert field der er lavet for doc. */
    }))
  })
})
/* Map is like a v-loop */

// step 4: create a function to add a new movie to the list of movies
// () skal være blankt, da vi ikke skal have nogen parametre med
// hvis den skulle slette vil den skulle igennem en parameter som er id
// trim vil fjerne overflødige mellemrum
const addMovie = async () => {
  if(newMovieTitle.value.trim() ==='') return; //check if input is empty, return (stop function)
  
  await addDoc (moviesCollection, {
    title: newMovieTitle.value
  })
  newMovieTitle.value = ''; // clear input field 
}

// step 5: create a function to delete a movie from the list of movies
const deleteMovie = async (id) => {
  await deleteDoc(doc(db, moviesFirebaseCollectionRef, id))
}

</script>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
