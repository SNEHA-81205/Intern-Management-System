document.addEventListener("DOMContentLoaded", function () {
    const mentorID = localStorage.getItem("mentorID");
    const mentorName = localStorage.getItem("mentorName");
    const mentorEmail = localStorage.getItem("mentorEmail") || "Not Available";
    const mentorPhone = localStorage.getItem("mentorPhone") || "Not Available";

    if (!mentorID || !mentorName) {
        alert("Unauthorized Access! Redirecting to login.");
        window.location.href = "index.html";
        return;
    }

    // Display mentor details
    document.getElementById("mentor-id").textContent = mentorID;
    document.getElementById("mentor-name").textContent = mentorName;
    document.getElementById("mentor-email").textContent = mentorEmail;
    document.getElementById("mentor-phone").textContent = mentorPhone;

    // ✅ Load pending requests instead of traineeRequests
    const allRequests = JSON.parse(localStorage.getItem("pendingRequests")) || [];
    const traineeRequests = allRequests.filter(req => req.mentor_name === mentorName);

    const traineeTable = document.getElementById("trainee-requests");

    traineeRequests.forEach((trainee, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${trainee.trainee_id}</td>
            <td>${trainee.trainee_name}</td>
            <td>${trainee.trainee_email}</td>
            <td>${trainee.trainee_phone}</td>
            <td>
                <button class="approve-btn" onclick="handleRequest(${index}, 'approved')">Approve</button>
                <button class="reject-btn" onclick="handleRequest(${index}, 'rejected')">Reject</button>
            </td>
        `;
        traineeTable.appendChild(row);
    });
});

// ✅ Handle Approve/Reject actions for PENDING requests
function handleRequest(index, action) {
    let pendingRequests = JSON.parse(localStorage.getItem("pendingRequests")) || [];

    // Get the selected request
    const request = pendingRequests.filter(req => req.mentor_name === localStorage.getItem("mentorName"))[index];

    // Move it to approved or rejected
    if (action === "approved") {
        const approved = JSON.parse(localStorage.getItem("approvedRequests")) || [];
        approved.push(request);
        localStorage.setItem("approvedRequests", JSON.stringify(approved));
    } else if (action === "rejected") {
        const rejected = JSON.parse(localStorage.getItem("rejectedRequests")) || [];
        rejected.push(request);
        localStorage.setItem("rejectedRequests", JSON.stringify(rejected));
    }

    // Remove the request from pending
    pendingRequests = pendingRequests.filter(r => !(r.trainee_id === request.trainee_id && r.mentor_name === request.mentor_name));
    localStorage.setItem("pendingRequests", JSON.stringify(pendingRequests));

    alert(`Trainee ${request.trainee_id} has been ${action}`);
    location.reload(); // Refresh the table
}

// Logout function
function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}
