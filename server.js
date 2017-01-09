/*jshint esversion: 6 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

let upload = multer({ storage: storage });

let index = require(__dirname + '/src/inverted-index.js');

let getIndex = new index();


app.post('/savedata', upload.single('file'), function(req, res, next) {
  // console.log('Upload Successful ', req.file, req.body);
  // console.log('file://' + __dirname + '/' + req.file.path);
  getIndex.loadFile(__dirname + '/' + req.file.path);
  getIndex.createIndex();
  res.send(req.file.path);
});

app.get('/api/getIndex', function(req, res, next) {
  console.log(getIndex.getIndex());
  res.send(getIndex.getIndex());
});

app.use(express.static(__dirname + '/public'));

app.get('/api/files', function(req, resp) {
  // use readdir
  let result = dirTree('uploads');
  resp.send(result.name);
});

app.get('/', function(req, resp) {
  resp.sendFile('index.html', {
    root: path.join(__dirname, './public')
  });
});

app.post('/api/searchIndex', function(req, res) {
  //create index 
  let results = getIndex.searchIndex('books.json', req.body.search);
  console.log(results);
  res.send(results);
});



app.listen(1337, function() {
  console.log('Listening at Port 1337');
});
