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
			var initialized = false;

			$scope.recursiveFn = function() {
				if($scope.loading) {
					$timeout(function() {
						$scope.loading = false;
						$scope.recursiveFn();
					});
				} else {
					$timeout(function() {
						$('#abstract-table').DataTable({ pageLength: 25});
					}, 200);
				}
			};

			$scope.$watch('rowHeaders', function(n, o){
				$scope.rowHeaderClass = $scope.rowHeaders.map(x => x.split(' ').join('-').toLowerCase());
				$scope.loading = false;
				if(initialized) {
					$('#abstract-table').DataTable().destroy();
					$scope.loading = true;
				}

				$scope.recursiveFn();
				initialized = true;
			});
		}
	};
});