'use strict';

module.exports = function(app) {
  app.controller('WorkoutCtrl', function($scope,workoutServer) {

    $scope.getAllWorkouts = function() {
      workoutServer.index()
        .success(function(data) {
          $scope.workouts = data;
        });
    };

    $scope.getAllWorkouts();
  });
};
