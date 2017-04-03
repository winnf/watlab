/*jslint node: true */
/*global $, jQuery, alert, angular*/
'use strict';
var app = angular.module('App');

app.controller('SpecificExperimentCtrl', function ($scope, $window, $routeParams, $uibModal, CELLTYPES, ngToast, $timeout, $http) {
	var experimentId = $routeParams.experimentId;

	$scope.tableClassName = 'specific-experiment-table';
	$scope.tabs = ['Data', 'Protocols', 'Literature & Papers Reference'];

	// Converts entry to row
	$scope.processEntry = function(entry) {
		return {viewableData: {
			fileName: entry.name, description: entry.description, 
			date: entry.date, owner: entry.owner.name, format: entry.format, download: true, archive: true 
		},
		hiddenData: {id: entry._id, mimetype: entry.mimetype, filePath: entry.filePath} }
	};

	$http.get('/per/getExperimentData/' + experimentId).then(function(result){
		var data = result.data;
		$scope.title = data.name;

		var entryRows = [];
		var protocolRows = [];

		data.entryIds.forEach(entry => {
			var row = $scope.processEntry(entry);
			if(entry.isProtocol) protocolRows.push(row);
			else entryRows.push(row);
		});

		// Add entry items to the rows
		Array.prototype.splice.apply($scope.table[0].rows, [$scope.table[0].rows.length, 0].concat(entryRows)); 
		Array.prototype.splice.apply($scope.table[1].rows, [$scope.table[1].rows.length, 0].concat(protocolRows)); 
	}, function() {

	});

	$scope.table = [
		{
			rowHeaders: ['File Name', 'Description', 'Date', 'Owner', 'Format', 'Download', 'Archive'],
			cellTypes: {
				fileName: CELLTYPES.PLAIN,
				description: CELLTYPES.PLAIN,
				date: CELLTYPES.DATE,
				owner: CELLTYPES.PLAIN,
				format: CELLTYPES.PLAIN,
				download: CELLTYPES.DOWNLOAD,
				archive: CELLTYPES.DELETE
			},
			rows: []
		},
		{
			rowHeaders: ['Protocols', 'Description', 'Date', 'Owner', 'Download', 'Archive'],
			cellTypes: {
				fileName: CELLTYPES.PLAIN,
				description: CELLTYPES.PLAIN,
				date: CELLTYPES.DATE,
				owner: CELLTYPES.PLAIN,
				download: CELLTYPES.DOWNLOAD,
				archive: CELLTYPES.DELETE
			},
			rows: []
		},
		{
			rowHeaders: ['Literature and References'],
			cellTypes: {
				literature: CELLTYPES.PLAIN
			},
			rows: [
				{viewableData: {"literature": "Paper1"}, hiddenData: {} },
				{viewableData: {"literature": "Paper2"}, hiddenData: {} },
				{viewableData: {"literature": "Paper3"}, hiddenData: {} },
				{viewableData: {"literature": "Paper4"}, hiddenData: {} },
				{viewableData: {"literature": "Paper5"}, hiddenData: {} },
				{viewableData: {"literature": "Paper6"}, hiddenData: {} }
			]
		}
	];

	var uploadData = function () {
		var modalInstance = $uibModal.open({
			backdrop: 'static',
            templateUrl: '/per/view/modal-add-data.ejs',
            controller: 'AddDataModalCtrl',
            appendTo: $('body'),
            resolve: {
            	currentTabIndex: function(){ return $scope.currentTabIndex; }
            }
        });

        modalInstance.result.then(function(result){
        	$scope.showToast = true;
	    	$timeout(function(){ 
	    		if(typeof result.err === 'undefined') {
		    		ngToast.create('Success uploading ' + result.map(x=>x.name).join(', '));
		    		var rows = result.map(x => $scope.processEntry(x));
					Array.prototype.splice.apply($scope.table[$scope.currentTabIndex].rows, [$scope.table[$scope.currentTabIndex].rows.length, 0].concat(rows)); 
		    		$scope.addRow();
	    		} else {
	    			ngToast.create({className: 'danger', content: 'Error uploading data'}); 
	    		}
	    	});
        })
	};

	$scope.addRow = function() {
		$timeout(function () {
			var row = $('#abstract-table tr').last();
			$('#abstract-table').DataTable().row.add(row[0]);
		});
	};

	$scope.includeTabs = true;
	$scope.clickHandlerMap = {
		button: function () {
			if ($scope.currentTabIndex === 0 || $scope.currentTabIndex === 1) {
				uploadData();
			} else {
				alert('Add ' + $scope.tabs[$scope.currentTabIndex]);
			}
		},
		archive: function (row, i, event) {
			var tr = $(event.target).closest('tr');
			$('#abstract-table').DataTable().row(tr).remove().draw();
		},
		download: function (row) {
			var entryId = row.hiddenData.id;
			$window.open('/per/downloadFile/' + entryId);
		},
		tabChange: function (index) {
			var table = $scope.table[index];
			$scope.buttonText = 'Add ' + $scope.tabs[index];
			$scope.description = 'Here is your ' + $scope.tabs[index];
			$scope.rowHeaders = table.rowHeaders;
			$scope.cellTypes = table.cellTypes;
			$scope.rows = table.rows;
			$scope.currentTabIndex = index;
		}
	};

	$scope.clickHandlerMap.tabChange(0);
	
	$scope.statusMap = {
		'In Progress': 'label-primary',
		'Complete': 'label-success',
		'Approaching Deadline': 'label-warning',
		'Overdue': 'label-danger'
	};
});