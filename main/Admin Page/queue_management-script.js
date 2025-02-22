let queue = [
    { client: "John Doe", barber: "Mike", time: "10:00 AM", status: "Waiting" },
    { client: "Jane Smith", barber: "David", time: "10:30 AM", status: "In Progress" }
];

function loadQueue() {
    const tableBody = document.getElementById("queueTableBody");
    tableBody.innerHTML = "";

    queue.forEach((q, index) => {
        let row = `
            <tr>
                <td>${q.client}</td>
                <td>${q.barber}</td>
                <td>${q.time}</td>
                <td class="status-${q.status.toLowerCase().replace(' ', '-')}">${q.status}</td>
                <td>
                    <button class="btn-in-progress" onclick="updateQueueStatus(${index}, 'In Progress')">In Progress</button>
                    <button class="btn-complete" onclick="updateQueueStatus(${index}, 'Completed')">Completed</button>
                    <button class="btn-no-show" onclick="updateQueueStatus(${index}, 'No Show')">No Show</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function updateQueueStatus(index, status) {
    queue[index].status = status;
    loadQueue();
}

function openAddQueueModal() {
    document.getElementById("addQueueModal").style.display = "block";
}

function closeAddQueueModal() {
    document.getElementById("addQueueModal").style.display = "none";
}

// Handle Walk-in Form Submission
document.getElementById("addQueueForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const walkInClient = document.getElementById("walkInClient").value;
    const walkInBarber = document.getElementById("walkInBarber").value;
    const walkInTime = document.getElementById("walkInTime").value;

    if (!walkInClient || !walkInBarber || !walkInTime) {
        alert("Please fill in all fields.");
        return;
    }

    // Add new walk-in to the queue
    queue.push({
        client: walkInClient,
        barber: walkInBarber,
        time: walkInTime,
        status: "Waiting"
    });

    // Reload queue table
    loadQueue();

    // Close modal and reset form
    closeAddQueueModal();
    document.getElementById("addQueueForm").reset();
});

// Load queue on page load
loadQueue();
