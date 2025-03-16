import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";

// 🚨 WARNING: Move the key to a secure environment!
const supabaseUrl = "https://dcyaytjualtuwvantpek.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjeWF5dGp1YWx0dXd2YW50cGVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMDU2NjksImV4cCI6MjA1NTc4MTY2OX0.RDsVndAUGJfQN90Ezg_xxoHF-506ST66e7cSzuQ26jM"; // Replace this in an env file!

export const supabase = createClient(supabaseUrl, supabaseKey);

async function getUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
        console.log("No user found, updating navbar...");
        updateNavbar(false);
        return null;
    }

    console.log("User found:", data.user);
    updateNavbar(true);
    return data.user;
}

// Function to update the navbar based on authentication status
function updateNavbar(isLoggedIn) {
    const navIcons = document.querySelector(".nav-icons");

    if (!navIcons) return;

    if (isLoggedIn) {
        // Show notification, user dropdown, and task icons
        navIcons.innerHTML = `
            <li><a href="#"><i class="ri-notification-2-line"></i></a></li>
            <li class="nav-dropdown">
                <a href="#" id="userIcon"><i class="ri-user-3-line"></i></a>
                <div class="dropdown-menu" id="dropdownMenu">
                    <button id="signOutBtn">Sign Out</button>
                </div>
            </li>
            <li><a href="#"><i class="ri-list-check"></i></a></li>
        `;

        // Reattach event listeners for dropdown and sign out button
        setupDropdown();
        setupSignOut();
    } else {
        // Show Log In and Sign Up buttons
        navIcons.innerHTML = `
            <li><a href="../Form Page/login-page.html" class="login-btn">Log In</a></li>
            <li><a href="../Form Page/login-page.html" class="signup-btn">Sign Up</a></li>
        `;
    }
}

// Handle dropdown menu toggling
function setupDropdown() {
    const userIcon = document.getElementById("userIcon");
    const dropdownMenu = document.getElementById("dropdownMenu");

    if (!userIcon || !dropdownMenu) return;

    userIcon.addEventListener("click", function (event) {
        event.preventDefault();
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function (event) {
        if (!userIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });
}

// Handle user sign out
function setupSignOut() {
    const signOutBtn = document.getElementById("signOutBtn");

    if (!signOutBtn) return;

    signOutBtn.addEventListener("click", async () => {
        console.log("Sign out clicked.");
        const { error } = await supabase.auth.signOut();
        if (!error) {
            console.log("User signed out.");
            localStorage.removeItem("userLoggedIn");
            location.reload(); // Refresh page after logout
        } else {
            console.error("Sign out error:", error.message);
        }
    });
}

// Check user status on page load
getUser();
