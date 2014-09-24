'use strict';

var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

module.exports = function(passport) {
	passport.use('basic', new BasicStrategy ({
		usernameField: 'username',
		passwordField: 'password'
	},
	function(username, password, done) {
		User.findOne({'basic.username': username}, function(err, user) {
			if(err) return done(err);

			if(!user) return done(null, false);

			if(!user.validPassword(password)) return done(null, false);

			return done(null, user);
		});
	}));
};