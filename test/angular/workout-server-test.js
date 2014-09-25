'use strict';

require('../../app/js/app.js');
require('angular-mocks');

describe('workoutServer service', function() {
  beforeEach(angular.mock.module('fitApp'));

  var ws;
  var $httpBackend;
  var testWorkout = {name: 'test', _id: '1'};
  beforeEach(angular.mock.inject(function(workoutServer, _$httpBackend_) {
    ws = workoutServer;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make a get request', function() {
    $httpBackend.expectGET('/api/v_0_0_1/workouts').respond(200, [{}]);
    ws.index();

    $httpBackend.flush();    
  });

  it('should make a post request', function() {
    $httpBackend.expectPOST('/api/v_0_0_1/workouts/').respond(200, testWorkout);
    ws.saveNewWorkout(testWorkout);

    $httpBackend.flush();
  });


  it('should be able to make a delete request', function() {
    $httpBackend.expectDELETE('/api/v_0_0_1/workouts/1').respond(200);
    ws.deleteWorkout(testWorkout);

    $httpBackend.flush();
  });
});
