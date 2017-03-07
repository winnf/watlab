'use strict';
var app = angular.module('App');

app.controller('DashboardCtrl', function($scope, $window, $location) {
	$scope.dTiles = [
		{name: 'Lab Equipment and Safety Compliance', url: '/esr'},
		{name: 'Lab Projects and Staff', url: '/psr'},
		{name: 'Lab Publications and Experiment', url: '/per'},
	];

	$scope.navigateTo = function(dTile) {
		$window.location.href = dTile.url;
	};
});