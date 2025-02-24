document.addEventListener("DOMContentLoaded", loadUsers);

const users = [
    { name: "John Doe", email: "john@example.com", role: "Client", status: "Active" },
    { name: "Sarah Smith", email: "sarah@example.com", role: "Barber", status: "Pending" },
    { name: "Admin User", email: "admin@example.com", role: "Admin", status: "Active" }
];

// Load users into the table
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
}

// Search and filter users
function filterUsers() {
    const searchValue = document.getElementById("searchUser").value.toLowerCase();
    const filterRole = document.getElementById("filterRole").value;

    const filteredUsers = users.filter(user => 
        (user.name.toLowerCase().includes(searchValue) || user.email.toLowerCase().includes(searchValue)) &&
        (filterRole === "" || user.role === filterRole)
    );

    document.getElementById("userTableBody").innerHTML = filteredUsers.map((user, index) => `
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
    `).join("");
}

// Edit user function (mockup)
function editUser(index) {
    alert(`Edit user: ${users[index].name}`);
}

// Suspend/Activate user
function suspendUser(index) {
    users[index].status = users[index].status === "Active" ? "Suspended" : "Active";
    loadUsers();
}

// Delete user
function deleteUser(index) {
    if (confirm(`Are you sure you want to delete ${users[index].name}?`)) {
        users.splice(index, 1);
        loadUsers();
    }
}

// Open the modal
function openAddUserModal() {
    document.getElementById("addUserModal").style.display = "block";
}

// Close the modal
function closeAddUserModal() {
    document.getElementById("addUserModal").style.display = "none";
}

// Handle form submission
document.getElementById("addUserForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get input values
    const name = document.getElementById("userName").value;
    const email = document.getElementById("userEmail").value;
    const role = document.getElementById("userRole").value;
    const status = document.getElementById("userStatus").value;

    // Validate input (basic validation)
    if (!name || !email) {
        alert("Please enter a valid name and email.");
        return;
    }

    // Add new user to the list
    users.push({ name, email, role, status });
    
    // Refresh table & close modal
    loadUsers();
    closeAddUserModal();
    
    // Clear form fields
    document.getElementById("addUserForm").reset();
});
