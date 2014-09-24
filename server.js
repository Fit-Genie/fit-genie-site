'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var app = express();

mongoose.connect('mongodb://localhost/workouts-development');

app.use(express.static(__dirname + (process.env.STATIC_DIR || '/build')));


app.set('jwtTokenSecret', process.env.JWT_SECRET || 'developmentsecret')
app.set('secret', process.env.SECRET || 'developmentsecret')

app.use(passport.initialize());

require('./lib/passport')(passport);
var jwtauth = require('./lib/jwtauth')(app);

app.use(bodyparser.json());
require('./routes/workout-routes')(app, jwtauth.auth);
require('./routes/user-routes')(app, passport);

var server = http.createServer(app);

server.listen(process.env.PORT || 3000, function() {
	console.log('server running on port 3000');
});
