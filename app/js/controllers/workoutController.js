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

    $scope.countdown = function(total) {
      if(total > -1) {
        $scope.minutes = Math.floor(total/60)
        var sec = total - $scope.minutes * 60
        if(sec < 10) {
          $scope.seconds = "0" + sec;
        }
        else
          $scope.seconds = sec;
      }
      total--;
      if(total >= -1) {
        $scope.total = total;
        $scope.timeout = $timeout(function(){$scope.countdown(total)}, 1000);
      }
      if(total === -2) {
        $scope.workouts.shift();
        if($scope.workouts.length > 0) {
         var min = $scope.workouts[0].minutes;
         var sec = $scope.workouts[0].seconds;
         var total = sec + min*60;
         $scope.total = total;
       }
       $scope.countdown(total);
     }
     if($scope.workouts.length === 0)
      window.location.replace("/#/congrats");
   }


   $scope.pause = function() {
    $timeout.cancel($scope.timeout);

    $scope.isPaused = true;
  };

  $scope.resume = function() {
    $scope.countdown($scope.total);

    $scope.isPaused = false;
  }

});
};
