var Entry = require('../models/catvideomodel');

var createEntry = function(req, res) {
	var entry = new Entry.cats({
		name: req.body.name,
		url: req.body.url,
		title: req.body.title,
		desc: req.body.desc,
		rating: 0,
		vote: 0
	})
	entry.save(function(err, docs) {
		res.send(docs);
	})
}

var getVotes = function(req, res) {
	if (req.params.id) {
		Entry.votes.findByIdAndUpdate({_id : req.params.id}, {$set: {totalvotes: req.body.totalvotes}}, function(err, docs) {
			res.send(docs);
		})
	}
	else {
		Entry.votes.find({}, function(err, docs) {
			res.send(docs);
		})
	}
}

var getEntry = function(req, res) {
	if(req.params.entryid) {
		Entry.cats.findByIdAndUpdate({_id : req.params.entryid}, {$set: {rating: req.body.rating, vote: req.body.vote}}, function(err, docs) {
			res.send(docs);
		})
	}
	else {
		Entry.cats.find({}, function(err, docs) {
			res.send(docs);
		})
	}
}

module.exports = {
	createEntry: createEntry,
	getEntry: getEntry,
	getVotes: getVotes
}