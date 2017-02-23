'use strict';
var app = angular.module('App');
app.directive('abstractTable', function() {
	return {
		restrict: 'E',
		scope: {
			tableClassName: '@',

			title: '@',
			description: '@',
			buttonText: '@',

			tabs: '=',
			includeTabs: '=',
			currentTabIndex: '=',

			rowHeaders: '=',
			rows: '=',
			cellTypes: '=',
			statusMap: '=',
			clickHandlerMap: '='
		},
		templateUrl: '/view/abstract-table.ejs',
		controller: function($scope, $timeout) {
			$scope.$watch('rowHeaders', function(n, o){
				$scope.rowHeaderClass = $scope.rowHeaders.map(x => x.split(' ').join('-').toLowerCase());
			});

			$timeout(function() {
				$('#abstract-table').DataTable({ pageLength: 25});
				console.log('Initialized');
			}, 200);
		}
	};
});