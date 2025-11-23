import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxy01b-zv7i51iqQhsi1AvyqipBlziDeA",
  authDomain: "virtual-study-app-8e825.firebaseapp.com",
  projectId: "virtual-study-app-8e825",
  storageBucket: "virtual-study-app-8e825.firebasestorage.app",
  messagingSenderId: "664926013820",
  appId: "1:664926013820:web:3efefb2a86ddf5fb777cf9",
  measurementId: "G-HZXQCZCN2Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
