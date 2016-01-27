'use strict'

var app = angular.module('sampleApp', ['ngRoute']);

console.log("loading a_app.js");

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/index.html'
  });
}]);

app.factory('socket', ['$rootScope', function($rootScope) {
  var socket = io.connect();

  return {
    on: function(eventName, callback){
      socket.on(eventName, callback);
    },
    emit: function(eventName, data) {
      socket.emit(eventName, data);
    }
  };
}]);

app.controller('IndexController', function($scope, socket) {
  $scope.newCustomers = [];
  $scope.currentCustomer = {};
  $scope.newBitbucketData = [];
  $scope.newJenkinsData = [];

  $scope.join = function() {
    socket.emit('add-customer', $scope.currentCustomer);
  };

  $scope.list_branches = function() {
    socket.emit("get-branches", $scope.branches);
  }

  socket.on('add-customer', function(data) {
    $scope.$apply(function () {
      $scope.newCustomers.push(data.customer);
    });
  });

  socket.on('get-branches'), function (data) {
    console.log(data);

  }

  socket.on('bitbucket', function (data) {
    console.log(data);
    var display_data = {
      "actor":  data.actor,
      "branch": data.push.changes[0].new.name,
      "link":   data.push.changes[0].links.html.href,
      "message": data.push.changes[0].new.target.message,
      "date":   data.push.changes[0].new.target.date
    };
    $scope.$apply(function() {
      $scope.newBitbucketData.push(display_data);
    });
  });

  socket.on('jenkins', function (data) {
    console.log(data);
    $scope.$apply(function() {
      $scope.newJenkinsData.push(data);
    });
  });
});
