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
  it("should not be empty", () => {
    expect(file).not.toBe(null);
  });

  //checks if file content is a valid JSON array
  it("should be a valid json file", () => {
    expect(index.isJson(file)).toBe(true);
  });
});

describe("Populate index", () => {
  beforeEach(() => {
    index.loadFile(path.join(__dirname, '..', '/books.json'));
  });

  //checks if index is created
  it("should have a created index", () => {
    expect(index.indexObject).not.toBe(null);
  });
});

describe("Search index", () => {
  beforeEach(() => {
    index.loadFile(path.join(__dirname, '..', '/books.json'));
    file = index.createIndex();

    secondIndex.loadFile(path.join(__dirname, '..', '/test.json'));
    secondFile = secondIndex.createIndex();
  });

  //Ensures index returns the correct results when searched.
  it("should be correct", () => {
    expect(index.searchIndex('books.json', file, 'alice')).toBe('books.json: alice: 0');
    expect(index.searchIndex('test.json', secondFile, 'comical')).toBe('test.json: comical: 1');
  });

  //Ensure searchIndex can handle an array of search terms.
  it("should handle an array of terms", () => {
    expect(index.searchIndex('books.json', file, 'alliance', 'alice', 'powerful', 'wonderland'))
      .toEqual('books.json: alliance: 1,alice: 0,powerful: 1,wonderland: 0');
  });

  //Ensure searchIndex can handle a varied number of search terms as arguments.
  it("should handle a varied number of search terms", () => {
    expect(index.searchIndex('books.json', file, ['a', 'alice'], 'book', 'me', ['help'])).
    toEqual('books.json: a: 0,1,alice: 0');
  });

  //Ensure searchIndex goes through all indexed files if a filename is not passed, 
  //i.e filename argument should be made optional
  it("should search all files if file is not specified", () => {
    expect(index.searchIndex(undefined, file, 'alliance', 'alice', 'powerful', 'comical')).
    toEqual('books.json: alliance: 1,alice: 0,powerful: 1, test.json: comical: 1');
  });

});
