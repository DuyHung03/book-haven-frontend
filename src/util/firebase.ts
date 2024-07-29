// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyC6f59gQnhjjbw-lkqCGXINtQjjPkRw5UE',
    authDomain: 'book-store-e07fc.firebaseapp.com',
    projectId: 'book-store-e07fc',
    storageBucket: 'book-store-e07fc.appspot.com',
    messagingSenderId: '1038221676815',
    appId: '1:1038221676815:web:4109fdbee5a76ed8ae6e7a',
    measurementId: 'G-7JLTCKE21C',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
