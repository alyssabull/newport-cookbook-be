const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const env = require("dotenv").config();
const app = express();

// const port = process.env.DBPORT || 3001;
// const host = process.env.DBHOST || "0.0.0.0";
const railwayURL = `mysql://ucxpdofnzajyujd8:4c7WqUFbmrYEnZQwSkW0@b32cy2ewfhbtxzwsgdpo-mysql.services.clever-cloud.com:3306/b32cy2ewfhbtxzwsgdpo`;
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

app.listen(3306, function () {
    console.log(`running on port 3306`)
});
