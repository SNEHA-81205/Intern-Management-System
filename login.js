document.getElementById("admin-login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Hardcoded Admin Credentials
    const adminUser = "admin";
    const adminPass = "admin123";

    // Hardcoded Mentor Credentials
    const mentors = {
        "mentor1": { password: "mentorpass1", id: 1, name: "Dr. John Doe", email: "john.doe@example.com", phone: "9876543210" },
        "mentor2": { password: "mentorpass2", id: 2, name: "Sourabh", email: "sourabh@example.com", phone: "8765432109" },
        "mentor3": { password: "mentorpass3", id: 3, name: "Lovely Gupta", email: "lovely@example.com", phone: "7654321098" },
        "mentor4": { password: "mentorpass4", id: 4, name: "Meher", email: "meher@example.com", phone: "6543210987" },
        "mentor5": { password: "mentorpass5", id: 5, name: "Krishna", email: "krishna@example.com", phone: "5432109876" }
    };

    if (username === adminUser && password === adminPass) {
        alert("Admin Login Successful!");
        window.location.href = "admin_dashboard.html";
    } else if (mentors[username] && mentors[username].password === password) {
        // Store mentor details in localStorage
        localStorage.setItem("mentorID", mentors[username].id);
        localStorage.setItem("mentorName", mentors[username].name);
        localStorage.setItem("mentorEmail", mentors[username].email);
        localStorage.setItem("mentorPhone", mentors[username].phone);

        alert("Mentor Login Successful!");
        window.location.href = "mentor_dashboard.html";
    } else {
        errorMessage.textContent = "Invalid Username or Password";
    }
});
