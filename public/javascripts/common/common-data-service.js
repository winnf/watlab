'use strict';
var app = angular.module('App');

app.factory('CommonDataService', function(){
	var CommonDataService = {
		commonData: {
			isLoggedIn: false,
			navbarOptions: []
		},
		setLoggedIn: function(val){ this.commonData.isLoggedIn = val; },
		setNavBarOptions: function(opt){ this.commonData.navbarOptions = opt; },
	};
	return CommonDataService;
});