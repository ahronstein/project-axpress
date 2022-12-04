const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const fs = require("fs");
const cors = require("cors");
const {parse} = require("path");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// app.use(express.static('public/:ff'));

app.get("*", (req, res) => {
  const url = req.url;
  console.log(url);
  fs.readdir(`public${url}`, (err, files) => {
    if (err) res.status(404).send("is non faond");
    else {
      res.send(
        files.map((file) => {
          return {
            fileName: file,
            isDirectory: fs.lstatSync(`public/${url}${file}`).isDirectory(),
            size: fs.lstatSync(`public/${url}${file}`).size,
            birth: fs.lstatSync(`public/${url}${file}`).birthtime,
            path: url + file,
          };
        })
      );
    }
  });
});
app.delete("*", (req, res) => {
  const url = req.url;
  console.log(req.body);
  if (req.body.folder == true) {
    fs.rmdir(`${__dirname}/public${url}`, function (err) {
      if (err) console.log("ERROR: " + err);
    });
  } else {
    fs.unlink(`${__dirname}/public${url}`, function (err) {
      if (err) console.log("ERROR: " + err);
    });
  }
});
app.put("*", (req, res) => {
  const url = req.url;
  console.log(req);
    fs.rename(
      `${__dirname}/public${url}`,
      `${__dirname}/public/${req.body.newName}`,
      function (err) {
        if (err) console.log("ERROR: " + err);
      }
    );
  
});
app.post("*", (req, res) => {
  const url = req.url;
        
    fs.copyFile(`${__dirname}/public${url}`,`${__dirname}/public${url+1}`, function (err) {
      if (err) console.log("ERROR: " + err);
    });
   
  
  
});

app.listen(8000, () => console.log("listning to port 8000...."));
