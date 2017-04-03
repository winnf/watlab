'use strict';
var app = angular.module('App');

app.controller('DashboardCtrl', function($scope, $window, $location, $http) {
	$scope.dTiles = [
		{name: 'Lab Equipment and Safety Compliance', url: '/esr', imgSrc: '/images/flask-outline.png'},
		{name: 'Lab Projects and Staff', url: '/psr', imgSrc: '/images/id-card.png'},
		{name: 'Lab Publications and Experiment', url: '/per', imgSrc: '/images/edit.png'},
	];

	$scope.navigateTo = function(dTile) {
		$window.location.href = dTile.url;
	};
});