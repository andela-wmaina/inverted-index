/*jshint esversion: 6 */

class InvertedIndex {

  constructor() {
    this.content = "";
    this.indexObject = {};
  }

  /**
   * Creates an index of a JSON file
   * @returns {}
   */
  createIndex(rawData) {
    this.content = rawData;
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
    this.indexObject = indexObject;
    return indexObject;
  }

  /**
   * Accepts a word(s), searches the word(s) in 
   * the file specified and returns the position of
   * word(s)
   * @params filename, terms
   * @returns []
   */
  searchIndex(filename, ...terms) {
    let indexObject = this.indexObject;
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

  isJson() {
    try {
      let stringFile = JSON.stringify(this.content);
      JSON.parse(stringFile);
    } catch (e) {
      return false;
    }
    return true;
  }
}

exports.InvertedIndex = InvertedIndex;
