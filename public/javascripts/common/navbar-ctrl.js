'use strict';
var app = angular.module('App');

app.controller('NavBarCtrl', function($scope, $location, $window, CommonDataService, $http) {
	$scope.commonData = CommonDataService.commonData;
	var leaveFn = function() {
		var path = $scope.commonData.isLoggedIn ? '/dashboard' : '/';
		$window.location.href = path;
	};

	$scope.navigateToOption = function(navbarOption) {
		$scope.commonData.navbarOptions.forEach(x => x.isActive = false);
		navbarOption.isActive = true;
		$location.url(navbarOption.url);
	};

	$scope.setUser = function() {
		$http.get('/getUser').then(function(result) {
			$window.localStorage.setItem('userName', result.data.name);
			$window.localStorage.setItem('userId', result.data._id);
			$scope.userName = result.data.name;
			console.log('User set has ' + result.data);
		});
	};

	$scope.setUser();
	$scope.backHome = leaveFn;
	$scope.logout = leaveFn;
});