// Open Add Appointment Modal
function openAddAppointmentModal() {
    document.getElementById('addAppointmentModal').style.display = "block";
}

// Close Add Appointment Modal
function closeAddAppointmentModal() {
    document.getElementById('addAppointmentModal').style.display = "none";
}

// Always Reset Add Appointment Form
document.addEventListener('DOMContentLoaded', function() {
    const addAppointmentForm = document.querySelector('.addAppointmentForm');
    const addAppointmentButton = document.getElementById('addAppointmentButton');

    addAppointmentButton.addEventListener('click', function(e) {
        e.preventDefault();
        addAppointmentForm.reset();
    });
});