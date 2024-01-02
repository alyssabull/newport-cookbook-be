const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const env = require("dotenv").config();
const app = express();

const port = process.env.DBPORT || 3001;
const railwayURL = `mysql://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBDATABASE}`;
const db = mysql.createPool(railwayURL);

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.send("welcome to the server");
    res.end();
});

app.get('/getmovies', async (req, res) => {
    const sqlGet = "SELECT * FROM `movie_reviews4`";
    const result = await db.query(sqlGet);
    res.send(JSON.stringify(result));
    res.end();
});

app.listen(port, () => {
    console.log(`running on port ${port}`)
});
