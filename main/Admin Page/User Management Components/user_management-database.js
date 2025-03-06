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

// Fetch Users
async function fetchUsers() {
  const { data, error } = await supabase
      .from('Users')
      .select('*');

  if (error) {
      console.error("Error fetching users:", error);
      return;
  }

  const tableBody = document.getElementById("userTableBody");
  if (!tableBody) {
      console.error("Table body element not found!");
      return;
  }

  tableBody.innerHTML = ""; // Clear existing content

  data.forEach(user => {
      let row = `
          <tr>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.phone}</td>
              <td>${user.role}</td>
              <td>
                  <button class="btn btn-edit" onclick="editUser('${user.email}')">Edit</button>
              </td>
          </tr>
      `;
      tableBody.innerHTML += row;
  });
}

// Add User
document.getElementById('submitSignup').addEventListener('click', async (event) => {
  event.preventDefault();
  console.log("Save User clicked");

  const name = document.getElementById('rName').value;
  const email = document.getElementById('rEmail').value;
  const phone = document.getElementById('signup-phone').value;
  const password = document.getElementById('signup-password').value;
  const role = document.getElementById('signup-role').value;
 
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          display_name: name,
          phone: phone,
          role: role
        }
      }
    });

    if (error) throw error;

    console.log("Added User Successfully");
    showMessage("Added User  Successfully", "signUpMessage");
    document.getElementById('addUserModal').style.display = 'none';
  } catch (error) {
    console.error("Error during adding: ", error.message);
    showMessage("Unable to create User: " + error.message, "signUpMessage");
  }
});

// Edit User
window.editUser = async function(email) {
  console.log("Edit User clicked");

  const { data, error } = await supabase
      .from('Users')
      .select('*')
      .eq('email', email)
      .single();

  if (error) {
      console.error("Error fetching user:", error);
      return;
  }

  if (!data) {
      console.error("User not found!");
      return;
  }

  console.log("User found: ", data);

  document.getElementById('editUserName').value = data.name;
  document.getElementById('editUserPhone').value = data.phone;
  document.getElementById('editUserRole').value = data.role;

  openEditUserModal();
  
  document.getElementById('submitEditUser').onclick = async function(event) {
    event.preventDefault();
    console.log("Save User clicked");

    const name = document.getElementById('editUserName').value;
    const phone = document.getElementById('editUserPhone').value;
    const role = document.getElementById('editUserRole').value;

    try {
      const { data, error } = await supabase
          .from('Users')
          .update({
            name: name,
            phone: phone,
            role: role
          })
          .eq('email', email);

      if (error) throw error;

      console.log("User updated:", data);

      console.log("Updated User Successfully");
      showMessage("Updated User Successfully", "editUserMessage");
      fetchUsers(); // Refresh the table
      document.getElementById('editUserModal').style.display = 'none';
    } catch (error) {
      console.error("Error during updating: ", error.message);
      showMessage("Unable to update User: " + error.message, "editUserMessage");
    }
  };
}

document.addEventListener("DOMContentLoaded", fetchUsers);
