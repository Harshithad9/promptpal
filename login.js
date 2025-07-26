// login.js
import { auth } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';

window.signUp = function () {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert("Signup successful! 🎉");
      console.log(userCredential.user);
    })
    .catch(error => {
      alert(error.message);
    });
};

window.login = function () {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert("Login successful!!! ✅");
      console.log(userCredential.user);
    })
    .catch(error => {
      alert(error.message);
    });
};
