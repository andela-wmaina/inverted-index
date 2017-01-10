/*jshint esversion: 6 */

// Package Dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const fs = require('fs');

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Creates an instance of inverted index class
let index = require(__dirname + '/src/inverted-index.js');
let indexinst = new index();

// Implements multer to store files uploaded to a folder named uploads
let storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

let upload = multer({ storage: storage });

// Initializes the root route to index.html
app.get('/', function(req, resp) {
  resp.sendFile('index.html', {
    root: path.join(__dirname, './public')
  });
});

// Calls loadFile() and createIndex() method of the instance
app.post('/savedata', upload.single('file'), function(req, res, next) {
  indexinst.loadFile(__dirname + '/' + req.file.path);
  indexinst.createIndex();
  res.send(req.file.path);
});

// Recieves files and creates an index of the files
app.post('/api/getIndex', function(req, resp) {
  let files = req.body;
  console.log(files);
  if (files.length < 1) {
    for (i = 0; i < files.length; i++) {
      file = files[i];
      console.log(indexinst.getIndex());
      res.send(indexinst.getIndex());
    }
  } else {
    console.log(indexinst.getIndex());
    res.send(indexinst.getIndex());
  }
});

// Gets files in the uploads folder and returns
app.get('/api/files', function(req, resp) {
  uploadsFolder = './uploads/';
  fs.readdir(uploadsFolder, function(err, files) {
    console.log(files);
    resp.send(files);
  });
});

// Recieves files and calls the searchIndex function
app.post('/api/searchIndex', function(req, res) {
  let results = indexinst.searchIndex('books.json', req.body.search);
  console.log(results);
  res.send(results);
});


app.listen(1337, function() {
  console.log('Listening at Port 1337');
});
