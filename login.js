// login.js
import { auth } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';

// Signup function
window.signUp = function () {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert("Signup successful! 🎉");
      console.log(userCredential.user);
      // Optional: Redirect to dashboard after signup
      window.location.href = "dashboard.html";
    })
    .catch(error => {
      alert(error.message);
    });
};

// Login function
window.login = function () {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert("Login successful! ✅");
      console.log(userCredential.user);
      // ✅ Redirect to dashboard
      window.location.href = "dashboard.html";
    })
    .catch(error => {
      alert(error.message);
    });
};
