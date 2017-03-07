'use strict';
var app = angular.module('App');

app.controller('ExperimentsCtrl', function($scope, $location, $uibModal, $timeout, CELLTYPES) {
	$scope.tableClassName = 'experiments-table';
	$scope.title = 'Experiments';
	$scope.buttonText = 'Add Experiment';
	$scope.description = 'Click on the experiment name to edit the data, protocols and references. ';
	$scope.rowHeaders = ['Experiment', 'Start Date', 'Due Date', 'Owner', 'Assignees', 'Status'];

	$scope.cellTypes = {
		name: CELLTYPES.CLICKABLE, 
		'start-date': CELLTYPES.DATE, 
		'due-date': CELLTYPES.DATE, 
		owner: CELLTYPES.PLAIN,
		assignees: CELLTYPES.PLAIN,
		status: CELLTYPES.STATUS,
	};

	var createExperiment = function() {
		var modalInstance = $uibModal.open({
			backdrop: 'static',
      templateUrl: '/per/view/modal-create-experiment.ejs',
      controller: 'CreateExperimentModalCtrl',
      appendTo: $('body')
    });

    modalInstance.result.then(function(experiment){
  		$scope.rows.push(experiment);
  		$timeout(function(){
  			var addedExperiment = $('#abstract-table tr').last();
  			$('#abstract-table').DataTable().row.add(addedExperiment[0]);
  		});
    });
	};

	$scope.clickHandlerMap = {
		button: function() {
			createExperiment();
		},
		name: function(row) {
			$location.url('/per/experiment/' + row.hiddenData.id);
		}
	};
	
	$scope.statusMap = {
		'In Progress': 'label-primary', 
		'Complete': 'label-success', 
		'Approaching Deadline': 'label-warning', 
		'Overdue': 'label-danger'
	};

	$scope.rows = [
		{viewableData: {"name": "Correlated diffusion imaging (CDI) for cancer imaging", "start-date":"Jan 1, 1928","due-date":"Feb 1, 1928","owner":"John Smith","assignees":"[Bob, William, Ray]","status":"In Progress"}, hiddenData: {"id": 'experiment-0A'} },
		{viewableData: {"name": "Evolutionary deep intelligence for operational deep intelligence", "start-date":"Jan 1, 1952","due-date":"Nov 1, 1952","owner":"John Bob","assignees":"[John, Smith, Ray]","status":"Complete"}, hiddenData: {"id": 'experiment-0B'} },
		{viewableData: {"name": "Musculoskeletal kinematic analysis using video fluoroscopy", "start-date":"Jan 1, 1964","due-date":"Apr 1, 1964","owner":"John Smith","assignees":"[Bob, William, Ray]","status":"Approaching Deadline"}, hiddenData: {"id": 'experiment-3'} },
		{viewableData: {"name": "Ocular morphological analysis", "start-date":"Jan 1, 1964","due-date":"Jun 1, 1964","owner":"John Bob","assignees":"[Smith, Bob, Ray]","status":"Overdue"}, hiddenData: {"id": 'experiment-4'} },
		{viewableData: {"name": "Sea ice analysis using synthetic aperture radar ", "start-date":"Jul 1, 1995","due-date":"Feb 1, 1995","owner":"John Smith","assignees":"[Bob, William, Ray]","status":"In Progress"}, hiddenData: {"id": 'experiment-5'} },
		{viewableData: {"name": "Image and video noise reduction and artifact reduction", "start-date":"Feb 1, 1974","due-date":"Jan 1, 1974","owner":"William Bob","assignees":"[William, Ray, Smith]","status":"Complete"}, hiddenData: {"id": 'experiment-6'} },
		{viewableData: {"name": "Spectral demultiplexed imaging (SDI) for single-shot", "start-date":"Jun 1, 1974","due-date":"Dec 1, 1974","owner":"John Smith","assignees":"[Bob, William, Ray]","status":"Approaching Deadline"}, hiddenData: {"id": 'experiment-7'} },
	];
});

app.controller('CreateExperimentModalCtrl', function($scope, $uibModalInstance){
	var genericDateObj = {
		date: new Date(),
		isOpen: false,
		placement: 'bottom-right',
		format: 'MMM dd, yyyy',
		altInputFormats: ['MMM dd, yyyy'],
		options: {},
	};

	$scope.startDate = _.clone(genericDateObj);
	$scope.dueDate = _.clone(genericDateObj);
	$scope.createExperiment = function() {
		$uibModalInstance.close({
			viewableData: {
				"name": $scope.experimentName, 
				"start-date": $scope.startDate.date,
				"due-date": $scope.dueDate.date,
				"owner":"John Smith",
				"assignees": $scope.assignees,
				"status":"In Progress"
			}, hiddenData: {"id": 'experiment-0A'} });
	};
	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});