/*jshint esversion: 6 */
class InvertedIndex {

	constructor() {
        // always initialize all instance properties
        this.content = null;
        this.done = false;
        this.index_object = {};
    }

	createIndex(filepath) {
		var fs = require('fs');

		this.content = fs.readFileSync(filepath, 'utf-8');
		return this.content;
	}

}
