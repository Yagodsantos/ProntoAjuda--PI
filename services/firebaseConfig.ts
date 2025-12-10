import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLfHdsK2pF_ZBo6mSkYBHLqJfnXph_yjI",
  authDomain: "prontoajuda-1o.firebaseapp.com",
  projectId: "prontoajuda-1o",
  storageBucket: "prontoajuda-1o.firebasestorage.app",
  messagingSenderId: "543631551766",
  appId: "1:543631551766:web:bd9211411370c611867437",
  measurementId: "G-Q338R81NZE"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
