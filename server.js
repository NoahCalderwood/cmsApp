const express = require("express");
const { Pool } = require("pg");

//const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool(
    {
        // Enter PostgreSQL username
        user: "postgres",
        // Enter PostgreSQL password
        password: "S1ghtly0ddity!",
        host: "127.0.0.1",
        database: "company_db",
    },
    console.log("Connected to the movies_db database!")
);

pool.connect();

app.post(`/api/add-department`, (req, res) => {
    const sql = `INSERT INTO department (department_name) VALUES ($1)`;
    const { department_name } = req.body;

    pool.query(sql, [department_name], (err, { rows }) => {
        if (err) res.status(500).json({ error: err.message });

        res.json({
            message: "success",
            data: rows,
        });
    });
});

app.use((req, res) => {
    res.status(404).end();
});

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });