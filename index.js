const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const env = require("dotenv").config();
const app = express();

const port = process.env.MYSQLPORT || 3001;
const railwayURL = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "testschema"
})

app.use(cors());
app.use(express.json());

app.get('/getmovies', async (req, res) => {
    const sqlGet = "SELECT * FROM `movie_reviews4`";
    const result = await db.query(sqlGet);
    res.send(JSON.stringify(result));
    res.end();
});

app.listen(port, () => {
    console.log(`running on port ${port}`)
});
