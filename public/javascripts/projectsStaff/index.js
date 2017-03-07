'use strict';
var app = angular.module('App', ['ui.bootstrap', 'ngRoute']);
app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/psr', {
        templateUrl : '/psr/view/test.ejs'
    })
    .otherwise({
    	redirectTo: '/psr'
    });

	$locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

app.controller('TestCtrl', function(CommonDataService) {
	CommonDataService.setNavBarOptions([]);
	CommonDataService.setLoggedIn(true);
});