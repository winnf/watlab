'use strict';
var app = angular.module('App');

app.controller('NavBarCtrl', function($scope, $location, $window, CommonDataService) {
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

	$scope.backHome = leaveFn;
	$scope.logout = leaveFn;
});