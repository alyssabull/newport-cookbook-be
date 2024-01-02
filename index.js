const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const env = require("dotenv").config();
const app = express();

const port = process.env.MYSQL_ADDON_PORT || 8080;
const host = process.env.MYSQL_ADDON_HOST || "0.0.0.0";
const cleverCloudURL = `mysql://ucxpdofnzajyujd8:4c7WqUFbmrYEnZQwSkW0@b32cy2ewfhbtxzwsgdpo-mysql.services.clever-cloud.com:3306/b32cy2ewfhbtxzwsgdpo`;
const db = mysql.createPool(cleverCloudURL);

// var db = mysql.createConnection({
//     host     : process.env.MYSQL_ADDON_HOST,
//     database : process.env.MYSQL_ADDON_DB,
//     user     : process.env.MYSQL_ADDON_USER,
//     password : process.env.MYSQL_ADDON_PASSWORD
// });

app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "https://poetic-sable-dac553.netlify.app");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization, Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
app.use(express.json());

app.get('/', async (req, res) => {
    await db.query('SELECT 1 + 1 AS solution', async (err, rows, fields) => {
        if (err) throw err;
      
        await res.send('The solution is: ', rows[0].solution);
    });  
    res.end();
});

app.get('/getmovies', async (req, res) => {
    // const sqlGet = "SELECT * FROM `b32cy2ewfhbtxzwsgdpo`";
    // const result = await db.query(sqlGet);
    // res.send(JSON.stringify(result));
    res.send({data: "hello world"});
    res.end();
});

app.listen(port, host, function () {
    console.log(`listening on port: ${port}`)
});
