import { supabase } from "../config/supabase.js";

// Sign up function
export async function signUp(email, password, name, phone) {
    const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                display_name: name,
                phone: phone
            },
            email_confirm: true
        }
    });
    if (error) {
        console.error("Error signing up:", error.message);
        return { error };
    }
    return { user };
}

// Login function
export async function login(email, password) {
    const { user, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });
    if (error) {
        console.error("Error logging in:", error.message);
        return { error };
    }
    return { user };
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
export function getCurrentUser() {
    const user = supabase.auth.user();
    return user;
}
