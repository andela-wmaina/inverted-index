/*jshint esversion: 6 */

const path = require('path');

const InvertedIndex = require('../../src/inverted-index.js').InvertedIndex;

beforeEach(() => {
  index = new InvertedIndex();
  index2 = new InvertedIndex();
});

describe("Read book data", () => {

  beforeEach(() => {
    file = index.loadFile(path.join(__dirname, '..', '/books.json'));
  });

  //reads json file and asserts it is not empty
  it("not empty", () => {
    expect(file).not.toBe(null);
  });

  //checks if file content is a valid JSON array
  it("valid json", () => {
    function isJson(file) {
      try {
        JSON.parse(file);
      } catch (e) {
        return false;
      }
      return true;
    }
    expect(isJson(file)).toBe(true);
  });
});



describe("Populate index", () => {
  beforeEach(function() {
    index.loadFile(path.join(__dirname, '..', '/books.json'));
    file = index.createIndex();
  });

  //checks if index is created
  it("is created", () => {
    expect(index.index_object).not.toBe(null);
  });

});

describe("Search index", () => {
  beforeEach(function() {
    index.loadFile(path.join(__dirname, '..', '/books.json'));
    file = index.createIndex();

    index2.loadFile(path.join(__dirname, '..', '/test.json'));
    fileTwo = index2.createIndex();
  });


  //Ensures index returns the correct results when searched.
  it("is correct", () => {
    expect(index.searchIndex('books.json', file, 'alice')).toBe('books.json: alice: 0');
    expect(index.searchIndex('test.json', fileTwo, 'comical')).toBe('test.json: comical: 1');
  });

  //Ensure searchIndex can handle an array of search terms.
  it("can handle an array of search terms", () => {
    expect(index.searchIndex('books.json', file, 'alliance', 'alice', 'powerful', 'wonderland'))
      .toEqual('books.json: alliance: 1,alice: 0,powerful: 1,wonderland: 0');
  });


  //Ensure searchIndex can handle a varied number of search terms as arguments.
  it("can handle varied number of search terms", () => {
    expect(index.searchIndex('books.json', file, ['a', 'alice'], 'book', 'me', ['help'])).
    toEqual('books.json: a: 0,1,alice: 0');
  });


  //Ensure searchIndex goes through all indexed files if a filename is not passed, 
  //i.e filename argument should be made optional
  it("checks all files if file not specified", () => {
    expect(index.searchIndex(undefined, file, 'alliance', 'alice', 'powerful', 'comical')).
    toEqual('books.json: alliance: 1,alice: 0,powerful: 1, test.json: comical: 1');
  });


});
