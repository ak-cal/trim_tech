// Sample Data
let revenue = 1250.50;
let totalAppointments = 45;
let returningClients = 20;
let newClients = 25;
let appointmentsByBarber = { "Mike": 15, "David": 20, "Chris": 10 };
let popularServices = { "Haircut": 30, "Shave": 10, "Beard Trim": 5 };

// Load Report Data
function loadReports() {
    document.getElementById("totalRevenue").innerText = `$${revenue.toFixed(2)}`;
    document.getElementById("totalAppointments").innerText = totalAppointments;
    document.getElementById("returningClients").innerText = returningClients;
    document.getElementById("newClients").innerText = newClients;
}

// Generate Barber Appointments Chart
function generateBarberChart() {
    let ctx = document.getElementById('barberChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(appointmentsByBarber),
            datasets: [{
                label: "Appointments",
                data: Object.values(appointmentsByBarber),
                backgroundColor: ['#3498db', '#2ecc71', '#e74c3c']
            }]
        }
    });
}

// Generate Popular Services Chart
function generateServiceChart() {
    let ctx = document.getElementById('serviceChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(popularServices),
            datasets: [{
                data: Object.values(popularServices),
                backgroundColor: ['#3498db', '#2ecc71', '#f39c12']
            }]
        }
    });
}

// Export Report as CSV
function exportReport() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Metric,Value\n";
    csvContent += `Total Revenue,$${revenue.toFixed(2)}\n`;
    csvContent += `Total Appointments,${totalAppointments}\n`;
    csvContent += `Returning Clients,${returningClients}\n`;
    csvContent += `New Clients,${newClients}\n`;

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "barbershop_report.csv");
    document.body.appendChild(link);
    link.click();
}

// Load everything on page load
loadReports();
generateBarberChart();
generateServiceChart();
