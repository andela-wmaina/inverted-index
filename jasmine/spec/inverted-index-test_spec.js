/*jshint esversion: 6 */

/* global InvertedIndex */

// const path = require("path");

const invertedIndex = require('../../src/inverted-index.js').InvertedIndex;


books = require('../books.json');
test = require('../test.json');

beforeEach(() => {
  index = new invertedIndex();
  secondIndex = new invertedIndex();
  index.createIndex(books);
  secondIndex.createIndex(test);
});

describe("Read book data", () => {

  //reads json file and asserts it is not empty
  it("should not be empty", () => {
    expect(index.content.length).not.toBe(0);
  });

  //checks if file content is a valid JSON array
  it("should be a valid json file", () => {
    expect(index.isJson()).toBe(true);
  });
});

describe("Populate index", () => {
  //checks if index is created
  it("should have a created index", () => {
    expect(index.indexObject).not.toBe(null);
  });
});

describe("Search index", () => {
  //Ensures index returns the correct results when searched.
  it("should be correct", () => {
    expect(index.searchIndex("books.json", "alice")).toBe('books.json: alice: 0');
    expect(secondIndex.searchIndex("test.json", "comical")).toBe('test.json: comical: 1');
  });

  //Ensure searchIndex can handle an array of search terms.
  it("should handle an array of terms", () => {
    expect(index.searchIndex("books.json", 'alliance', 'alice', 'powerful', 'wonderland'))
      .toEqual('books.json: alliance: 1,alice: 0,powerful: 1,wonderland: 0');
  });

  //Ensure searchIndex can handle a varied number of search terms as arguments.
  it("should handle a varied number of search terms", () => {
    expect(index.searchIndex("books.json", ['a', 'alice'], 'book', 'me', ['help'])).
    toEqual('books.json: a: 0,1,alice: 0');
  });

  //Ensure searchIndex goes through all indexed files if a filename is not passed, 
  //i.e filename argument should be made optional
  it("should search all files if file is not specified", () => {
    expect(index.searchIndex(undefined, 'alliance', 'alice', 'powerful', 'comical')).
    toEqual('books.json: alliance: 1,alice: 0,powerful: 1, test.json: comical: 1');
  });

});
