CREATE TABLE students (
    student_id VARCHAR PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    date_of_birth DATE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    enrollment_date DATE NOT NULL,
    courses JSONB
);
