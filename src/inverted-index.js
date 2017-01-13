/*jshint esversion: 6 */

class InvertedIndex {

  constructor() {
    this.content = "";
    this.indexObject = {};
  }

  /**
   * Reads a file and JSON.parse the content
   * @param url
   * @returns 
   */
  loadFile(url) {
    const fs = require("fs");
    let json_file = fs.readFileSync(url, "utf-8");
    isJson(json_file);
    this.content = JSON.parse(json_file);
    return json_file;
  }

  /**
   * Creates an index of a JSON file
   * @returns {}
   */
  createIndex(rawData) {
    let indexObject = {};
    rawData.forEach(function(doc) {
      let fullDoc = doc.title + " " + doc.text;
      let clean = fullDoc.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
      let final_clean = clean.toLowerCase();
      let words = final_clean.split(" ");

      words.forEach(function(word) {
        if (!(word in indexObject)) {
          indexObject[word] = [rawData.indexOf(doc)];

        } else {
          if (!(rawData.indexOf(doc) in indexObject[word])) {
            indexObject[word].push(rawData.indexOf(doc));
          }
        }
      });
    });
    return indexObject;
  }

  /**
   * Accepts a word(s), searches the word(s) in 
   * the file specified and returns the position of
   * word(s)
   * @params filename, terms
   * @returns []
   */
  searchIndex(filename, indexObject, ...terms) {
    terms = terms.toString().split(",");
    const results = [];
    const doc = {};
    if (terms.length > 1) {
      terms.forEach(function(term) {
        if (term in indexObject) {
          results.push(term + ": " + indexObject[term]);
        }
      });
      return filename + ": " + results;
    } else {
      if (terms in indexObject) {
        results.push(terms + ": " + indexObject[terms]);
      }
      return filename + ": " + results;
    }
  }

  isJson(file) {
    try {
      JSON.parse(file);
    } catch (e) {
      return false;
    }
    return true;
  }
}

exports.InvertedIndex = InvertedIndex;
