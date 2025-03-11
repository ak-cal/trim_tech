// Initialize EmailJS
document.addEventListener("DOMContentLoaded", function () {
    // Initialize EmailJS
    emailjs.init("5ubOvuijaJO2rgh0M"); 

    document.getElementById("notification-form").addEventListener("submit", function (event) {
        event.preventDefault(); 
        const recipient_type = document.getElementById("recipientType").value;

        const user_email = document.getElementById("user_email").value;

        const statusType = document.getElementById("statusType").value;
    

        const notificationMessage = document.getElementById("notificationMessage").value;

        // Send email using EmailJS
        emailjs.send("service_u87lcgg", "template_fgh2lr3", {
            recipient_type: recipient_type,
            user_email: user_email,
            statusType: statusType,
            notificationMessage: notificationMessage
        }).then(
            function (response) {
                alert("Message sent successfully!");
                document.getElementById("notification-form").reset(); 
            },
            function (error) {
                alert("Failed to send message. Please try again.");
                console.error("EmailJS Error:", error);
            }
        );
    });
});
