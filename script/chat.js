import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBafGAYbLH2DPcX6Ln8ZPXV13NOBF-z6Z8",
  authDomain: "my-chat-app-346e0.firebaseapp.com",
  projectId: "my-chat-app-346e0",
  storageBucket: "my-chat-app-346e0.appspot.com",
  messagingSenderId: "851292148653",
  appId: "1:851292148653:web:d14c90475e4f281efb0724",
  measurementId: "G-MW4S7X0FQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth,app};