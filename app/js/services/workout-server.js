'use strict';

module.exports = function(app) {
  app.factory('workoutServer', function($http) {
    var parseWorkout = function(workout) {
      return {name: workout.name, type: workout.type, duration: workout.duration, description: workout.description };
    };

    var workout = {
      index: function() {
        var promise = $http({
          method: 'GET',
          url: '/api/v_0_0_1/workouts'
        })
          .error(function(data, status) {
            console.log('error!');
            console.log(data);
            console.log(status);
          });
        return promise;
      },
      saveNewWorkout: function(workout) {
        var promise = $http.post('/api/v_0_0_1/workouts/', parseWorkout(workout))
          .error(function(data, status) {
            console.log('error!');
            console.log(data);
            console.log(status);
          });
        return promise;
      },
      saveOldWorkout: function(workout) {
        var promise = $http.put('/api/v_0_0_1/workouts/' + workout._id, parseWorkout(workout))
          .error(function(data, status) {
            console.log('error!');
            console.log(data);
            console.log(status);
          });
        return promise;
      },
      deleteWorkout: function(workout) {
        var promise = $http.delete('/api/v_0_0_1/workouts/' + workout._id)
          .error(function(data, status) {
            console.log('error!');
            console.log(data);
            console.log(status);
          });
        return promise;
      }

    };
    return workout;

  });
};
