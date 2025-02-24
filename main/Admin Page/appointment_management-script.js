let appointments = [
    { client: "John Doe", barber: "Mike", date: "2025-02-25", time: "10:00 AM", status: "Pending" },
    { client: "Jane Smith", barber: "David", date: "2025-02-26", time: "2:00 PM", status: "Approved" },
    { client: "Mark Johnson", barber: "Chris", date: "2025-02-27", time: "4:00 PM", status: "Canceled" }
];

function loadAppointments() {
    const tableBody = document.getElementById("appointmentTableBody");
    tableBody.innerHTML = "";

    appointments.forEach((appointment, index) => {
        let row = `
            <tr>
                <td>${appointment.client}</td>
                <td>${appointment.barber}</td>
                <td>${appointment.date}</td>
                <td>${appointment.time}</td>
                <td class="status-${appointment.status.toLowerCase()}">${appointment.status}</td>
                <td>
                    <button class="btn-approve" onclick="updateAppointmentStatus(${index}, 'Approved')">Approve</button>
                    <button class="btn-cancel" onclick="updateAppointmentStatus(${index}, 'Canceled')">Cancel</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function updateAppointmentStatus(index, status) {
    appointments[index].status = status;
    loadAppointments();
}

// Load appointments on page load
loadAppointments();

function openAddAppointmentModal() {
    document.getElementById("addAppointmentModal").style.display = "block";
}

function closeAddAppointmentModal() {
    document.getElementById("addAppointmentModal").style.display = "none";
}

// Handle form submission
document.getElementById("addAppointmentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const clientName = document.getElementById("clientName").value;
    const barberName = document.getElementById("barberName").value;
    const appointmentDate = document.getElementById("appointmentDate").value;
    const appointmentTime = document.getElementById("appointmentTime").value;

    if (!clientName || !barberName || !appointmentDate || !appointmentTime) {
        alert("Please fill in all fields.");
        return;
    }

    // Add the new appointment to the array
    appointments.push({
        client: clientName,
        barber: barberName,
        date: appointmentDate,
        time: appointmentTime,
        status: "Pending"
    });

    // Reload the appointments table
    loadAppointments();
    
    // Close modal and reset form
    closeAddAppointmentModal();
    document.getElementById("addAppointmentForm").reset();
});
