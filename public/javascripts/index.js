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

app.controller('ExperimentCtrl', function($scope, $timeout) {
	$timeout(function(){
		$('#example').DataTable();
	}, 0);
	// 'label-default', 'label-info', 
	$scope.statusMap = {
		'In Progress': 'label-primary', 
		'Complete': 'label-success', 
		'Approaching Deadline': 'label-warning', 
		'Overdue': 'label-danger'
	};
	var experiments = [
		{name: 'Miller–Urey experiment', date: 'Jan 1, 1952', url: 'a'},
		{name: 'Hershey–Chase experiments', date: 'Jan 1, 1952', url: 'a'},
		{name: 'Bose–Einstein condensate', date: 'Jan 1, 1995', url: 'a'},
		{name: 'Milgram experiment', date: 'Jan 1, 1974', url: 'a'},
		{name: 'Nirenberg and Leder experiment', date: 'Jan 1, 1964', url: 'a'},
		{name: 'Crick, Brenner et al. experiment', date: 'Jan 1, 1961', url: 'a'},
		{name: 'Griffiths experiment', date: 'Jan 1, 1928', url: 'a'},
	];
	$scope.experiments = [];
	for(var i = 0, len = experiments.length * 10; i < len; i++) {
		var temp = experiments[i%experiments.length];
		var t = temp.name;
		var e = Math.floor(Math.random()*7);
		t = t.slice(e) + t.slice(0, e);
		var clone = {name: t, url: temp.url};
		clone.date = experiments[e].date;
		clone.status = Object.keys($scope.statusMap)[i%4];
		$scope.experiments.push(clone);
	}
});

app.controller('PublicationCtrl', function($scope, $timeout) {
	$timeout(function(){
		$('#example').DataTable();
	}, 0);
	$scope.statusMap = {
		'In Progress': 'label-primary', 
		'Complete': 'label-success', 
		'Approaching Deadline': 'label-warning', 
		'Overdue': 'label-danger'
	};
	var publications = [
		{name: 'Miller–Urey experiment', date: 'Jan 1, 1952', url: 'a'},
		{name: 'Hershey–Chase experiments', date: 'Jan 1, 1952', url: 'a'},
		{name: 'Bose–Einstein condensate', date: 'Jan 1, 1995', url: 'a'},
		{name: 'Milgram experiment', date: 'Jan 1, 1974', url: 'a'},
		{name: 'Nirenberg and Leder experiment', date: 'Jan 1, 1964', url: 'a'},
		{name: 'Crick, Brenner et al. experiment', date: 'Jan 1, 1961', url: 'a'},
		{name: 'Griffiths experiment', date: 'Jan 1, 1928', url: 'a'},
	];
	$scope.publications = [];
	for(var i = 0, len = publications.length * 10; i < len; i++) {
		var temp = publications[i%publications.length];
		var t = temp.name;
		var e = Math.floor(Math.random()*7);
		t = t.slice(e) + t.slice(0, e);
		var clone = {name: t, url: temp.url};
		clone.date = publications[e].date;
		clone.status = Object.keys($scope.statusMap)[i%4];
		$scope.publications.push(clone);
	}
});