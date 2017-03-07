'use strict';
var app = angular.module('App', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/login', {
        templateUrl: '/view/login-box.ejs'
    })
    .when('/dashboard', {
    	templateUrl: '/view/dashboard.ejs'
    })
    .otherwise({
    	redirectTo: '/login'
    });

	$locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});