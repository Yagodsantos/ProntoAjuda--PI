// src/services/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "my_api_key",
  authDomain: "prontoajuda.firebaseapp.com",
  projectId: "MY_PROJECT_ID",
  storageBucket: "MY_PROJECT.appspot.com",
  messagingSenderId: "MY_SENDER_ID",
  appId: "MY_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
