// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLLeR4tCDtBnFLfDvze1arEkiGdsUiLx4",
  authDomain: "tech-trim.firebaseapp.com",
  projectId: "tech-trim",
  storageBucket: "tech-trim.firebasestorage.app",
  messagingSenderId: "88812923030",
  appId: "1:88812923030:web:14b3740e7dfb6faee9fab7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
  var messageDiv=document.getElementById(divId);
  messageDiv.style.display="block";
  messageDiv.innerHTML=message;
  messageDiv.style.opacity=1;
  setTimeout(function(){
    messageDiv.style.opacity=0;
  }, 5000);
}

const signUp = document.getElementById('submitSignup');
signUp.addEventListener('click', (event) => {
  event.preventDefault();
  const name = document.getElementById('rName').value;
  const email = document.getElementById('rEmail').value;
  const phone = document.getElementById('signup-phone').value;
  const password = document.getElementById('signup-password').value;


  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
        const user = userCredential.user
        const userData = {
          name: name,
          email: email,
          phone: phone
        };
        showMessage("User Registered Successfully", "signupMessage");
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(() => {
          window.location.href = "homepage.html";
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    })

    .catch((error) => {
      const errorCode = error.code;
      if(errorCode=="auth/email-already-in-use"){
        showMessage("Email already in use", "signupMessage");
      }
      else{
        showMessage("Unable to create User", "signupMessage");
      }
    });
});

