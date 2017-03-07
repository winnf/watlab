'use strict';
var app = angular.module('App');

app.controller('LoginCtrl', function($scope, $location, CommonDataService) {
	$scope.login = function() {
		CommonDataService.setLoggedIn(true);
		$location.url('/dashboard');
	};
});