const express = require("express");
const app = express();
app.use(express.json({limit: '5mb'}));
const port = 8080;
const http = require('http');
const fs = require('fs');

app.get('/images', (req, res) => {
    fs.readdir('files', (error, files) => {
        if (error) console.log(error)
        console.log(files);
        res.send(files);
    });
});

app.get('/images/*', (req, res) => {
    fs.readFile(__dirname + '/files/' + req.params[0], (error, file) => {
        if (error) console.log(error)
        console.log(file);
        file = JSON.stringify(file);
        res.send(file);
    });
});

app.post("/upload", (req, res) => {
    let data = Buffer.from(req.body.data.data);

    fs.writeFile(__dirname + "/files/" + req.body.name, data, (err) => {
        if (err) console.log(err); else {
            console.log("File written successfully\n");
            console.log("The written has the following contents:");
            // console.log(fs.readFileSync(__dirname + "/files/" + req.body.name, "utf8"));
        }
    });
});

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`Listening on port ${port}`);
});
