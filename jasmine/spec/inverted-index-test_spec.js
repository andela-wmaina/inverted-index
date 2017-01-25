/* jshint esversion: 6 */

const InvertedIndex = require('../../src/inverted-index.js').InvertedIndex;

const books = require('../files/books.json');
const test = require('../files/test.json');
const reverse = require('../files/reverse.json');

let index;

beforeEach(() => {
  index = new InvertedIndex();
  index.createIndex('books.json', books);
  index.createIndex('test.json', test);
});

describe('Read book data', () => {
  // reads json file and asserts it is not empty
  it('should not be empty', () => {
    expect(index.content.length).not.toBe(0);
  });

  // checks if file content is a valid JSON array
  it('should be a valid json file', () => {
    expect(index.isJson()).toBe(true);
  });
});

describe('Populate index', () => {
  // checks if index is created
  it('should have a created index', () => {
    expect(index.indexObject).not.toBe(null);
  });

  // checks if index created is true
  it('should have the correct index', () => {
    expect(index.getIndex('books.json').alice).toEqual([0]);
  });

  it('should not override uploaded files', () => {
    index.createIndex('reverse.json', reverse);
    expect(index.getIndex('books.json').wonderland).toEqual([0]);
    expect(index.getIndex('reverse.json').wonderland).toEqual([1]);
  });
});

describe('Search index', () => {
  // ensures index returns the correct results when searched.
  it('should be correct', () => {
    expect(index.searchIndex('books.json', 'alice'))
      .toEqual({ 'books.json': { alice: [0] } });
  });

  // ensure searchIndex can handle an array of search terms.
  it('should handle an array of terms', () => {
    expect(index.searchIndex('books.json', 'alliance', 'alice', 'powerful', 'wonderland'))
      .toEqual({ 'books.json': { alliance: [1], alice: [0], powerful: [1], wonderland: [0] } });
  });

  // ensure searchIndex can handle a varied number of search terms as arguments.
  it('should handle a varied number of search terms', () => {
    expect(index.searchIndex('books.json', ['a', 'alice'], 'book', 'me', ['help']))
      .toEqual({
        'books.json': {
          a: [0, 1],
          alice: [0],
          book: ['Not Found', 'Not Found'],
          me: ['Not Found', 'Not Found'],
          help: ['Not Found', 'Not Found'],
        },
      });
  });

  // ensures if file is not specified, all files are searched
  it('should search all files if file is not specified', () => {
    const results = [];
    Object.keys(index.files).forEach((obj) => {
      results.push(index.searchIndex(obj, 'alliance', 'alice', 'powerful', 'comical'));
    });
    expect(results)
      .toEqual([{
        'books.json': {
          alliance: [1],
          alice: [0],
          powerful: [1],
          comical: ['Not Found', 'Not Found'],
        }
      }, {
        'test.json': {
          alliance: [0],
          alice: [0, 1],
          powerful: [0],
          comical: [1]
        }
      }]);
  });
});
