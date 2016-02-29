var db = require('mongoose');

var entrySchema = db.Schema({
	name: String,
	url: String,
	title: String,
	desc: String,
	rating: Number,
	vote: Number
})

var voteSchema = db.Schema({
	totalvotes: Number
})

var cats = db.model('cats', entrySchema);
var votes = db.model('votes', voteSchema);

module.exports = {
	cats: cats,
	votes: votes
}