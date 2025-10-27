const express = require("express"),
    path = require("path");

const app = express();

const dotenv = require("dotenv"),
    { Client } = require("pg");

dotenv.config();

const client = new Client({
    connectionString: process.env.PGURI,
    ssl: { rejectUnauthorized: false },
});

client.connect();
console.log("Connected to Postgres");

// GET alla djur
app.get("/asc", async (_request, response) => {
    try {
        const { rows } = await client.query(
            "SELECT * FROM animals ORDER BY name ASC"
        );
        response.json(rows);
    } catch (err) {
        console.error(err);
        response.status(500).json({ error: "Database error" });
    }
});

app.get("/api", (_request, response) => {
    response.send({ hello: "World" });
});

app.use(express.static(path.join(path.resolve(), "dist")));

app.listen(3000, () => {
    console.log("Redo på http://localhost:3000/");
});
