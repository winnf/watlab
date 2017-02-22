'use strict';
var app = angular.module('App');

app.controller('ExperimentsCtrl', function($scope, $location) {
	$scope.tableClassName = 'experiments-table';
	$scope.title = 'Experiments';
	$scope.buttonText = 'Add Experiment';
	$scope.description = 'Click on the experiment name to edit the data, protocols and references. ';
	$scope.rowHeaders = ['Experiment', 'Date', 'Owner', 'Assignees', 'Status'];
	$scope.cellTypes = ['/view/cell-clickable.ejs', '/view/cell-plain.ejs', '/view/cell-plain.ejs', '/view/cell-plain.ejs', '/view/cell-status.ejs'];
	$scope.clickHandlerMap = {
		button: function() {
			alert('Created Experiment');
		},
		name: function(row) {
			$location.url('/experiment/' + row.hiddenData.id);
		}
	};
	
	$scope.statusMap = {
		'In Progress': 'label-primary', 
		'Complete': 'label-success', 
		'Approaching Deadline': 'label-warning', 
		'Overdue': 'label-danger'
	};

	$scope.rows = [
		{viewableData: {"name": "Correlated diffusion imaging (CDI) for cancer imaging", "date":"Jan 1, 1928","owner":"John Smith","assignees":"[Bob, William, Ray]","status":"In Progress"}, hiddenData: {"id": 'experiment-0A'} },
		{viewableData: {"name": "Evolutionary deep intelligence for operational deep intelligence", "date":"Jan 1, 1952","owner":"John Bob","assignees":"[John, Smith, Ray]","status":"Complete"}, hiddenData: {"id": 'experiment-0B'} },
		{viewableData: {"name": "Musculoskeletal kinematic analysis using video fluoroscopy", "date":"Jan 1, 1964","owner":"John Smith","assignees":"[Bob, William, Ray]","status":"Approaching Deadline"}, hiddenData: {"id": 'experiment-3'} },
		{viewableData: {"name": "Ocular morphological analysis", "date":"Jan 1, 1964","owner":"John Bob","assignees":"[Smith, William, Ray]","status":"Overdue"}, hiddenData: {"id": 'experiment-4'} },
		{viewableData: {"name": "Sea ice analysis using synthetic aperture radar ", "date":"Jan 1, 1995","owner":"John Smith","assignees":"[Bob, William, Ray]","status":"In Progress"}, hiddenData: {"id": 'experiment-5'} },
		{viewableData: {"name": "Image and video noise reduction and artifact reduction", "date":"Jan 1, 1974","owner":"William Bob","assignees":"[William, Ray, Smith]","status":"Complete"}, hiddenData: {"id": 'experiment-6'} },
		{viewableData: {"name": "Spectral demultiplexed imaging (SDI) for single-shot multispectral tissue", "date":"Jan 1, 1974","owner":"John Smith","assignees":"[Bob, William, Ray]","status":"Approaching Deadline"}, hiddenData: {"id": 'experiment-7'} },
	];
});