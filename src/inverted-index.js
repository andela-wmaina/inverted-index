/*jshint esversion: 6 */

class InvertedIndex {

  constructor() {
    this.content = ' ';
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

    return json_file;

  }

  /**
   * Creates an index of a JSON file
   * @returns {}
   */
  createIndex() {
    let rawData = this.content;

    let index_object = {};

    rawData.forEach(function(doc) {
      let fullDoc = doc.title + ' ' + doc.text;
      let clean = fullDoc.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
      let final_clean = clean.toLowerCase();
      let words = final_clean.split(" ");

      words.forEach(function(word) {
        if (!(word in index_object)) {
          index_object[word] = [rawData.indexOf(doc)];

        } else {
          if (!(rawData.indexOf(doc) in index_object[word])) {
            index_object[word].push(rawData.indexOf(doc));
          }
        }
      });
    });
    return index_object;
  }



  /**
   * Accepts a word(s), searches the word(s) in 
   * the file specified and returns the position of
   * word(s)
   * @params filename, terms
   * @returns []
   */
  searchIndex(filename, index_object, ...terms) {

    terms = terms.toString().split(",");

    const results = [];
    const doc = {};
    if (terms.length > 1) {
      terms.forEach(function(term) {
        if (term in index_object) {
          results.push(term + ": " + index_object[term]);
        }
      });
      return filename + ": " + results;
    } else {
      if (terms in index_object) {
        results.push(terms + ": " + index_object[terms]);
      }
      return filename + ": " + results;
    }
  }
}

exports.InvertedIndex = InvertedIndex;
