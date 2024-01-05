const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const env = require("dotenv").config();
const app = express();
const axios = require("axios");
const multer = require("multer");
const path = require("path");

const cleverCloudURL = `mysql://${process.env.MYSQL_ADDON_USER}:${process.env.MYSQL_ADDON_PASSWORD}@${process.env.MYSQL_ADDON_HOST}:${process.env.MYSQL_ADDON_PORT}/${process.env.MYSQL_ADDON_DB}`;
const db = mysql.createPool(cleverCloudURL);

app.use(cors({
    origin: ["http://localhost:3000", "https://newport-cookbook.netlify.app", "https://newport-cookbook-be.cleverapps.io", "https://api.tinify.com/shrink"]
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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(`${process.cwd()}/uploads`))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({
    storage: storage
});

app.post('/upload', upload.single('image'), async (req, res) => {
    const image = req.file.filename;
    const sqlInsert = "INSERT INTO `bzh9f8szz4sa4nts1m00`.`test_picture` (picture) VALUES (?)";
    db.query(sqlInsert, image, async (err, res) => {
        if(err) return res.json({Message: "Error"})
        const response = await res.json({Status: "Success"});
        return response;
    });
    res.end();
});

app.post('/postnewrecipe', async (req, res) => {
    const sqlInsert = "INSERT INTO `bzh9f8szz4sa4nts1m00`.`all_recipes` (dateAdded, title, description, details, instructions, categories, isFavorite, notes, addedBy, picture) VALUES (?,?,?,?,?,?,?,?,?,?)";
    db.query(sqlInsert, [req.body.dateAdded, req.body.title, req.body.description, req.body.details, req.body.instructions, req.body.categories, req.body.isFavorite, req.body.notes, req.body.addedBy, finalCompression], async (err, result) => {
        if (err) res.send(err);
        await res.send({data: "recipe post successful"});
    });
    res.end(); 
});

app.delete('/deleterecipe/:id', async (req, res) => {
    const id = req.params.id;
    const sqlInsert = "DELETE FROM `bzh9f8szz4sa4nts1m00`.`all_recipes` WHERE id = ?";
    db.query(sqlInsert, [id], async (err, result) => {
        if (err) throw err;
        await res.send(result);
    });
    res.end();
})

app.listen(8080, "0.0.0.0", function () {
    console.log("server up");
});

