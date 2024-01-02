const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const app = express();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "testschema"
})

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
    console.log("running on port 3001")
});

app.get('/getmovies', async (req, res) => {
    const sqlGet = "SELECT * FROM `movie_reviews4`";
    const result = await db.query(sqlGet);
    res.send(JSON.stringify(result));
    res.end();
});
