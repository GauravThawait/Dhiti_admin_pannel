// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage }  from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfKoyQOgxjfusvm7qjhelsEX2n4RdmNE8",
  authDomain: "dhiti-foundation.firebaseapp.com",
  databaseURL: "https://dhiti-foundation-default-rtdb.firebaseio.com",
  projectId: "dhiti-foundation",
  storageBucket: "dhiti-foundation.appspot.com",
  messagingSenderId: "312761775781",
  appId: "1:312761775781:web:c23ee1d052611d344dff4c",
  measurementId: "G-QXTVLNM3D1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app) 

export {storage};