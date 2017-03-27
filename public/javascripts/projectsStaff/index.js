'use strict';
var app = angular.module('App', ['ui.bootstrap', 'ngRoute']);
app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/psr/notices', {
        templateUrl : '/psr/view/test.ejs'
    })
    .when('/psr/tasks', {
        templateUrl : '/psr/view/tasks.ejs'
    })
    .when('/psr/projects', {
        templateUrl : '/psr/view/test.ejs'
    })
    .when('/psr/compensation', {
        templateUrl : '/psr/view/test.ejs'
    })
    .when('/psr/budget', {
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
	CommonDataService.setNavBarOptions([
    {text:"Notices",url:"/notices",isActive:true},
    {text:"Tasks",url:"/tasks",isActive:false},
    {text:"Projects",url:"/projects",isActive:false},
    {text:"Compensation",url:"/compensation",isActive: false},
    {text:"Budget",url:"/budget",isActive:false}
  ]);
	CommonDataService.setLoggedIn(true);
});
