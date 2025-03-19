document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const modalMessage = document.getElementById("modalMessage");
    const myModal = new bootstrap.Modal(document.getElementById("myModal"));

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page refresh

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;

        // Show message in modal
        modalMessage.textContent = `Hello, ${firstName} ${lastName} its good to see you today!`;
        myModal.show();

        // Save data in Local Storage
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({ firstName, lastName });
        localStorage.setItem("users", JSON.stringify(users));
    });
    // Redirect to the main page when "Continue" is clicked
    continueButton.addEventListener("click", function () {
        window.location.href = "main.html"; // Change this to your main page file
    });
});
