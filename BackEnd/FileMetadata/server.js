"use strict";

var express = require("express");
var cors = require("cors");
var multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), function(req, res) {
  var file = req.file;
  if (!file) {
    const error = new Error("Please select a file");
    res.send(error);
  } else {
    res.json({
      name: file.originalname,
      type: file.mimetype,
      size: file.size
    });
  }
});

app.get("/hello", function(req, res) {
  res.json({ greetings: "Hello, API" });
});

app.use(function(req, res) {
  res.status(404);
  res.type('txt').send('Not found');
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Node.js listening ...");
});
