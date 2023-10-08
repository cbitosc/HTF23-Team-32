// login.js (New JavaScript file for login page)

document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather user input data from the form
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Send a POST request to the server for login
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            // Redirect the user to the dashboard page after successful login
            window.location.href = "dashboard.html";
        } else {
            alert("Login failed: " + data.error);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred during login.");
    });
});
