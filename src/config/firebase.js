const firebase = require("firebase/app");
const { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
 } = require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyCDaWyxU1Vr5Dr0updOPmV0AVu-cdz4AhA",
    authDomain: "mammoth-server.firebaseapp.com",
    databaseURL: "https://mammoth-server-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mammoth-server",
    storageBucket: "mammoth-server.appspot.com",
    messagingSenderId: "768417057464",
    appId: "1:768417057464:web:10d2003def91d7ab19c24d",
    measurementId: "G-S94TBV4LHZ"
};

firebase.initializeApp({
    apiKey: apiKey,
  });
  
const auth = getAuth();
