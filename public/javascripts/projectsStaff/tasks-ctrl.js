'use strict'
var app = angular.module('App');

app.controller('TasksCtrl', function($scope, $location, $uibModal, $timeout, CELLTYPES, $http){
  $scope.tableClassName = 'tasks-table';
  $scope.title = 'Tasks';
  //$scope.description = ''
  $scope.buttonText = 'Add Task';
  $scope.rowHeaders = ['Task','Due','Assignees','Description'];

  $scope.cellTypes = {
    task: CELLTYPES.CLICKABLE,
    dueDate: CELLTYPES.DATE,
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
      $http({
        method: 'GET',
        url: '/psr/addTask/' + task.viewableData.task + '/' + task.viewableData.dueDate + '/' + task.viewableData.assignees + '/' + task.viewableData.description
      }).then(function successCallback(response) {
      }, function errorCallback(response) {
          console.log(response);
      });
      $scope.rows.push(task);
  		$timeout(function(){
  			var addedTask = $('#abstract-table tr').last();
  			$('#abstract-table').DataTable().row.add(addedTask[0]);
  		});
    });
	};

    var editTask = function(){
		var modalInstance = $uibModal.open({
			backdrop: 'static',
      templateUrl: '/psr/view/modal-edit-task.ejs',
      controller: 'EditTaskModalCtrl',
      appendTo: $('body')
    });

    //need it to update the row itself and not add an additional row
    modalInstance.result.then(function(task){
  		$scope.rows.push(task);
  		$timeout(function(){
  			var editedTask = $('#abstract-table tr').last();
  			$('#abstract-table').DataTable().row.add(editedTask[0]);
  		});
    });
	};

	$scope.clickHandlerMap = {
		button: function() {
			addTask();
		},
		name: function(row) {
			$location.url('/psr/task/' + row.hiddenData.id);
		},
        row: function(){
            editTask();
        }
	};

  $http({
    method: 'GET',
    url: '/psr/allTask'
  }).then(function successCallback(response){
    var tasks = response.data;
  //  $scope.rows = [{viewableData: {"task": tasks[0].name, "dueDate":tasks[0].dueDate, "assignees":tasks[0].assignees, "description":tasks[0].description}};
    for(var i = 0; i < Object.keys(tasks).length; i++){
      $scope.rows.push({viewableData: {"task": tasks[i].name, "dueDate":tasks[i].dueDate, "assignees":tasks[i].assignees, "description":tasks[i].description}});
    }
  }, function errorCallback(response){
    console.log(response);
  });
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
				"dueDate": $scope.dueDate.date,
                "description": $scope.description,
				"assignees": $scope.assignees
			}, hiddenData: {"id": 'task-0A'} });
	};
	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

app.controller('EditTaskModalCtrl', function($scope, $uibModalInstance){
	var genericDateObj = {
		date: new Date(),
		isOpen: false,
		placement: 'bottom-right',
		format: 'MMM dd, yyyy',
		altInputFormats: ['MMM dd, yyyy'],
		options: {},
	};

	$scope.dueDate = _.clone(genericDateObj);
	$scope.editTask = function() {
		$uibModalInstance.close({
			viewableData: {
				"task": $scope.taskName,
				"dueDate": $scope.dueDate.date,
                "description": $scope.description,
				"assignees": $scope.assignees
			}, hiddenData: {"id": 'task-0A'} });
	};
	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
