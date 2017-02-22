'use strict';
var app = angular.module('App');

app.controller('SpecificExperimentCtrl', function($scope, $routeParams) {
	var experimentId = $routeParams.experimentId;

	// Dummy http request for now
	var getNameFromId = function(id){ return {"experiment-0A":"Correlated diffusion imaging (CDI) for cancer imaging","experiment-0B":"Evolutionary deep intelligence for operational deep intelligence","experiment-3":"Musculoskeletal kinematic analysis using video fluoroscopy","experiment-4":"Ocular morphological analysis","experiment-5":"Sea ice analysis using synthetic aperture radar ","experiment-6":"Image and video noise reduction and artifact reduction","experiment-7":"Spectral demultiplexed imaging (SDI) for single-shot multispectral tissue"}[id]; };

	$scope.tableClassName = 'specific-experiment-table';
	$scope.tabs = ['Data', 'Labbook', 'Protocols', 'Literature & Papers Reference'];

	$scope.title = getNameFromId(experimentId);
	
	$scope.table = [
		{
			rowHeaders: ['File Name', 'Date', 'Owner', 'Format', 'Download', 'Archive'],
			cellTypes: ['/view/cell-plain.ejs', '/view/cell-plain.ejs', '/view/cell-plain.ejs', '/view/cell-plain.ejs', '/view/cell-download.ejs', '/view/cell-delete.ejs'],
			rows: [
				{viewableData: {"file-name": "Cell Sample Data", "date":"Jan 1, 1928","owner":"William Smith","format":".csv","download":true,"archive":true}, hiddenData: {"url": 'experiment-0A'} },
				{viewableData: {"file-name": "Microwave Data", "date":"Jan 1, 1952","owner":"John Smith","format":".py","download":true,"archive":true}, hiddenData: {"url": 'experiment-0B'} },
				{viewableData: {"file-name": "Radiation Data", "date":"Jan 1, 1964","owner":"John Bob","format":".mat","download":true,"archive":true}, hiddenData: {"url": 'experiment-3'} },
				{viewableData: {"file-name": "Bird Calls", "date":"Jan 1, 1964","owner":"Bob John","format":".mp3","download":true,"archive":true}, hiddenData: {"url": 'experiment-4'} },
				{viewableData: {"file-name": "Seisometer", "date":"Jan 1, 1995","owner":"Smith William","format":".jpeg","download":true,"archive":true}, hiddenData: {"url": 'experiment-5'} },
				{viewableData: {"file-name": "Lochness Monster Sighting", "date":"Jan 1, 1974","owner":"Bob Smith","format":".mp4","download":true,"archive":true}, hiddenData: {"url": 'experiment-6'} },
			]
		},
		{
			rowHeaders: ['Download', 'Date', 'Format', 'Bae', 'Archive'],
			cellTypes: ['/view/cell-plain.ejs', '/view/cell-plain.ejs', '/view/cell-plain.ejs', '/view/cell-download.ejs', '/view/cell-delete.ejs'],
			rows: [
				{viewableData: {"name": "Cell Sample Data", "date":"Jan 1, 1928","format":".csv","download":true,"archive":true}, hiddenData: {"url": 'experiment-0A'} },
				{viewableData: {"name": "Microwave Data", "date":"Jan 1, 1952","format":".csv","download":true,"archive":true}, hiddenData: {"url": 'experiment-0B'} },
				{viewableData: {"name": "Radiation Data", "date":"Jan 1, 1964","format":".csv","download":true,"archive":true}, hiddenData: {"url": 'experiment-3'} },
				{viewableData: {"name": "Bird Calls", "date":"Jan 1, 1964","format":".csv","download":true,"archive":true}, hiddenData: {"url": 'experiment-4'} },
				{viewableData: {"name": "Seisometer", "date":"Jan 1, 1995","format":".csv","download":true,"archive":true}, hiddenData: {"url": 'experiment-5'} },
				{viewableData: {"name": "Lochness Monster Sighting", "date":"Jan 1, 1974","format":".csv","download":true,"archive":true}, hiddenData: {"url": 'experiment-6'} },
			]
		},

	];

	function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
	}

	$scope.includeTabs = true;
	$scope.clickHandlerMap = {
		button: function() {
			alert('Add ' + $scope.tabs[$scope.currentTabIndex]);
		},
		archive: function(row, i, event) {
			var tr = $(event.target).closest('tr');
			$('#abstract-table').DataTable().row(tr).remove().draw();
			// var rows = $scope.table[$scope.currentTabIndex].rows;
			// var rowIndex = rows.indexOf(row);
			// rows.splice(rowIndex, 1);
		},
		download: function(row) {
			downloadURI('', row.viewableData['file-name'].split(' ').join('-').toLowerCase() + row.viewableData.format);
		},
		tabChange: function(index) {
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