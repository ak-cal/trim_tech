function updateUserCounts() {
    let clientCount = users.filter(user => user.role === "Client").length;
    let barberCount = users.filter(user => user.role === "Barber").length;
    let adminCount = users.filter(user => user.role === "Admin").length;

    document.getElementById("clientCount").innerText = clientCount;
    document.getElementById("barberCount").innerText = barberCount;
    document.getElementById("adminCount").innerText = adminCount;
}

// Call function when users load
function loadUsers() {
    const userTableBody = document.getElementById("userTableBody");
    userTableBody.innerHTML = "";

    users.forEach((user, index) => {
        let row = `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user.status}</td>
                <td>
                    <button class="btn btn-edit" onclick="editUser(${index})">Edit</button>
                    <button class="btn btn-suspend" onclick="suspendUser(${index})">${user.status === "Active" ? "Suspend" : "Activate"}</button>
                    <button class="btn btn-delete" onclick="deleteUser(${index})">Delete</button>
                </td>
            </tr>
        `;
        userTableBody.innerHTML += row;
    });

    updateUserCounts(); // Update counts whenever users are loaded
}

// Also update counts when adding a new user
document.getElementById("addUserForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("userName").value;
    const email = document.getElementById("userEmail").value;
    const role = document.getElementById("userRole").value;
    const status = document.getElementById("userStatus").value;

    if (!name || !email) {
        alert("Please enter a valid name and email.");
        return;
    }

    users.push({ name, email, role, status });

    loadUsers(); // Reload table
    closeAddUserModal();
    document.getElementById("addUserForm").reset();
});
