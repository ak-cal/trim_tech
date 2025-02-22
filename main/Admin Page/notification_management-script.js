let notifications = [];

function sendNotification() {
    let recipientType = document.getElementById("recipientType").value;
    let message = document.getElementById("notificationMessage").value.trim();

    if (message === "") {
        alert("Please enter a notification message.");
        return;
    }

    notifications.push({ recipientType, message, status: "Pending" });
    document.getElementById("notificationMessage").value = "";
    loadNotifications();
}

function loadNotifications() {
    const tableBody = document.getElementById("notificationTableBody");
    tableBody.innerHTML = "";

    notifications.forEach((n, index) => {
        let row = `
            <tr>
                <td>${n.recipientType.charAt(0).toUpperCase() + n.recipientType.slice(1)}</td>
                <td>${n.message}</td>
                <td class="notification-status-${n.status.toLowerCase()}">${n.status}</td>
                <td>
                    ${n.status === "Pending" ? `<button class="btn-send" onclick="markAsSent(${index})">Mark as Sent</button>` : ""}
                    <button class="btn-delete" onclick="deleteNotification(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function markAsSent(index) {
    notifications[index].status = "Sent";
    loadNotifications();
}

function deleteNotification(index) {
    if (confirm("Are you sure you want to delete this notification?")) {
        notifications.splice(index, 1);
        loadNotifications();
    }
}

// Load notifications on page load
loadNotifications();
