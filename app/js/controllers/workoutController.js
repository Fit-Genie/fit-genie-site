'use strict';

module.exports = function(app) {
  app.controller('WorkoutCtrl', function($scope, $timeout, workoutServer) {

    $scope.value;
    $scope.minutes;
    $scope.seconds;
    $scope.workouts;
    var i = 0;

    $scope.getAllWorkouts = function() {
      workoutServer.index()
        .success(function(data) {
          $scope.workouts = data;
          $scope.value = $scope.workouts[i].duration;
          countdown();
        });
    };

    $scope.getAllWorkouts();
  
  function countdown() {
    $scope.value--;
    $scope.minutes = Math.floor($scope.value/60)
    $scope.seconds = $scope.value - $scope.minutes * 60;
    if($scope.value >= 1)
      $scope.timeout = $timeout(countdown, 1000);
    else
      $scope.stop();
  }

  $scope.stop = function() {
    $scope.workouts.shift();
    $timeout.cancel($scope.timeout);
  };

  });
};
