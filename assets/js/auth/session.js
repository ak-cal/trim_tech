import { supabase } from "../config/supabase.js";

// Get current session function with user role
export async function getCurrentSession() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        const { data, error } = await supabase
            .from('Users')
            .select('role')
            .eq('user_id', session.user.id)
            .single();
        if (error) {
            console.error("Error fetching user role:", error.message);
            return null;
        }
        session.user.role = data.role;
    }
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

// Check if user is admin function
export async function isAdmin() {
    const session = await getCurrentSession();
    if (session) {
        const roles = session.user.role.split(','); // Handle multiple roles
        return roles.includes('admin');
    }
    return false;
}
