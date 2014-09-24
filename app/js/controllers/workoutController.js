'use strict';

module.exports = function(app) {
  app.controller('WorkoutCtrl', function($scope, $timeout, workoutServer, $cookies, $http) {
    $http.defaults.headers.common['jwt'] = $cookies.jwt;

    $scope.getAllWorkouts = function() {
      workoutServer.index()
        .success(function(data) {
          $scope.workouts = data;
          //var i = $scope.workouts.length;
         // var foo = $scope.workouts;
         // while(i>0) {
            console.log($scope.workouts.length);
            var value = $scope.workouts[0].duration;
            $scope.countdown(value);
            //i--;
        //}
        });
    };

    $scope.getAllWorkouts();
  
  $scope.countdown = function(value) {
    if(value > -1) {
      $scope.minutes = Math.floor(value/60)
      if(value < 10) {
        var sec = value - $scope.minutes * 60
        $scope.seconds = "0" + sec;
      }
      else 
        $scope.seconds = value - $scope.minutes * 60;
    }
    value--;
    if(value >= -1)
      $scope.timeout = $timeout(function(){$scope.countdown(value)}, 1000);
    if(value === -2) {
      $scope.workouts.shift();
      if($scope.workouts.length !== 0)
        var time = $scope.workouts[0].duration;
      $scope.countdown(time);
    }
  }


  $scope.stop = function() {
    console.log($scope.workouts.shift());
    $timeout.cancel($scope.timeout);
  };

  });
};