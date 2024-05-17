import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC27CL1ki__B6RAi43BlFpPtR7S8A_hDpg",
  authDomain: "coin-savvy-1a3ce.firebaseapp.com",
  projectId: "coin-savvy-1a3ce",
  storageBucket: "coin-savvy-1a3ce.appspot.com",
  messagingSenderId: "447148220580",
  appId: "1:447148220580:web:5fb17b3ece734d849c8631",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
