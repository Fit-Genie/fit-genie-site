'use strict';

module.exports = function(app) {
	app.controller('CreateCtrl', function($scope) {
		$scope.workouts = [
		{name: 'test', type:'anything', duration: 5}
		];
		$scope.saveWorkout = function() {
			$scope.workouts.push({name: $scope.workout.name, type: $scope.workout.type, duration: $scope.workout.duration, description: $scope.workout.description});
			$scope.workout.name = $scope.workout.type = $scope.workout.duration = $scope.workout.description = '';
		};

		$scope.remove = function(workout) {
			var index = $scope.workouts.indexOf(workout);
			if (index >= 0) {
				$scope.workouts.splice(index, 1);
			}
		};

	})
}