// Open Add Appointment Modal
function openAddAppointmentModal() {
    document.getElementById('addAppointmentModal').style.display = "block";
}

// Close Add Appointment Modal
function closeAddAppointmentModal() {
    document.getElementById('addAppointmentModal').style.display = "none";
}

// Open Edit Appointment Modal
function openEditAppointmentModal() {
    document.getElementById('editAppointmentModal').style.display = "block";
}

// Close Edit Appointment Modal
function closeEditAppointmentModal() {
    document.getElementById('editAppointmentModal').style.display = "none";
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