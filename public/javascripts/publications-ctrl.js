'use strict';
var app = angular.module('App');

app.controller('PublicationsCtrl', function($scope, $location) {
	$scope.tableClassName = 'publications-table';
	$scope.title = 'Publications';
	$scope.buttonText = 'Add Publication';
	$scope.description = 'Click on publication to ...';
	$scope.rowHeaders = ['Publication', 'Date', 'Status'];
	$scope.cellTypes = ['/view/cell-clickable.ejs', '/view/cell-plain.ejs', '/view/cell-status.ejs'];
	$scope.clickHandlerMap = {
		button: function() {
			alert('Created Publication');
		},
		name: function(row) {
			$location.url('/publication/' + row.hiddenData.id);
		}
	};
	
	$scope.statusMap = {
		'In Progress': 'label-primary', 
		'Complete': 'label-success', 
		'Approaching Deadline': 'label-warning', 
		'Overdue': 'label-danger'
	};
	// {"publication-0A":"Deep De-Noising Autoencoders","publication-0B":"Convolutional Nets and Radon Transform","publication-3":"Evolutionary Projection Selection","publication-4":"ROI Estimation in Ultrasound Images","publication-5":"Image Segmentation with Self-Configuration","publication-6":"Learning Opposites with Evolving Rules","publication-7":"Validation of Atlas-Based Segmentation"}
	$scope.rows = [
		{viewableData: {"name": "Deep De-Noising Autoencoders", "date":"Jan 1, 1928","status":"In Progress"}, hiddenData: {"id": 'publication-0A'}  },
		{viewableData: {"name": "Convolutional Nets and Radon Transform", "date":"Jan 1, 1952","status":"Complete"}, hiddenData: {"id": 'publication-0B'} },
		{viewableData: {"name": "Evolutionary Projection Selection", "date":"Jan 1, 1964","status":"Approaching Deadline"}, hiddenData: {"id": 'publication-3'} },
		{viewableData: {"name": "ROI Estimation in Ultrasound Images", "date":"Jan 1, 1964","status":"Overdue"}, hiddenData: {"id": 'publication-4'} },
		{viewableData: {"name": "Image Segmentation with Self-Configuration", "date":"Jan 1, 1995","status":"In Progress"}, hiddenData: {"id": 'publication-5'} },
		{viewableData: {"name": "Learning Opposites with Evolving Rules", "date":"Jan 1, 1974","status":"Complete"}, hiddenData: {"id": 'publication-6'} },
		{viewableData: {"name": "Validation of Atlas-Based Segmentation", "date":"Jan 1, 1974","status":"Approaching Deadline"}, hiddenData: {"id": 'publication-7'} },
	];
});