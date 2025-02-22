function saveBusinessHours() {
    let openingTime = document.getElementById("openingTime").value;
    let closingTime = document.getElementById("closingTime").value;

    if (!openingTime || !closingTime) {
        alert("Please set both opening and closing times.");
        return;
    }

    localStorage.setItem("businessHours", JSON.stringify({ openingTime, closingTime }));
    alert("Business hours updated successfully!");
}

function saveServiceDuration() {
    let serviceDuration = document.getElementById("serviceDuration").value;
    if (serviceDuration < 10 || serviceDuration > 120) {
        alert("Please set a valid service duration (10-120 minutes).");
        return;
    }
    localStorage.setItem("serviceDuration", serviceDuration);
    alert("Service duration updated successfully!");
}

function saveBookingPreferences() {
    let maxBookings = document.getElementById("maxBookings").value;
    let onlineBookings = document.getElementById("onlineBookings").checked;

    localStorage.setItem("bookingPreferences", JSON.stringify({ maxBookings, onlineBookings }));
    alert("Booking preferences updated successfully!");
}

function saveSecuritySettings() {
    let passwordPolicy = document.getElementById("passwordPolicy").checked;
    let accountLockout = document.getElementById("accountLockout").checked;

    localStorage.setItem("securitySettings", JSON.stringify({ passwordPolicy, accountLockout }));
    alert("Security settings updated successfully!");
}

function backupData() {
    let data = {
        businessHours: localStorage.getItem("businessHours"),
        serviceDuration: localStorage.getItem("serviceDuration"),
        bookingPreferences: localStorage.getItem("bookingPreferences"),
        securitySettings: localStorage.getItem("securitySettings")
    };

    let blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "backup.json";
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
        localStorage.setItem("businessHours", data.businessHours);
        localStorage.setItem("serviceDuration", data.serviceDuration);
        localStorage.setItem("bookingPreferences", data.bookingPreferences);
        localStorage.setItem("securitySettings", data.securitySettings);
        alert("System settings restored successfully!");
    };
    reader.readAsText(file);
}
