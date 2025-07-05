// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { getDatabase } from "firebase/database"; // Realtime Database

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXNPpQanHCPYI2qa268pXL2__2j4JR_p4",
  authDomain: "talkwreact.firebaseapp.com",
  projectId: "talkwreact",
  storageBucket: "talkwreact.firebasestorage.app",
  messagingSenderId: "565062185338",
  appId: "1:565062185338:web:b57021717a4b5a1430a6c3",
  measurementId: "G-Q9LXXB7FRQ",
  databaseURL: "https://talkwreact-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// const database = getDatabase(app);

export {app};