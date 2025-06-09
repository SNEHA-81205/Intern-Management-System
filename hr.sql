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

ALTER TABLE Trainees ADD COLUMN phone_number VARCHAR(15) NOT NULL;

ALTER TABLE Trainees ADD COLUMN Assigned_MentorID VARCHAR(20) NOT NULL;

SELECT * from trainees;

DELETE FROM trainees WHERE trainee_id = 1;
DELETE FROM trainees WHERE trainee_id = 2;
DELETE FROM trainees WHERE trainee_id = 3;
DELETE FROM trainees WHERE trainee_id = 4;
DELETE FROM trainees WHERE trainee_id = 5;
ALTER TABLE trainees ADD COLUMN college_name VARCHAR(255);

SELECT * FROM trainees;


ALTER TABLE Trainees MODIFY Assigned_MentorID VARCHAR(20);
SELECT * FROM Mentors;

INSERT INTO Mentors (emp_name, designation, department) VALUES
('John Doe	', 'Scientist', 'AIML'),
('Sourabh', 'Engineer', 'Cybersecurity'),
('Lovely Gupta', 'Scientist B', 'Web development'),
('Meher', 'Scientist B', 'Data Science'),

('Krishna', 'Scientist B', 'SDE');

SELECT * FROM Mentors;


DELETE FROM Mentors;

-- Re-insert only unique records
INSERT INTO Mentors (emp_name, designation, department) VALUES
('John Doe', 'Scientist', 'AIML'),
('Sourabh', 'Engineer', 'Cybersecurity'),
('Lovely Gupta', 'Scientist B', 'Web development'),
('Meher', 'Scientist B', 'Data Science'),
('Krishna', 'Scientist B', 'SDE');

DELETE FROM Mentors;
ALTER TABLE Mentors AUTO_INCREMENT = 1;
INSERT INTO Mentors (emp_name, designation, department) VALUES
('John Doe', 'Scientist', 'AIML'),
('Sourabh', 'Engineer', 'Cybersecurity'),
('Lovely Gupta', 'Scientist B', 'Web development'),
('Meher', 'Scientist B', 'Data Science'),
('Krishna', 'Scientist B', 'SDE');

DELETE FROM trainees;
ALTER TABLE trainees AUTO_INCREMENT = 1;
ALTER TABLE Trainees
    ADD CONSTRAINT fk_assigned_mentor
    FOREIGN KEY (Assigned_MentorID) REFERENCES Mentors(emp_id)
    ON DELETE SET NULL;

ALTER TABLE Trainees MODIFY Assigned_MentorID INT NULL;

INSERT INTO trainees (trainee_name, email, phone_number, internship_status, Assigned_MentorID)
VALUES ('Test Trainee', 'test@example.com', '1234567890', 'pending', 1);

select * FROM trainees;

DESC trainees;

ALTER TABLE Trainees drop column college_name;