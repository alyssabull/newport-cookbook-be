const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const env = require("dotenv").config();
const app = express();

const cleverCloudURL = `mysql://${process.env.MYSQL_ADDON_USER}:${process.env.MYSQL_ADDON_PASSWORD}@${process.env.MYSQL_ADDON_HOST}:${process.env.MYSQL_ADDON_PORT}/${process.env.MYSQL_ADDON_DB}`;
const db = mysql.createPool(cleverCloudURL);

const whitelist = ["http://localhost:3000", "https://poetic-sable-dac553.netlify.app"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
// app.use(cors());
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', "https://poetic-sable-dac553.netlify.app");
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization, Access-Control-Allow-Origin');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
// });
app.use(express.json());

app.get('/', async (req, res) => {
    res.send("testing");
    res.end();
});

app.get('/getmovies', async (req, res) => {
    const sqlGet = "SHOW DATABASES;";
    const result = await db.query(sqlGet);
    res.send(JSON.stringify(result));
    // res.send({data: cleverCloudURL});
    res.end();
});

app.listen(8080, "0.0.0.0", function () {
    console.log("server up");
});
