let CONFIG = {};

async function loadConfig() {
    try {
        const response = await fetch("config.json");
        CONFIG = await response.json();
        initializeSupabase();
    } catch (error) {
        console.error("Failed to load config.json", error);
    }
}

function initializeSupabase() {
    const supabase = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
    console.log("Supabase initialized:", supabase);
}

loadConfig();