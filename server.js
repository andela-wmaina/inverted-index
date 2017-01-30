 /* jshint esversion: 6 */

 // Package Dependencies
 const express = require('express');
 const path = require('path');
 const bodyParser = require('body-parser');
 const app = express();

 // Configuration
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(express.static(path.join(__dirname, '/public')));

 // Creates an instance of inverted index class
 const InvertedIndex = require(path.join(__dirname, '/src/inverted-index.js')).InvertedIndex;
 const indexInstance = new InvertedIndex();

 // Initializes the root route to index.html
 app.get('/', (req, res) => {
   res.sendFile('index.html', {
     root: path.join(__dirname, './public'),
   });
 });

 // Calls createIndex() and getIndex() methods of the instance
 app.post('/createIndex', (req, res) => {
   indexInstance.createIndex(req.body[0], req.body[1]);
   res.send(indexInstance.getIndex(req.body[0]));
 });

 // Calls searchIndex() method with the parameters recieved
 app.post('/api/searchIndex', (req, res) => {
   res.send(indexInstance.searchIndex(req.body[0], req.body[1].search));
 });

 app.listen(1337);
