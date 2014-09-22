module.exports = function(app) {
  app.controller('PreWorkoutController', function($scope, $http, $cookies) {
    $http.defaults.headers.common['jwt'] = $cookies.jwt;
  });
}