import { isAdmin, getCurrentSession } from "../auth/session.js";
import { supabase } from "../config/supabase.js";

document.addEventListener("DOMContentLoaded", async function () {
    const navItems = document.querySelector(".nav-items"); // Select the nav-items container
    const navIcons = document.querySelector(".nav-icons");
    const session = await getCurrentSession();

    if (session) {
        if (await isAdmin()) {
            // If the user is an admin, show the admin dashboard link
            const adminNavItem = document.createElement("li");
            adminNavItem.innerHTML = '<a href="admin.html">Admin Dashboard</a>';
            navItems.appendChild(adminNavItem); // Append to nav-items instead of nav-icons
        }

        // Update existing user icon instead of adding a new one
        const userIcon = document.querySelector(".nav-dropdown");
        if (userIcon) {
            userIcon.innerHTML = `
                <a href="#" id="userIcon"><i class="ri-user-3-line"></i></a>
                <div class="dropdown-menu" id="dropdownMenu">
                    <button id="signOutBtn">Sign Out</button>
                </div>
            `;
        }
    } else {
        // If no user is logged in, show Log In and Sign Up buttons
        navIcons.innerHTML = `
            <li><a href="signup.html" >Log In</a></li>
            <li><a href="signup.html" >Sign Up</a></li>
        `;
    }

    // Dropdown toggle
    const userIcon = document.getElementById("userIcon");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const signOutBtn = document.getElementById("signOutBtn");

    if (userIcon && dropdownMenu) {
        userIcon.addEventListener("click", function (event) {
            event.preventDefault();
            dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
        });

        document.addEventListener("click", function (event) {
            if (!userIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.style.display = "none";
            }
        });
    } else {
        console.error("User icon or dropdown menu not found.");
    }

    // Sign out functionality
    if (signOutBtn) {
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
});

document.addEventListener("DOMContentLoaded", () => {
    const userIcon = document.querySelector("#user-icon");
    const dropdown = document.querySelector(".user-dropdown");

    if (userIcon && dropdown) {
        userIcon.addEventListener("click", (event) => {
            event.preventDefault();
            dropdown.classList.toggle("active");
        });

        document.addEventListener("click", (event) => {
            if (!dropdown.contains(event.target) && event.target !== userIcon) {
                dropdown.classList.remove("active");
            }
        });
    } else {
        console.error("User icon or dropdown menu not found.");
    }

    // Sign out functionality
    const signOutBtn = document.querySelector("#sign-out");
    if (signOutBtn) {
        signOutBtn.addEventListener("click", async (event) => {
            event.preventDefault();
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error("Error signing out:", error.message);
            } else {
                window.location.href = "index.html"; // Redirect to login page
            }
        });
    }
});
