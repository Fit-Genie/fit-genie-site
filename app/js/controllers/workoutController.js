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
            console.log($scope.workouts);
            var min = $scope.workouts[0].minutes;
            var sec = $scope.workouts[0].seconds;
            var total = sec + min*60
            console.log(total);
            $scope.countdown(total);
            //i--;
        //}
        });
    };

    $scope.getAllWorkouts();
<<<<<<< HEAD
  
  $scope.countdown = function(total) {
      if(total > -1) {
      $scope.minutes = Math.floor(total/60)
      if(total < 10) {
        var sec = total - $scope.minutes * 60
        $scope.seconds = "0" + sec;
      }
      else
        $scope.seconds = total - $scope.minutes * 60;
=======


  $scope.countdown = function(value) {
    if(value > -1) {
      $scope.minutes = Math.floor(value/60)
      if(value < 10) {
        var sec = value - $scope.minutes * 60
        $scope.seconds = "0" + sec;
      }
      else
        $scope.seconds = value - $scope.minutes * 60;
>>>>>>> a97873c2f1344c8c0e7855ceb6be0536fff33add
    }
    total--;
    if(total >= -1)
      $scope.timeout = $timeout(function(){$scope.countdown(total)}, 1000);
    if(total === -2) {
      $scope.workouts.shift();
      if($scope.workouts.length !== 0) {
         var min = $scope.workouts[0].minutes;
          var sec = $scope.workouts[0].seconds;
          var total = sec + min*60;
      }
      $scope.countdown(total);
    }
  }


  $scope.pause = function() {
    $timeout.cancel($scope.timeout);
  };

  });
};
