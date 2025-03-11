import { supabase } from "../../main.js";

function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    if (!messageDiv) return console.error("Message div not found: " + divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
        setTimeout(() => {
        messageDiv.style.display = "none";
        }, 1000);
    }, 5000);
}

// Fetch Appointments
async function fetchAppointments() {
    const { data, error } = await supabase
        .from('Appointments')
        .select(`
            appointment_id,
            customer_id,
            barber_id,
            service_id,
            branch_id,
            date,
            time,
            appointment_type,
            status,
            Customers(Users(name)),
            Barbers(Staff(Users(name))),
            Services(name),
            Branches(name)
        `);

    if (error) {
        console.error("Error fetching appointments:", error);
        return;
    }

    const tableBody = document.getElementById("appointmentTableBody");
    if (!tableBody) {
        console.error("Table body element not found!");
        return;
    }

    tableBody.innerHTML = ""; // Clear existing content

    displayAppointments(data);
}

// Display Appointments
async function displayAppointments(data) {
    const tableBody = document.getElementById("appointmentTableBody");

    data.forEach(appointment => {
        let row = `
            <tr>
                <td>${appointment.Customers.Users.name}</td>
                <td>${appointment.Barbers.Staff.Users.name}</td>
                <td>${appointment.Services.name}</td>
                <td>${appointment.Branches.name}</td>
                <td>${appointment.date}</td>
                <td>${appointment.time}</td>
                <td>${appointment.appointment_type}</td>
                <td>${appointment.status}</td>
                <td>
                    <button class="btn btn-edit" onclick="editAppointment('${appointment.appointment_id}')">Edit</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

document.addEventListener("DOMContentLoaded", fetchAppointments);
