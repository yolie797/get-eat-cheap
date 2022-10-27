import {getAuth} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCesrOapuz9ajh1833TNKWLK1GK39KeiEc",
  authDomain: "get-eat-cheap.firebaseapp.com",
  projectId: "get-eat-cheap",
  storageBucket: "get-eat-cheap.appspot.com",
  messagingSenderId: "1065025002207",
  appId: "1:1065025002207:web:a33eb77b4eae6e925ae76a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);