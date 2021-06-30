//kondeksi firebase di bagian setting
const firebase = require('firebase')
//copy paste dari halaman setting firebase setelah membuat database
const firebaseConfig = {
    apiKey: "AIzaSyDq-8a7XL1AOVS66KBs60RlGBaM3_jdzsU",
    authDomain: "login-1f5ca.firebaseapp.com",
    projectId: "login-1f5ca",
    storageBucket: "login-1f5ca.appspot.com",
    messagingSenderId: "1024674186245",
    appId: "1:1024674186245:web:76377e3a1926d88802c86c",
    measurementId: "G-0X1MT4JSB9"
};
  
const fire = firebase.initializeApp(firebaseConfig);
module.exports = fire;