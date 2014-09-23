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


    $scope.stopwatch = function(workout.duration) {
        //setInterval(timer,1)
        //timer
        //decrease time by a second
        //convert minutes into seconds
        //when seconds are less than 0, subtract 1 from minutes
        // add 59 to seconds.
    };

  });
};
