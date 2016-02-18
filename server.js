var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));

var videos = [];

app.get('/', function(req, res) {
	res.sendFile('index.html', {root : './'})
});

app.get('/api/entries', function(req, res) {
	res.send(videos);
})

app.post('/api/entries', function(req, res){
	console.log('Body ->', req.body)
	videos.push({
		name : req.body.name,
		url : req.body.url,
		title : req.body.title,
		desc: req.body.desc
	})
	res.send(videos);
})

var port = 1337;
app.listen(port, function() {
	console.log('Server running on port ' + port);
})