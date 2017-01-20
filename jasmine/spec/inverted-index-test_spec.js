/* jshint esversion: 6 */

const InvertedIndex = require('../../src/inverted-index.js').InvertedIndex;

const books = require('../books.json');
const test = require('../test.json');
const reverse = require('../reverse.json');

let index;
let secondIndex;

beforeEach(() => {
  index = new InvertedIndex();
  secondIndex = new InvertedIndex();
  index.createIndex(books);
  secondIndex.createIndex(test);
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
    expect(index.getIndex().alice).toEqual([0]);
    expect(index.getIndex().hobbit).toEqual([1]);
  });

  it('should not override uploaded files', () => {
    // creates a new index
    const newIndex = new InvertedIndex();
    newIndex.createIndex(reverse);

    expect(index.getIndex().wonderland).toEqual([0]);
    expect(newIndex.getIndex().wonderland).toEqual([1]);
  });
});

describe('Search index', () => {
  let booksIndex;
  let testIndex;

  beforeEach(() => {
    booksIndex = index.getIndex();
    testIndex = secondIndex.getIndex();
  });
  // ensures index returns the correct results when searched.
  it('should be correct', () => {
    expect(index.searchIndex('books.json', booksIndex, 'alice'))
      .toEqual({ 'books.json': { alice: [0] } });
    expect(secondIndex.searchIndex('test.json', testIndex, 'comical'))
      .toEqual({ 'test.json': { comical: [1] } });
  });

  // ensure searchIndex can handle an array of search terms.
  it('should handle an array of terms', () => {
    expect(index.searchIndex('books.json', booksIndex, 'alliance', 'alice', 'powerful', 'wonderland'))
      .toEqual({ 'books.json': { alliance: [1], alice: [0], powerful: [1], wonderland: [0] } });
  });

  // ensure searchIndex can handle a varied number of search terms as arguments.
  it('should handle a varied number of search terms', () => {
    expect(index.searchIndex('books.json', booksIndex, ['a', 'alice'], 'book', 'me', ['help']))
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

  /**
   * ensure searchIndex goes through all indexed files if a filename is not passed,
   * i.e filename argument should be made optional
   **/
  it('should search all files if file is not specified', () => {
    expect(undefined.searchIndex(undefined, [booksIndex, testIndex], 'alliance', 'alice', 'powerful', 'comical'))
      .toEqual({
        'books.json': {
          alliance: [1],
          alice: [0],
          powerful: [1],
        },
      }, {
        'test.json': { comical: [1] },
      });
  });
});
