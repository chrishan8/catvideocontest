var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var db = require('mongoose');
db.connect('mongodb://localhost/videocontest/')

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));

var videos = [];

app.get('/', function(req, res) {
	res.sendFile('/html/index.html', {root : './public'})
});

var appCtrl = require('./controllers/catvideocontroller');

app.get('/api/entries', appCtrl.getEntry);
app.post('/api/entries/:entryid', appCtrl.getEntry);

app.get('/api/votes', appCtrl.getVotes);
app.post('/api/votes/:id', appCtrl.getVotes);

app.post('/api/entries', appCtrl.createEntry);

var port = 1337;
app.listen(port, function() {
	console.log('Server running on port ' + port);
})