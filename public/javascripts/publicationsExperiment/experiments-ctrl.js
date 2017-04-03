/*jslint node: true */
/*global $, jQuery, alert, angular*/
'use strict';
var app = angular.module('App');


app.controller('ExperimentsCtrl', function ($scope, $location,$window, $uibModal, $timeout, CELLTYPES, $http) {

	$scope.tableClassName = 'experiments-table';
	$scope.title = 'Experiments';
	$scope.buttonText = 'Add Experiment';
	$scope.description = 'Click on the experiment name to edit the data, protocols and references. ';
	$scope.rowHeaders = ['Experiment', 'Start Date', 'Due Date', 'Owner', 'Assignees', 'Status'];

	function updateTable() {
		$http.get('/per/allUsers').then(function successCallback(response){
		console.log(response);
		$scope.items = response.data;
		console.log($scope.items);
	},
	function errorCallback(response){

	});
    	$http.get('/per/allExperiments').then(function successCallback(response){
    		
            //$scope.rows = response.data;
            console.log(response.data);
            var newRows = [],
                newExp = [];
            for (var object in response.data) {

                var assigneeNames;
    		 	//console.log(response.data[object].ownerId.name);
    		 	var name;
    		 	var startDate = response.data[object].startDate;
    		 	var dueDate = response.data[object].dueDate;
    		 	var owner;
    		 	var status = response.data[object].status;
    		 if(response.data[object].name != null){
    		 	name = response.data[object].name;
    		 }
    		 else{
    		 	name = 'N/A';
    		 }
    		 if(response.data[object].assigneeIds != null){
    		 	assigneeNames = response.data[object].assigneeIds.map(x => x.name).join(', ');
    		 }
    		 else{
    		 	assigneeNames = 'N/A';
    		 }
    		 if(response.data[object].ownerId != null){
    		 	owner = response.data[object].ownerId.name;
    		 }
    		 else{
    		 	owner = 'N/A';
    		 }
    		 	
    			 newExp = [{viewableData: {
    				"name": name ,
    				"start-date": response.data[object].startDate,
    				"due-date": response.data[object].dueDate,
    				"owner": owner,
    				"assignees": assigneeNames,
    				"status": response.data[object].status
    			}, hiddenData: {id: response.data[object]._id
    			}}];

    		 	newRows.push(newExp[0]);
    		 }
    		// console.log(newRows);
    		 $scope.rows = newRows;  		
    	} ,
    		function errorCallback(response){

    		});
	}
	$( document ).ready(function() {	
		updateTable();
    });

	$scope.cellTypes = {
		name: CELLTYPES.CLICKABLE,
		'start-date': CELLTYPES.DATE,
		'due-date': CELLTYPES.DATE,
		owner: CELLTYPES.PLAIN,
		assignees: CELLTYPES.PLAIN,
		status: CELLTYPES.STATUS
	};

	var createExperiment = function () {
		var modalInstance = $uibModal.open({
			backdrop: 'static',
			templateUrl: '/per/view/modal-create-experiment.ejs',
			controller: 'CreateExperimentModalCtrl',
			appendTo: $('body'),
			resolve: {
        	items: function () {
        		console.log($scope.items);
          		return $scope.items;
        		}
      		}
		});

		modalInstance.result.then(function (experiment) {
			
			var newExp = {
				name: experiment.viewableData.name,
				startDate: experiment.viewableData['start-date'],
				dueDate: experiment.viewableData['due-date'],
				ownerId: experiment.viewableData.owner,
				assigneeIds: experiment.viewableData.assignees,
				status: experiment.viewableData.status
			}
			//console.log(newExp);
			$http.post('/per/createExperiment', newExp).then(function successCallback(response) {
    			// this callback will be called asynchronously
    			// when the response is available
    			//console.log(response);
    			updateTable();
    			//$scope.rows.push(experiment);
    			//console.log(experiment);
			}, function errorCallback(response) {
    			// called asynchronously if an error occurs
    			// or server returns response with an error status.
    			//console.log(response);
			});


			$timeout(function () {
				var addedExperiment = $('#abstract-table tr').last();
				$('#abstract-table').DataTable().row.add(addedExperiment[0]);
			});
		});
	};

	$scope.clickHandlerMap = {
		button: function () {
			createExperiment();
		},
		name: function (row) {
			$location.url('/per/experiment/' + row.hiddenData.id);
		}
	};

	$scope.statusMap = {
		'In Progress': 'label-primary',
		'Complete': 'label-success',
		'Approaching Deadline': 'label-warning',
		'Overdue': 'label-danger'
	};

	$scope.rows = [];
});

app.controller('CreateExperimentModalCtrl', function ($scope, $window,$uibModalInstance) {
	console.log($scope);
	var genericDateObj = {
		date: new Date(),
		isOpen: false,
		placement: 'bottom-right',
		format: 'MMM dd, yyyy',
		altInputFormats: ['MMM dd, yyyy'],
		options: {}
	};
	//$scope.item = item;
	$scope.startDate = _.clone(genericDateObj);
	$scope.dueDate = _.clone(genericDateObj);

	$scope.assignees = $scope.$resolve.items;
	$scope.createExperiment = function () {
		//var ownerId = new mongoose.Schema.Types.ObjectId;
		//var assignees = new mongoose.Schema.Types.ObjectId;
		//var startDate = Date('2014-12-08');
		$uibModalInstance.close({
			viewableData: {
				"name": $scope.experimentName,
				"start-date": $scope.startDate.date,
				"due-date": $scope.dueDate.date,
				"owner": $window.localStorage.getItem('userId'),
				"assignees": $scope.assignedUsers,
				"status": "In Progress"
			},
			hiddenData: {"id": 'experiment-0A'}
		});
	};
	$scope.closeModal = function () {
		$uibModalInstance.dismiss('cancel');
	};
});
