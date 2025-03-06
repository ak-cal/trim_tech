import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://dcyaytjualtuwvantpek.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjeWF5dGp1YWx0dXd2YW50cGVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMDU2NjksImV4cCI6MjA1NTc4MTY2OX0.RDsVndAUGJfQN90Ezg_xxoHF-506ST66e7cSzuQ26jM";
const supabase = createClient(supabaseUrl, supabaseKey);

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  if (!messageDiv) {
    console.error("Message div not found: " + divId);
    return;
  }
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Sign Up
const signUp = document.getElementById('submitSignup');
signUp.addEventListener('click', async (event) => {
  event.preventDefault();
  console.log("Signup clicked");

  const name = document.getElementById('rName').value;
  const email = document.getElementById('rEmail').value;
  const phone = document.getElementById('signup-phone').value;
  const password = document.getElementById('signup-password').value;

  try {
    // Proceed with signup
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          display_name: name,
          phone: phone,
        }
      }
    });

    if (error) {
      console.error("Signup Error:", error.message); // Log the exact error
      if (error.message.includes("User already registered")) {
        showMessage("Email is already in use", "signUpMessage");
      } else {
        showMessage("Unable to create User: " + error.message, "signUpMessage");
      }
      return; // Stop further execution
    }

    showMessage("User Registered Successfully", "signUpMessage");
    window.location.href = "login-page.html";
  } catch (error) {
    console.error("Error during signup: ", error.message);
    showMessage("Unable to create User: " + error.message, "signUpMessage");
  }
});

// Sign In
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', async (event) => {
  event.preventDefault();
  console.log("Signin clicked");

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    // Sign in the user with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;

    showMessage("User Logged In Successfully", "signInMessage");
    window.location.href = "homepage.html";
  } catch (error) {
    console.error("Login Error: ", error.message);
    if (error.message.includes("Invalid login credentials")) {
      showMessage("Invalid Email or Password", "signInMessage");
    } else {
      showMessage("Unable to login: " + error.message, "signInMessage");
    }
  }
});