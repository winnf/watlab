'use strict';
var app = angular.module('App', ['ui.bootstrap', 'ngRoute']);
app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/psr/notices', {
        templateUrl : '/psr/view/notices.ejs'
    })
    .when('/psr/tasks', {
        templateUrl : '/psr/view/tasks.ejs'
    })
    .when('/psr/projects', {
        templateUrl : '/psr/view/projects.ejs'
    })
    .when('/psr/compensation', {
        templateUrl : '/psr/view/compensations.ejs'
    })
    .when('/psr/budget', {
        templateUrl : '/psr/view/budgets.ejs'
    })
    .otherwise({
    	redirectTo: '/psr/notices'
    });

	$locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

app.controller('TestCtrl', function(CommonDataService) {
	CommonDataService.setNavBarOptions([
    {text:"Notices",url:"/psr/notices",isActive: true},
    {text:"Tasks",url:"/psr/tasks",isActive: false},
    {text:"Projects",url:"/psr/projects",isActive: false},
    {text:"Compensation",url:"/psr/compensation",isActive: false},
    {text:"Budget",url:"/psr/budget",isActive: false}
  ]);
	CommonDataService.setLoggedIn(true);
});
