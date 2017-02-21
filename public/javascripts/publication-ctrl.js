'use strict';
var app = angular.module('App');

app.controller('PublicationCtrl', function($scope) {
	$scope.title = 'Publication';
	$scope.buttonText = 'Add Publication';
	$scope.description = 'Click on publication to ...';
	$scope.rowHeaders = ['Publication', 'Date', 'Status'];
	$scope.cellTypes = ['/view/clickable-cell.ejs', '/view/plain-cell.ejs', '/view/status-cell.ejs'];
	$scope.clickHandlerMap = {
		button: function() {
			alert('Created Publication');
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
		{viewableData: {"name": "Publication1", "date":"Jan 1, 1928","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication2", "date":"Jan 1, 1952","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication3", "date":"Jan 1, 1964","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication4", "date":"Jan 1, 1964","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication5", "date":"Jan 1, 1995","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication6", "date":"Jan 1, 1974","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication7", "date":"Jan 1, 1974","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication8", "date":"Jan 1, 1952","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication9", "date":"Jan 1, 1974","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication10", "date":"Jan 1, 1928","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication11", "date":"Jan 1, 1974","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication12", "date":"Jan 1, 1974","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication13", "date":"Jan 1, 1928","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication14", "date":"Jan 1, 1964","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication15", "date":"Jan 1, 1952","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication16", "date":"Jan 1, 1995","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication17", "date":"Jan 1, 1928","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication18", "date":"Jan 1, 1974","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication19", "date":"Jan 1, 1974","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication20", "date":"Jan 1, 1961","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication21", "date":"Jan 1, 1952","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication22", "date":"Jan 1, 1974","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication23", "date":"Jan 1, 1952","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication24", "date":"Jan 1, 1961","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication25", "date":"Jan 1, 1952","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication26", "date":"Jan 1, 1928","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication27", "date":"Jan 1, 1928","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication28", "date":"Jan 1, 1928","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication29", "date":"Jan 1, 1974","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication30", "date":"Jan 1, 1952","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication31", "date":"Jan 1, 1995","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication32", "date":"Jan 1, 1964","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication33", "date":"Jan 1, 1952","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication34", "date":"Jan 1, 1974","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication35", "date":"Jan 1, 1995","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication36", "date":"Jan 1, 1952","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication37", "date":"Jan 1, 1964","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication38", "date":"Jan 1, 1928","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication39", "date":"Jan 1, 1995","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication40", "date":"Jan 1, 1995","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication41", "date":"Jan 1, 1964","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication42", "date":"Jan 1, 1995","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication43", "date":"Jan 1, 1995","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication44", "date":"Jan 1, 1961","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication45", "date":"Jan 1, 1952","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication46", "date":"Jan 1, 1961","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication47", "date":"Jan 1, 1995","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication48", "date":"Jan 1, 1928","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication49", "date":"Jan 1, 1995","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication50", "date":"Jan 1, 1928","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication51", "date":"Jan 1, 1952","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication52", "date":"Jan 1, 1995","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication53", "date":"Jan 1, 1961","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication54", "date":"Jan 1, 1952","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication55", "date":"Jan 1, 1961","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication56", "date":"Jan 1, 1952","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication57", "date":"Jan 1, 1964","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication58", "date":"Jan 1, 1974","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication59", "date":"Jan 1, 1995","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication60", "date":"Jan 1, 1928","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication61", "date":"Jan 1, 1974","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication62", "date":"Jan 1, 1961","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication63", "date":"Jan 1, 1952","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication64", "date":"Jan 1, 1974","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication65", "date":"Jan 1, 1974","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication66", "date":"Jan 1, 1961","status":"Approaching Deadline"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication67", "date":"Jan 1, 1952","status":"Overdue"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication68", "date":"Jan 1, 1961","status":"In Progress"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication69", "date":"Jan 1, 1961","status":"Complete"}, hiddenData: {"url": "a"} },
		{viewableData: {"name": "Publication70", "date":"Jan 1, 1974","status":"Overdue"}, hiddenData: {"url": "a"} },
	];
});