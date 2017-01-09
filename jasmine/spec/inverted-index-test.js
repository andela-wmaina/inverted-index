/*jshint esversion: 6 */

describe("Read book data", () => {
    
    beforeEach(() => {
      index = new InvertedIndex();
      file = index.createIndex('../jasmine/books.json');
    });
  
  //reads json file and asserts it is not empty
    it("valid json", () => {
      expect(file).not.toBe(null);
    });

  //checks if file content is a valid JSON array
    it("not empty", () => {
      expect(file.isArray()).toBe(true);
    });
});

describe("Populate index", () => {
  beforeEach(function() {
    index = new InvertedIndex();
    file = index.createIndex('../jasmine/books.json');
    file = index.getIndex();
  });

  //checks if index is created
  it("is created", () => {
    expect(index.index_object).not.toBe(null);
  });

  //checks if index is correct
  it("is correct", () => {
    expect(file).toEqual();
  });

});

describe("Search index", () => {
  beforeEach(function() {
    index = new InvertedIndex();
    file = index.createIndex('../jasmine/books.json');
  });

  //checks if index is created
  it("is correct", () =>{
    expect(index.searchIndex('alice')).toBe('alice: 0');
  });

  //checks if index is correct
  it("is correct", () => {
    expect(index.searchIndex('alice')).toEqual();
  });

});

