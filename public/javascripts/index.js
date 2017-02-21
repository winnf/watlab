'use strict';
var app = angular.module('App', ['ui.bootstrap', 'ngRoute']);
app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when("/login", {
        templateUrl : '/view/login.ejs'
    })
    .when("/experiments", {
        templateUrl : '/view/experiments.ejs'
    })
    .when("/publications", {
        templateUrl : '/view/publications.ejs'
    })
    .otherwise({
    	redirectTo: '/login'
    });

	$locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

app.controller('MainCtrl', function($scope){
});

app.controller('NavBarCtrl', function($scope, $location, CommonDataService) {
	$scope.commonData = CommonDataService.commonData;
	$scope.navbarOptions = [
		{text: 'Experiments', url: '/experiments', isActive: true},
		{text: 'Publications', url: '/publications', isActive: false}
	];
	var leaveFn = function() {
		CommonDataService.setLoggedIn(false);
		$location.url('/');
	};

	$scope.navigateToOption = function(navbarOption) {
		$scope.navbarOptions.forEach(x => x.isActive = false);
		navbarOption.isActive = true;
		$location.url(navbarOption.url);
	};

	$scope.backHome = leaveFn;
	$scope.logout = leaveFn;
});

app.controller('LoginCtrl', function($scope, $location, CommonDataService) {
	$scope.login = function() {
		CommonDataService.setLoggedIn(true);
		$location.url('/experiments');
	};
});

app.factory('CommonDataService', function(){
	var CommonDataService = {
		commonData: {
			isLoggedIn: false
		},
		setLoggedIn: function(val){ this.commonData.isLoggedIn = val; }
	};
	return CommonDataService;
});