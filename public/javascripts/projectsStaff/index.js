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

app.controller('TestCtrl', function(CommonDataService, $location) {
  var noticeActive = false;
  var taskActive = false;
  var projectActive = false;
  var compenActive = false;
  var budgetActive = false;

  switch($location.path()){
    case '/psr/notices':
      noticeActive = true;
      break;
    case '/psr/tasks':
      taskActive = true;
      break;
    case '/psr/projects':
      projectActive = true;
      break;
    case '/psr/compensation':
      compenActive = true;
      break;
    case '/psr/budget':
      budgetActive = true;
      break;
    default:
      noticeActive = true;
      break;
  }

	CommonDataService.setNavBarOptions([
    {text:"Notices",url:"/psr/notices",isActive: noticeActive},
    {text:"Tasks",url:"/psr/tasks",isActive: taskActive},
    {text:"Projects",url:"/psr/projects",isActive: projectActive},
    {text:"Compensation",url:"/psr/compensation",isActive: compenActive},
    {text:"Budget",url:"/psr/budget",isActive: budgetActive}
  ]);
	CommonDataService.setLoggedIn(true);
});
