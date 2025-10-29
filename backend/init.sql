CREATE TABLE IF NOT EXISTS patients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    blood_group VARCHAR(5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO patients (name, email, phone, date_of_birth, blood_group) VALUES
('John Doe', 'john@example.com', '+1234567890', '1990-01-15', 'A+'),
('Jane Smith', 'jane@example.com', '+1234567891', '1985-05-20', 'O+');