document.addEventListener("DOMContentLoaded", function () {
    const mentorLink = document.getElementById("mentor-link");
    const traineeLink = document.getElementById("trainee-link");
    const rightPanel = document.getElementById("right-panel");
    const addTraineeBtn = document.getElementById("add-trainee-btn");

    const mentors = [
        {name: "John Doe", email: "john@example.com", phone: "+123456789", specialization: "AI & ML" },
        {name: "Sourabh", email: "sourabh@example.com", phone: "+987654321", specialization: "Cyber Security" },
        {name: "Lovely Gupta", email: "lovely@example.com", phone: "+654123789", specialization: "Web Development" },
        {name: "Meher", email: "meher@example.com", phone: "+654123789", specialization: "Data Science" },
        {name: "Krishna", email: "krishna@example.com", phone: "+654123789", specialization: "SDE" }
    ];
    

    mentorLink.addEventListener("click", function (e) {
        e.preventDefault();
        console.log("Mentor link clicked");

        let tableHTML = `
            <h2>Mentor Database</h2>
            <table class="mentor-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Specialization</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
        `;

        mentors.forEach((mentor, index) => {
            tableHTML += `
                <tr>
                    <td>${mentor.name}</td>
                    <td>${mentor.email}</td>
                    <td>${mentor.phone}</td>
                    <td>${mentor.specialization}</td>
                    <td><button class="send-btn" data-index="${index}">Send</button></td>
                </tr>
            `;
        });

        tableHTML += `</tbody></table>`;

        // Replace content in right panel
        rightPanel.innerHTML = tableHTML;

        // Hide Add Trainee button when viewing mentors
        addTraineeBtn.style.display = "none";
    });

    traineeLink.addEventListener("click", function (e) {
        e.preventDefault();

        // Show Add Trainee button
        addTraineeBtn.style.display = "block";

        // Update right panel
        rightPanel.innerHTML = `<h2>Trainee Management</h2><p>Click 'Add Trainee' to register a new trainee.</p>`;
        rightPanel.appendChild(addTraineeBtn);
    });

    addTraineeBtn.addEventListener("click", function () {
        window.location.href = "add_trainee.html";
    });

    // Event delegation for .send-btn clicks
    rightPanel.addEventListener("click", function (e) {
        if (e.target.classList.contains("send-btn")) {
            const index = e.target.dataset.index;
            const mentor = mentors[index];

            console.log("Send button clicked for:", mentor.name);

            document.getElementById("mentor_name").value = mentor.name;
            document.getElementById("modal").classList.remove("hidden");
            console.log("Modal should open now");


        }
    });

    // Close modal
    const closeBtn = document.querySelector(".close");
    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            console.log("Modal closed");
            document.getElementById("modal").classList.add("hidden");
        });
    }
    // In admin_script.js inside form submit event



    // Handle form submit
    const traineeForm = document.getElementById("trainee-form");
    if (traineeForm) {
        traineeForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const mentorName = document.getElementById("mentor_name").value;
            const selectedMentor = mentors.find(m => m.name === mentorName);

            const data = {
                trainee_id: document.getElementById("trainee_id").value,
                trainee_name: document.getElementById("trainee_name").value,
                trainee_email: document.getElementById("trainee_email").value,
                trainee_phone: document.getElementById("trainee_phone").value,
                mentor_name: mentorName
            };

            
            let pendingRequests = JSON.parse(localStorage.getItem("pendingRequests")) || [];
            pendingRequests.push(data);
            localStorage.setItem("pendingRequests", JSON.stringify(pendingRequests));

            console.log("Sending Trainee Assignment:", data);

            alert("Request sent to mentor: " + data.mentor_name);
            document.getElementById("modal").classList.add("hidden");
            this.reset();
        });
    }
});

function logout() {
    localStorage.clear(); // Clear stored data
    window.location.href = "index.html"; // Redirect to login page
}

console.log("All requests:", allRequests);
console.log("MentorID from localStorage:", mentorID);
