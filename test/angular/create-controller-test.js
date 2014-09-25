'use strict';

require('../../app/js/app.js');
require('angular-mocks');

describe('CreateController', function() {
  var $controllerConstructor;
  var $httpBackend;
  var scope;

  beforeEach(angular.mock.module('fitApp'));

  beforeEach(angular.mock.inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    $controllerConstructor = $controller;
  }));

  it('should be able to create a new controller', function() {
    var createController = $controllerConstructor('CreateCtrl', {$scope: scope });
    expect(typeof createController).toBe('object'); 
  });

  it('should remove workout', function() {
  	var createController = $controllerConstructor('CreateCtrl', {$scope: scope });
  	scope.workouts = [];
  	var test = {'name': 'test'};
  	scope.workouts.push(test);
  	scope.remove(test);
  	expect(scope.workouts.length).toEqual(0);
  });

  describe('rest requests', function() {
    var ctrl;
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_; 
      $httpBackend.expectGET('/api/v_0_0_1/workouts').respond(200, [{'name': 'test name'}]);
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request', function() {
      ctrl = $controllerConstructor('CreateCtrl', {$scope: scope});

      $httpBackend.flush();

      expect(Array.isArray(scope.workouts)).toBeTruthy();
      expect(scope.workouts[0].name).toEqual('test name');
    });

    it('should be able to create a new workout', function() {
      $httpBackend.expectPOST('/api/v_0_0_1/workouts/').respond(200, {'name': 'test'});
      ctrl = $controllerConstructor('CreateCtrl', {$scope: scope});
      scope.workout = {'name': 'test'};
      scope.saveWorkout();

      $httpBackend.flush();
    });

    it('should be able to delete a workout', function() {
      $httpBackend.expectDELETE('/api/v_0_0_1/workouts/1').respond(200, {});
      $httpBackend.expectGET('/api/v_0_0_1/workouts').respond(200, [{}]);
      ctrl = $controllerConstructor('CreateCtrl', {$scope: scope});
      scope.deleteWorkout({_id: '1'});

      $httpBackend.flush();
    });
  });
});
