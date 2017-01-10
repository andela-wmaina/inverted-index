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


let indexinst = new index();

app.post('/savedata', upload.single('file'), function(req, res, next) {
  // console.log('Upload Successful ', req.file, req.body);
  files = req.file.originalname;
  indexinst.loadFile(__dirname + '/' + req.file.path);
  indexinst.createIndex();
  res.send(req.file.path);
});

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

app.use(express.static(__dirname + '/public'));

app.get('/api/files', function(req, resp) {
  uploadsFolder = './uploads/';
  fs.readdir(uploadsFolder, function(err, files) {
    console.log(files);
    resp.send(files);
  });
});

app.get('/', function(req, resp) {
  resp.sendFile('index.html', {
    root: path.join(__dirname, './public')
  });
});

app.post('/api/searchIndex', function(req, res) {
  //create index 
  let results = indexinst.searchIndex('books.json', req.body.search);
  console.log(results);
  res.send(results);
});



app.listen(1337, function() {
  console.log('Listening at Port 1337');
});
