
describe("Read book data", function(){
    
    beforeEach(function() {
      index = new InvertedIndex();
      file = index.createIndex('../jasmine/books.json');
    });
  
  //reads json file and asserts it is not empty
    it("valid json", function(){
      expect(file).not.toBe(null);
    });

  //checks if file content is a valid JSON array
    it("not empty", function() {
      expect(file.isArray()).toBe(true);
    });
});
