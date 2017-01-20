 /* jshint esversion: 6 */

 class InvertedIndex {

   constructor() {
     this.content = '';
     this.indexObject = {};
   }

   /**
    * Creates an index of a JSON file
    * @params json data
    * @returns {}
    */
   createIndex(rawData) {
     this.content = rawData;
     const indexObject = {};
     rawData.forEach((doc) => {
       const fullDoc = doc.title + ' ' + doc.text;
       const clean = fullDoc.replace(/[.,#!$%&;:{}=\-_`~()]/g, '');
       const finalClean = clean.toLowerCase();
       const words = finalClean.split(' ');

       words.forEach((word) => {
         if (!(word in indexObject)) {
           indexObject[word] = [rawData.indexOf(doc)];
         } else {
           if (!(rawData.indexOf(doc) in indexObject[word])) {
             indexObject[word].push(rawData.indexOf(doc));
           }
         }
       });
     });
     this.indexObject = indexObject;
     return indexObject;
   }

   /**
    * Returns the indexObject
    */
   getIndex() {
     return this.indexObject;
   }

   /**
    * Accepts a word(s), searches the word(s) in the file
    * specified and returns it's index position.
    * @params filename, words
    * @returns {}
    */
   searchIndex(filename, indexObject, ...words) {
     const terms = words.toString().split(',');
     const searchTerms = {};
     const results = {};
     console.log(searchTerms.length);
     if (terms.length > 1) {
       terms.forEach((term) => {
         if (term in indexObject) {
           results[term] = indexObject[term];
           searchTerms[filename] = results;
           console.log(searchTerms);
         } else {
           results[term] = ['Not Found', 'Not Found'];
           searchTerms[filename] = results;
           console.log(searchTerms);
         }
         console.log(searchTerms);
       });
     } else {
       if (terms in indexObject) {
         results[terms] = indexObject[terms];
         searchTerms[filename] = results;
       } else {
         results[terms] = ['Not Found', 'Not Found'];
         searchTerms[filename] = results;
       }
     }
     return searchTerms;
   }

   isJson() {
     try {
       const stringFile = JSON.stringify(this.content);
       JSON.parse(stringFile);
     } catch (e) {
       return false;
     }
     return true;
   }
 }

 exports.InvertedIndex = InvertedIndex;

 const books = require('../jasmine/books.json');

 let index = new InvertedIndex();
 index.createIndex(books);
 let what = index.getIndex();
 console.log(index.searchIndex('books.json', what, 'alice', 'wonderland', 'it'))
