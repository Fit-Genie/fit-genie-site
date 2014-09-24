module.exports = function(app) {
  app.controller('PreWorkoutController', function($scope, $http, $cookies) {
  	console.log($cookies.jwt);
    $http.defaults.headers.common['jwt'] = $cookies.jwt;
  });
}