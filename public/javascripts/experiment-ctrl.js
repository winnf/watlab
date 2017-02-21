'use strict';
var app = angular.module('App');

app.controller('ExperimentCtrl', function($scope) {
	$scope.title = 'Experiments';
	$scope.buttonText = 'Add Experiment';
	$scope.description = 'Click on the experiment name to edit the data, protocols and references. ';
	$scope.rowHeaders = ['Experiment', 'Date', 'Status'];
	$scope.cellTypes = ['/view/clickable-cell.ejs', '/view/plain-cell.ejs', '/view/status-cell.ejs'];
	$scope.clickHandlerMap = {
		button: function() {
			alert('Created Experiment');
		},
		name: function(row) {
			alert(JSON.stringify(row));
		}
	}
	
	$scope.statusMap = {
		'In Progress': 'label-primary', 
		'Complete': 'label-success', 
		'Approaching Deadline': 'label-warning', 
		'Overdue': 'label-danger'
	};

	$scope.rows = [
		{viewableData: {"name": "Experiment1", "date":"Jan 1, 1928","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment2", "date":"Jan 1, 1952","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment3", "date":"Jan 1, 1964","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment4", "date":"Jan 1, 1964","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment5", "date":"Jan 1, 1995","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment6", "date":"Jan 1, 1974","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment7", "date":"Jan 1, 1974","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment8", "date":"Jan 1, 1952","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment9", "date":"Jan 1, 1974","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment10", "date":"Jan 1, 1928","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment11", "date":"Jan 1, 1974","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment12", "date":"Jan 1, 1974","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment13", "date":"Jan 1, 1928","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment14", "date":"Jan 1, 1964","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment15", "date":"Jan 1, 1952","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment16", "date":"Jan 1, 1995","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment17", "date":"Jan 1, 1928","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment18", "date":"Jan 1, 1974","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment19", "date":"Jan 1, 1974","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment20", "date":"Jan 1, 1961","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment21", "date":"Jan 1, 1952","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment22", "date":"Jan 1, 1974","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment23", "date":"Jan 1, 1952","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment24", "date":"Jan 1, 1961","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment25", "date":"Jan 1, 1952","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment26", "date":"Jan 1, 1928","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment27", "date":"Jan 1, 1928","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment28", "date":"Jan 1, 1928","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment29", "date":"Jan 1, 1974","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment30", "date":"Jan 1, 1952","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment31", "date":"Jan 1, 1995","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment32", "date":"Jan 1, 1964","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment33", "date":"Jan 1, 1952","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment34", "date":"Jan 1, 1974","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment35", "date":"Jan 1, 1995","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment36", "date":"Jan 1, 1952","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment37", "date":"Jan 1, 1964","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment38", "date":"Jan 1, 1928","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment39", "date":"Jan 1, 1995","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment40", "date":"Jan 1, 1995","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment41", "date":"Jan 1, 1964","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment42", "date":"Jan 1, 1995","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment43", "date":"Jan 1, 1995","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment44", "date":"Jan 1, 1961","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment45", "date":"Jan 1, 1952","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment46", "date":"Jan 1, 1961","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment47", "date":"Jan 1, 1995","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment48", "date":"Jan 1, 1928","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment49", "date":"Jan 1, 1995","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment50", "date":"Jan 1, 1928","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment51", "date":"Jan 1, 1952","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment52", "date":"Jan 1, 1995","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment53", "date":"Jan 1, 1961","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment54", "date":"Jan 1, 1952","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment55", "date":"Jan 1, 1961","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment56", "date":"Jan 1, 1952","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment57", "date":"Jan 1, 1964","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment58", "date":"Jan 1, 1974","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment59", "date":"Jan 1, 1995","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment60", "date":"Jan 1, 1928","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment61", "date":"Jan 1, 1974","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment62", "date":"Jan 1, 1961","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment63", "date":"Jan 1, 1952","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment64", "date":"Jan 1, 1974","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment65", "date":"Jan 1, 1974","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment66", "date":"Jan 1, 1961","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment67", "date":"Jan 1, 1952","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment68", "date":"Jan 1, 1961","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment69", "date":"Jan 1, 1961","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Experiment70", "date":"Jan 1, 1974","status":"Overdue"}, hiddenData: {"url": "a"} },
	];
});