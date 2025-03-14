import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";

const supabaseUrl = "https://dcyaytjualtuwvantpek.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjeWF5dGp1YWx0dXd2YW50cGVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMDU2NjksImV4cCI6MjA1NTc4MTY2OX0.RDsVndAUGJfQN90Ezg_xxoHF-506ST66e7cSzuQ26jM";

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

async function signInUser() {
    console.log("Signing in...");
  
    const { data, error } = await supabase.auth.signInWithPassword({
        email: "jaclabao@mymail.mapua.edu.ph",
        password: "Dec2021137102*"
    });
  
    if (error) {
        console.error("Error signing in:", error.message);
        return;
    }
  
    console.log("User signed in:", data.user);
}
  
async function getUser() {
    const { data, error } = await supabase.auth.getUser();
  
    if (error) {
        console.error("Error fetching user:", error.message);
        return null;
    }
  
    console.log("User data:", data.user);
    return data.user;
}
  
async function getSession() {
    const { data, error } = await supabase.auth.getSession();
  
    if (error) {
        console.error("Error getting session:", error.message);
        return null;
    }
  
    console.log("Session data:", data);
    return data;
}
  
signInUser();
getUser();
getSession();