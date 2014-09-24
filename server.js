'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var app = express();

mongoose.connect('mongodb://localhost/workouts-development');

app.use(express.static(__dirname + (process.env.STATIC_DIR || '/build')));




app.use(bodyparser.json());
require('./routes/workout-routes')(app);

var server = http.createServer(app);

server.listen(process.env.PORT || 3000, function() {
	console.log('server running on port 3000');
});
