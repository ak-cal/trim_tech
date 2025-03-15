import { supabase } from "../config/supabase.js";

// Get current session function
export function getCurrentSession() {
    const session = supabase.auth.session();
    return session;
}

// Refresh session function
export async function refreshSession() {
    const { error } = await supabase.auth.refreshSession();
    if (error) {
        console.error("Error refreshing session:", error.message);
        return { error };
    }
    return { message: "Session refreshed successfully" };
}

// Handle session state changes function
export function onSessionStateChange(callback) {
    supabase.auth.onAuthStateChange((event, session) => {
        callback(event, session);
    });
}
