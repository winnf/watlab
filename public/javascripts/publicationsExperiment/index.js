'use strict';
var app = angular.module('App', ['ui.bootstrap', 'ngRoute']);
app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/per/experiments', {
        templateUrl : '/per/view/experiments.ejs'
    })
    .when('/per/experiment/:experimentId', {
        templateUrl : '/per/view/specific-experiment.ejs'
    })
    .when('/per/publications', {
        templateUrl : '/per/view/publications.ejs'
    })
    .otherwise({
    	redirectTo: '/per/experiments'
    });

	$locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

app.controller('TestCtrl', function(CommonDataService) {
	CommonDataService.setNavBarOptions([
		{text: 'Experiments', url: '/experiments', isActive: true},
		{text: 'Publications', url: '/publications', isActive: false}
	]);
	CommonDataService.setLoggedIn(true);
});


