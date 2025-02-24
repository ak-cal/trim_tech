function saveSecuritySettings() {
    let strongPasswords = document.getElementById("strongPasswords").checked;
    let enable2FA = document.getElementById("enable2FA").checked;
    let autoLogout = document.getElementById("autoLogout").value;

    if (!autoLogout || autoLogout < 1 || autoLogout > 60) {
        alert("Please set a valid auto logout time (1-60 minutes).");
        return;
    }

    localStorage.setItem("securitySettings", JSON.stringify({ strongPasswords, enable2FA, autoLogout }));
    alert("Security settings updated successfully!");
}

function viewLockedAccounts() {
    // Mock function: Replace with actual locked accounts retrieval logic
    alert("Locked Accounts:\n1. user1@example.com\n2. user2@example.com");
}

function viewLoginAttempts() {
    // Mock function: Replace with actual login attempt logs retrieval logic
    alert("Failed Login Attempts:\nUser: admin@example.com - 3 failed attempts\nUser: barber1@example.com - 2 failed attempts");
}

function backupData() {
    let data = {
        securitySettings: localStorage.getItem("securitySettings"),
    };

    let blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "security_backup.json";
    a.click();
}

function restoreData() {
    let fileInput = document.getElementById("restoreFile");
    let file = fileInput.files[0];

    if (!file) {
        alert("Please select a file to restore.");
        return;
    }

    let reader = new FileReader();
    reader.onload = function (event) {
        let data = JSON.parse(event.target.result);
        localStorage.setItem("securitySettings", data.securitySettings);
        alert("Security settings restored successfully!");
    };
    reader.readAsText(file);
}

function viewAuditLogs() {
    // Mock function: Replace with actual log retrieval logic
    alert("Audit Logs:\n1. Admin changed security settings.\n2. Barber account locked due to failed login attempts.");
}
