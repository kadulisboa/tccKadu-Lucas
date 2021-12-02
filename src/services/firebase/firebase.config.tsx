import firabase from "firebase/app";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";
import firebaseConfig from "./firebaseConfig";

const firebaseApi = firabase;

const firebaseApp = firebaseApi.initializeApp(firebaseConfig);
const firebaseDb = firebaseApp.firestore();

export { firebaseApi, firebaseApp, firebaseDb };
