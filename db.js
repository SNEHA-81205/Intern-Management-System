const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost', // Change if your MySQL is hosted elsewhere
    user: 'root', // Your MySQL username
    password: '', // Your MySQL password (if any)
    database: 'mentor_trainee_db' // Database name
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + connection.threadId);
});

module.exports = connection;
