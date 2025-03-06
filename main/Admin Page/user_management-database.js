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

// Add user
const signUp = document.getElementById('submitSignup');
signUp.addEventListener('click', async (event) => {
  event.preventDefault();

  const name = document.getElementById('rName').value;
  const email = document.getElementById('rEmail').value;
  const phone = document.getElementById('signup-phone').value;
  const password = document.getElementById('signup-password').value;
  const role = document.getElementById('signup-role').value;

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          display_name: name,
          phone: phone,
          role: role
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
    document.getElementById("addUserModal").style.display = "none";
  } catch (error) {
    console.error("Error during signup: ", error.message);
    showMessage("Unable to create User: " + error.message, "signUpMessage");
  }
});
