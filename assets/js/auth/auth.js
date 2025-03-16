import { supabase } from "../config/supabase.js";

// Sign up function
export async function signUp(email, password, name, phone) {
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
        console.error("Error signing up:", error.message);
        return { error };
    }
    return { user: data.user };
}

// Login function
export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });
    if (error) {
        console.error("Error logging in:", error.message);
        return { error };
    }
    return { user: data.user };
}

// Logout function
export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Error logging out:", error.message);
        return { error };
    }
    return { message: "Logged out successfully" };
}

// Get current user function
export async function getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        console.error("Error fetching user:", error.message);
        return null;
    }
    return data.user;
}

// Forgot password function
export async function forgotPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
        console.error("Error sending password reset email:", error.message);
        return { error };
    }
    return { message: "Password reset email sent successfully" };
}
