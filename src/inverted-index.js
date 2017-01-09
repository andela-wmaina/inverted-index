/*jshint esversion: 6 */

class InvertedIndex {

  constructor() {
    // always initialize all instance properties
    this.content = ' ';
    this.done = false;
    this.index_object = {};

  }

  loadFile(url) {

    var fs = require('fs');

    let json_file = fs.readFileSync(url, 'utf-8');

    this.content = JSON.parse(json_file);

    return this.content;

  }

  createIndex() {
    // let fs = require('fs');
    // this.content = fs.readFileSync(url, 'utf-8');

    let index = this.content;


    for (let books = 0; books < index.length; books++) {
      let book = index[books];
      let book_all = book.title + ' ' + book.text;
      let clean = book_all.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
      let final_clean = clean.toLowerCase();
      let words = final_clean.split(" ");

      for (let i = 0; i < words.length; i++) {
        if (!(words[i] in this.index_object)) {
          this.index_object[words[i]] = [books];
        } else {
          if (!(books in this.index_object[words[i]])) {
            this.index_object[words[i]].push(books);
          }
        }
      }
    }
    return "index created";
  }

  getIndex() {
    return this.index_object;
  }

  searchIndex(filename, ...terms) {
    // var natural = require('natural'),  
    //stemmer = natural.PorterStemmer;  

    let content = this.index_object;
    // console.log(content);

    // terms = stemmer.stem(this.index_object);
    terms = terms.toString().split(",");
    console.log(terms);

    let results = [];
    let result;
    if (terms.length > 1) {
      for (let i = 0; i < terms.length; i++) {
        let word = terms[i];

        if (word in content) {
          results.push(word + ": " + content[word]);
        }
      }
      return filename + ": " + results;
    } else {
      if (terms in content) {
        result = terms + ": " + content[terms];
      }
      return filename + ": " + result;
    }
  }
}

module.exports = InvertedIndex;

// var file = new InvertedIndex();

// console.log(file.loadFile('../jasmine/test.json'));
// console.log(file.createIndex());
// console.log(file.getIndex());
// console.log(file.searchIndex('books.json', 'alice', 'in', 'a', ['of', 'wonderland', ['world', 'hole', ['powerful', 'destroy']]]));

// var filez = new InvertedIndex();

// console.log(filez.loadFile('../jasmine/test.json'));
// console.log(filez.createIndex());
// console.log(filez.getIndex());
// console.log(filez.searchIndex('test.jsons', 'Alice', 'in', 'a', 'comical'));
