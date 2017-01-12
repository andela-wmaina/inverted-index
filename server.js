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
let invertedIndex = require(__dirname + '/src/inverted-index.js').InvertedIndex;
let indexInstance = new invertedIndex();

// Implements multer to store files uploaded to a folder named uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Initializes the root route to index.html
app.get('/', function(req, resp) {
  resp.sendFile('index.html', {
    root: path.join(__dirname, './public')
  });
});

// Calls loadFile() and createIndex() method of the instance
app.post('/savedata', upload.single('file'), function(req, resp, next) {
  indexInstance.loadFile(__dirname + '/' + req.file.path);
  resp.send(indexInstance.createIndex());
});


// Gets files in the uploads folder and returns
app.get('/api/files', function(req, resp) {
  uploadsFolder = './uploads/';
  fs.readdir(uploadsFolder, function(err, files) {
    resp.send(files);
  });
});

// Recieves files and calls the searchIndex function
app.post('/api/searchIndex', function(req, resp) {
  resp.send(indexInstance.searchIndex(req.body[0], req.body[1], req.body[2].search));
});


app.listen(1337, function() {
  console.log('Listening at Port 1337');
});
