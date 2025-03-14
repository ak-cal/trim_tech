import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";

        const supabaseUrl = "https://dcyaytjualtuwvantpek.supabase.co";
        const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjeWF5dGp1YWx0dXd2YW50cGVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMDU2NjksImV4cCI6MjA1NTc4MTY2OX0.RDsVndAUGJfQN90Ezg_xxoHF-506ST66e7cSzuQ26jM"; // Replace with environment-safe key
        const supabase = createClient(supabaseUrl, supabaseKey);

        let selectedDate = null;

        async function getUserId() {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Error getting user:", error);
                return null;
            }
            return user ? user.id : null;
        }

        function generateCalendar(month, year) {
            const calendarDiv = document.getElementById("calendar");
            calendarDiv.innerHTML = "";
            const firstDay = new Date(year, month, 1);
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            for (let i = 1; i <= daysInMonth; i++) {
                const dayDiv = document.createElement("div");
                dayDiv.textContent = i;
                dayDiv.addEventListener("click", () => {
                    selectedDate = new Date(year, month, i);
                    highlightSelectedDate();
                });
                calendarDiv.appendChild(dayDiv);
            }
        }

        function highlightSelectedDate() {
            document.querySelectorAll(".calendar div").forEach(div => div.classList.remove("selected"));
            document.querySelector(`.calendar div:nth-child(${selectedDate.getDate()})`).classList.add("selected");
        }

        document.getElementById("bookBtn").addEventListener("click", async () => {
    const userId = await getUserId();
    if (!userId) {
        document.getElementById("message").innerHTML = "<p class='error-message'>Please log in first!</p>";
        return;
    }

    if (!selectedDate) {
        document.getElementById("message").innerHTML = "<p class='error-message'>Please select a date!</p>";
        return;
    }

    const time = document.getElementById("time").value;
    const serviceId = document.getElementById("chooseService").value;
    const branchId = document.getElementById("chooseBranch").value;
    const barberId = document.getElementById("chooseBarber").value;

    if (!time || !serviceId || !barberId) {
        document.getElementById("message").innerHTML = "<p class='error-message'>Please select time, service, and barber.</p>";
        return;
    }

    const appointmentType = "Booking";

    const { data, error } = await supabase.from("Appointments").insert([{
        customer_id: userId,  
        service_id: serviceId,
        branch_id: branchId,
        barber_id: barberId,
        appointment_type: appointmentType,
        date: selectedDate.toISOString().split('T')[0],
        time: time,
    }]);

    document.getElementById("message").innerHTML = error 
        ? `<p class='error-message'>${error.message}</p>` 
        : "<p class='success-message'>Appointment booked successfully!</p>";
});


        const today = new Date();
        generateCalendar(today.getMonth(), today.getFullYear());

        document.getElementById("exitBtn").addEventListener("click", () => {
    window.location.href = "index.html";
});