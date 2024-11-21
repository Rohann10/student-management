const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');

const app = express();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'student_management',
    password: 'Jalandhar@789ro',
    port: 5432
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.post('/students', async (req, res) => {
    const { student_id, first_name, last_name, date_of_birth, email, enrollment_date, courses } = req.body;

    if (!student_id || !first_name || !last_name || !date_of_birth || !email || !enrollment_date) {
        return res.status(400).send('All fields are required.');
    }

    try {
        const result = await pool.query(
            `INSERT INTO students (student_id, first_name, last_name, date_of_birth, email, enrollment_date, courses)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [student_id, first_name, last_name, date_of_birth, email, enrollment_date, JSON.stringify(courses)]
        );
        res.status(201).send(result.rows[0]);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.get('/students', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM students');
        res.status(200).send(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
