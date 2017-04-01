'use strict'
var app = angular.module('App');

app.controller('TasksCtrl', function($scope, $location, $uibModal, $timeout, CELLTYPES){
  $scope.tableClassName = 'tasks-table';
  $scope.title = 'Tasks';
  //$scope.description = ''
  $scope.buttonText = 'Add Task';
  $scope.rowHeaders = ['Task','Due','Assignees','Description'];

  $scope.cellTypes = {
    task: CELLTYPES.PLAIN,
    'due-date': CELLTYPES.DATE,
    assignees: CELLTYPES.PLAIN,
    description: CELLTYPES.PLAIN
  };
	
    var addTask = function() {
		var modalInstance = $uibModal.open({
			backdrop: 'static',
      templateUrl: '/psr/view/modal-add-task.ejs',
      controller: 'AddTaskModalCtrl',
      appendTo: $('body')
    });

    modalInstance.result.then(function(task){
  		$scope.rows.push(task);
  		$timeout(function(){
  			var addedTask = $('#abstract-table tr').last();
  			$('#abstract-table').DataTable().row.add(addedTask[0]);
  		});
    });
	};

	$scope.clickHandlerMap = {
		button: function() {
			addTask();
		},
		name: function(row) {
			$location.url('/psr/task/' + row.hiddenData.id);
		}
	};


  $scope.rows = [
    {viewableData: {"task": "finish this goddamn project smh","due-date":"Apr 1, 2017","assignees":"Igor", "description": "blah"}}
  ];

});

app.controller('AddTaskModalCtrl', function($scope, $uibModalInstance){
	var genericDateObj = {
		date: new Date(),
		isOpen: false,
		placement: 'bottom-right',
		format: 'MMM dd, yyyy',
		altInputFormats: ['MMM dd, yyyy'],
		options: {},
	};

	$scope.dueDate = _.clone(genericDateObj);
	$scope.addTask = function() {
		$uibModalInstance.close({
			viewableData: {
				"task": $scope.taskName,
				"due-date": $scope.dueDate.date,
                "description": $scope.description,
				"assignees": $scope.assignees
			}, hiddenData: {"id": 'task-0A'} });
	};
	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
