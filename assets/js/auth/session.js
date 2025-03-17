import { supabase } from "../config/supabase.js";

// Get current session function with user role
export async function getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session || !session.user) {
        console.error("Error getting session or user is null:", error?.message);
        return { error: "Failed to get session or user." };
    }

    const { data, error: roleError } = await supabase
        .from('Users')
        .select('role')
        .eq('user_id', session.user.id)
        .single();

    if (roleError) {
        console.error("Error fetching user role:", roleError.message);
        return { error: "Failed to fetch user role." };
    }

    session.user.role = data?.role || ""; // Ensure role is always a string
    return session;
}

// Refresh session function
export async function refreshSession() {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) {
        console.error("Error refreshing session:", error.message);
        return { error };
    }
    return { message: "Session refreshed successfully", session: data.session };
}

// Handle session state changes function
export function onSessionStateChange(callback) {
    supabase.auth.onAuthStateChange((event, session) => {
        callback(event, session);
    });
}

// Check if user is admin function
export async function isAdmin() {
    const session = await getCurrentSession();
    if (session && session.user.role) {
        const roles = (session.user.role || "").split(',').map(r => r.trim()); // Ensure role is a string
        return roles.includes('admin');
    }
    return false;
}
