require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var fitApp = angular.module('fitApp', ['ngRoute', 'base64', 'ngCookies']);

require('./controllers/loginController')(fitApp);
require('./controllers/preWorkoutController')(fitApp);
require('./controllers/createController')(fitApp);
// require('./controllers/workoutController')(fitApp);
// require('./controllers/congratsController')(fitApp);
// require('./controllers/postWorkoutController')(fitApp);

require('./services/workout-server')(fitApp);

fitApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })
    .when('/preworkout', {
      templateUrl: 'views/preworkout.html',
      controller: 'PreWorkoutController'
    })
    .when('/workout', {
      templateUrl: 'views/workout.html',
      controller: 'WorkoutController'
    })
    .when('/congrats', {
      templateUrl: 'views/congrats.html',
      controller: 'CongratsController'
    })
    .when('/postworkout', {
      templateUrl: 'views/postworkout.html',
      controller: 'PostWorkoutController'
    })
    .when('/create', {
      templateUrl: 'views/create.html',
      controller: 'CreateCtrl'
    })
    .otherwise({
      redirectTo: '/create'
    });
}]);