'use strict';

module.exports = function(app) {
	app.controller('CreateCtrl', function($scope, workoutServer, $cookies, $http) {
		console.log($cookies.jwt);
		$http.defaults.headers.common['jwt'] = $cookies.jwt;
		// $scope.workouts = [
		// {name: 'test', type:'anything', duration: 5}
		// ];
		// $scope.saveWorkout = function() {
		// 	$scope.workouts.push({name: $scope.workout.name, type: $scope.workout.type, duration: $scope.workout.duration, description: $scope.workout.description});
		// 	$scope.workout.name = $scope.workout.type = $scope.workout.duration = $scope.workout.description = '';
		// };


		$scope.getAllWorkouts = function() {
			workoutServer.index()
				.success(function(data) {
					$scope.workouts = data;
				});
		};

		$scope.getAllWorkouts();

		$scope.saveWorkout = function() {
			workoutServer.saveNewWorkout($scope.workout)
			.success(function(data) {
				$scope.workouts.push(data);
			});
		};

		$scope.deleteWorkout = function(workout) {
			workoutServer.deleteWorkout(workout)
				.success(function(){
					$scope.getAllWorkouts();
				});
		};

		$scope.remove = function(workout) {
			var index = $scope.workouts.indexOf(workout);
			if (index >= 0) {
				$scope.workouts.splice(index, 1);
			}
		};

	});
};
