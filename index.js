const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const env = require("dotenv").config();
const app = express();
const axios = require("axios");

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

app.post('/postnewrecipe', async (req, res) => {
    const bufferData = Buffer.from(req.body.picture, 'base64');
    fetch("https://api.tinify.com/shrink", bufferData, {
      headers: {
        'Content-Type': 'image/jpg',
        'Authorization': 'Basic ' + Buffer.from(`api:${process.env.TINY_PNG_API_KEY}`).toString('base64'),
      },
    }).then((response) => {
      const compressedData = response.data.output.buffer;
      const finalCompression = zlib.deflateSync(compressedData);
      res.send(finalCompression)
    //   const sqlInsert = "INSERT INTO `bzh9f8szz4sa4nts1m00`.`all_recipes` (dateAdded, title, description, details, instructions, categories, isFavorite, notes, addedBy, picture) VALUES (?,?,?,?,?,?,?,?,?,?)";
    //   db.query(sqlInsert, [req.body.dateAdded, req.body.title, req.body.description, req.body.details, req.body.instructions, req.body.categories, req.body.isFavorite, req.body.notes, req.body.addedBy, finalCompression], async (err, result) => {
    //       if (err) res.send(err);
    //       await res.send({data: "recipe post successful"});
    //   });
    });
    res.end(); 
});

app.post('/compressimage', async (req, res) => {
    const imageBuffer = fs.readFileSync(req.body.picture);
    axios.post(apiUrl, imageBuffer, {
        headers: {
          'Content-Type': 'image/png',
          'Authorization': 'Basic ' + Buffer.from('api:' + `${TINY_PNG_API_KEY}`).toString('base64'),
        },
    }).then(response => {
        // The compressed image data is available in response.data.output.buffer
        const compressedData = response.data.output.buffer;
    
        // Save the compressed image to a new file or perform further actions
        // fs.writeFileSync('path/to/your/compressed/image.png', compressedData);
    
        res.send(compressedData);
    });
    res.send();
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

