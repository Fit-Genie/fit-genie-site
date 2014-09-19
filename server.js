'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var passport = require('passport');
var app = express();

//mongoose and mongo go here

app.use(express.static(__dirname + (process.env.STATIC_DIR || '/build')));

app.use(bodyparser.json());

var server = http.createServer(app);

server.listen(process.env.PORT || 3000, function() {
	console.log('server running on port 3000');
});