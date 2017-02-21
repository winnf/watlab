'use strict';
var app = angular.module('App');
app.directive('abstractTable', function() {
	return {
		restrict: 'E',
		scope: {
			title: '@',
			description: '@',
			buttonText: '@',
			rowHeaders: '=',
			rows: '=',
			cellTypes: '=',
			statusMap: '=',
			clickHandlerMap: '='
		},
		templateUrl: '/view/abstract-table.ejs',
		controller: function($timeout) {
			$timeout(function(){
				$('#abstract-table').DataTable({
					pageLength: 25,
				});
			}, 0);
		}
	};
});
