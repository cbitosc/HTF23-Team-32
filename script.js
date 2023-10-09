document.getElementById("registration-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather user input data from the form
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const address = document.getElementById("address").value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return; // Stop the form submission
    }

    // Create a user object to send to the server
    const user = {
        name,
        email,
        password,
        address
    };

    // Send a POST request to the server
    fetch("http://localhost:3000/register", {  // Change the endpoint path to /register
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
})

    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message); // Display a success message
            // Optionally, redirect the user to the login page
            window.location.href = "login.html";
        } else {
            alert("Registration failed: " + data.error); // Display an error message
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred during registration.");
    });
});

