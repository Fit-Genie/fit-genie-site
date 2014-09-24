var Workout = require('../models/workout');

module.exports = function(app, jwtauth) {
	var baseUrl = '/api/v_0_0_1/workouts';

	app.get(baseUrl, jwtauth, function(req, res) {
		Workout.find({}, function(err, workouts) {
			if(err) return res.status(500).json(err);
			return res.json(workouts);
		});
	});

	app.post(baseUrl, jwtauth, function(req, res) {
		var workout = new Workout(req.body); //this is iffy
		workout.save(function(err, resWorkout) { //this is iffy
			if (err) return res.status(500).json(err);
			return res.send(resWorkout);
		});
	});

	app.put(baseUrl + '/:id', jwtauth, function(req, res) {
		var workout = req.body; //this is iffy
		delete workout._id;
		Workout.findOneAndUpdate({'_id': req.params.id}, workout, function(err, resWorkout) {
			if (err) return res.status(500).json(err);
			return res.status(202).json(resWorkout);
		});
	});

	app.delete(baseUrl + '/:id', jwtauth, function(req, res) {
		Workout.remove({'_id': req.params.id}, function(err, resWorkout) {
			if(err) return res.status(500).json(err);
			return res.status(200).json({'msg': 'deleted'});
		});
	});

}