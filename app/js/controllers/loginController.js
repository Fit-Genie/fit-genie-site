module.exports = function(app) {
  app.controller('LoginController', function($scope, $http, $base64, $cookies, $location) {
    $scope.login = function() {
      $http.defaults.headers.common['Authentication'] = 'Basic ' + $base64.encode($scope.user.username + ':' + $scope.user.password);
      $http({
        method: 'GET',
        url: '/api/v1/users',
      }).success(function(data) {
        $cookies.jwt = data.jwt;
        $location.path('/preworkout');
      }).error(function(data) {
        console.log(data);
      });
    }

    $scope.createNewUser = function() {
      console.log('clicked');
      $http({
        method: 'POST',
        url: '/api/v1/users',
        data: $scope.user
      })
      .success(function(data) {
        $cookies.jwt = data.jwt;
        $location.path('/preworkout');
      })
      .error(function(data) {
        console.log('error');
        console.log(data);
      });
    };

  });
}