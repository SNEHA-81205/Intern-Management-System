CREATE TABLE Mentors (
    emp_id INT AUTO_INCREMENT PRIMARY KEY,
    emp_name VARCHAR(255) NOT NULL,
    designation VARCHAR(100),
    department VARCHAR(100)
);

-- Trainees Table
CREATE TABLE Trainees (
    trainee_id INT AUTO_INCREMENT PRIMARY KEY,
    trainee_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    internship_status ENUM('pending', 'ongoing', 'completed') DEFAULT 'pending'
);

-- Internship Assignments Table
CREATE TABLE Internships (
    assignment_id INT AUTO_INCREMENT PRIMARY KEY,
    trainee_id INT,
    emp_id INT,
    request_status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    FOREIGN KEY (trainee_id) REFERENCES Trainees(trainee_id) ON DELETE CASCADE,
    FOREIGN KEY (emp_id) REFERENCES Mentors(emp_id) ON DELETE SET NULL,
    INDEX (trainee_id),
    INDEX (emp_id)
);

INSERT INTO trainees(trainee_id, trainee_name, email, Internship_status) VALUES ('1','Sneha Soni','ssoni81205@gmail.com','Ongoing');

SELECT * from trainees

