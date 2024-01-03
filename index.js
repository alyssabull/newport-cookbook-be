const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const env = require("dotenv").config();
const app = express();

const cleverCloudURL = `mysql://${process.env.MYSQL_ADDON_USER}:${process.env.MYSQL_ADDON_PASSWORD}@${process.env.MYSQL_ADDON_HOST}:${process.env.MYSQL_ADDON_PORT}/${process.env.MYSQL_ADDON_DB}`;
const db = mysql.createPool(cleverCloudURL);

app.use(cors({
    origin: ["http://localhost:3000", "https://newport-cookbook.netlify.app", "https://newport-cookbook-be.cleverapps.io"]
}));
app.use(express.json());

app.get('/', async (req, res) => {
    res.send("server is working");
    res.end();
});

app.get('/getrecipes', async (req, res) => {
    const sqlGet = "SELECT * FROM bzh9f8szz4sa4nts1m00.all_recipes;";
    const result = await db.query(sqlGet);
    res.send(JSON.stringify(result));
    res.end();
});

app.post('/postnewrecipe', async (req, res) => {
    const sqlInsert = "INSERT INTO `bzh9f8szz4sa4nts1m00`.`all_recipes` (dateAdded, title, description, details, instructions, picture, categories, isFavorite, notes, addedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [req.body.dateAdded, req.body.title, req.body.description, req.body.details, req.body.instructions, req.body.picture, req.body.categories, req.body.isFavorite, req.body.notes, req.body.addedBy], async (err, result) => {
        await res.send({data: "post successful"});
    });
    res.end(); 
});

app.listen(8080, "0.0.0.0", function () {
    console.log("server up");
});


