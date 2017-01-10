/*jshint esversion: 6 */

class InvertedIndex {

  constructor() {
    this.content = ' ';
    this.done = false;
    this.index_object = {};

  }

  /**
   * Reads a file and JSON.parse the content
   * @param url
   * @returns 
   */
  loadFile(url) {

    var fs = require('fs');

    let json_file = fs.readFileSync(url, 'utf-8');

    this.content = JSON.parse(json_file);

    return this.content;

  }

  /**
   * Creates an index of a JSON file
   * @returns {}
   */
  createIndex() {
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

  /**
   * Returns the index of a json file
   * @returns {}
   */
  getIndex() {
    return this.index_object;
  }

  /**
   * Accepts a word(s), searches the word(s) in 
   * the file specified and returns the position of
   * word(s)
   * @params filename, terms
   * @returns []
   */
  searchIndex(filename, ...terms) {

    let content = this.index_object;

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

exports = InvertedIndex;
