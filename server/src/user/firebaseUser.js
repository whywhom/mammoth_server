const firebase = require("firebase/app");
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const { 
  getAuth, 
  signInWithEmailAndPassword,
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

const auth = getAuth();
const db = getFirestore();

module.exports = {
  register: async (ctx) => {
    const { email, password } = ctx.request.body;
  
    try {
      // Create the user using Firebase Authentication
      const userRecord = await admin.auth().createUser({
        email,
        password,
      });
  
      ctx.body = { message: 'User registered successfully', user: userRecord.toJSON() };
    } catch (error) {
      ctx.status = 400;
      ctx.body = { error: error.message };
    }
  },
  
  login: async function(name, pwd) {
    let data
    await signInWithEmailAndPassword(auth, name, pwd)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
      data = {
        status: 0,
        data: {
          title: "登录成功",
          user: user,
          isLoggedin: true,
          isAdmin: user.email == 'whywhom@163.com'? true : false
        }
      }
   
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      data = {
        status: -1,
        data: {
          title: '登录失败',
          user: null,
          isLoggedin: false,
          isAdmin: false
        },
        errorCode: errorCode,
        errorMessage: errorMessage
      }
    });  
    return new Promise(function(resolve, reject) {
      resolve(data);
    })
  }
}