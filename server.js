const express = require("express");
const mysql = require("mysql2"); 
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));


// ✅ Create a connection pool
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Sonisneha@179",
    database: "mentor_trainee_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 🚀 Check database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL database.");
        connection.release(); // Release connection
    }
});

// ✅ Fix POST /add_trainee Route
app.post("/add_trainee", (req, res) => {
    console.log("Received Data:", req.body);

    const { name, email, phone, internship_status, mentor_id } = req.body;

    if (!name || !email || !phone || !internship_status) {
        return res.status(400).json({ message: "All fields except mentor_id are required" });
    }

    const sql = "INSERT INTO trainees (trainee_name, email, phone_number, internship_status, Assigned_MentorID) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [name, email, phone, internship_status, mentor_id || null], (err, result) => {
        if (err) {
            console.error("❌ Database Error:", err);
            return res.status(500).json({ message: "Database error", error: err });
        }
        res.json({ message: "✅ Trainee added successfully!" });
    });
});

// ✅ Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
