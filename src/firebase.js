import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZeqsvliRQD715rtSiZeFaQBt_z02jEzY",
  authDomain: "crud-react-app-b4b59.firebaseapp.com",
  projectId: "crud-react-app-b4b59",
  storageBucket: "crud-react-app-b4b59.appspot.com",
  messagingSenderId: "16760831206",
  appId: "1:16760831206:web:6682a6f11793a3bfe70f27",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
