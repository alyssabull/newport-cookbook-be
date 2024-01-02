const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const env = require("dotenv").config();
const app = express();

const port = process.env.DBPORT || 8080;
const host = process.env.DBHOST || "0.0.0.0";
// const railwayURL = `mysql://ucxpdofnzajyujd8:4c7WqUFbmrYEnZQwSkW0@b32cy2ewfhbtxzwsgdpo-mysql.services.clever-cloud.com:3306/b32cy2ewfhbtxzwsgdpo`;
// const db = mysql.createPool(railwayURL);

var db = mysql.createConnection({
    host     : process.env.MYSQL_ADDON_HOST,
    database : process.env.MYSQL_ADDON_DB,
    user     : process.env.MYSQL_ADDON_USER,
    password : process.env.MYSQL_ADDON_PASSWORD
});

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.send("welcome to the server!");
    res.end();
});

app.get('/getmovies', async (req, res) => {
    // const sqlGet = "SELECT * FROM `b32cy2ewfhbtxzwsgdpo`";
    // const result = await db.query(sqlGet);
    // res.send(JSON.stringify(result));
    res.send("hello world");
    res.end();
});

app.listen(port, host, function () {
    console.log(`running on port ${port}`)
});
