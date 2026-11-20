// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHLy-FrwTdS5tKO3OwVSo8TPLYoHUax3w",
  authDomain: "fazle-rabbi-2b4f5.firebaseapp.com",
  projectId: "fazle-rabbi-2b4f5",
  storageBucket: "fazle-rabbi-2b4f5.firebasestorage.app",
  messagingSenderId: "693352522424",
  appId: "1:693352522424:web:6fba133b6a09825d7e4a4d",
  measurementId: "G-PZXES8L7D8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);