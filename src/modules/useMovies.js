import { ref, onMounted } from 'vue';
import { db, moviesCollection, moviesFirebaseCollectionRef } from './firebase';
import {onSnapshot, addDoc, doc, deleteDoc } from 'firebase/firestore';

export const useMovies = () => {
    // step 1: create a new movie title and store it in the newMovieTitle variable
    const newMovieTitle = ref('');

    // step 2: create a list of movies and store it in a ref
    const movies = ref([]);


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

    return {
        movies,
        newMovieTitle,
        addMovie,
        deleteMovie
    }




}