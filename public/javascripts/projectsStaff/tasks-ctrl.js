'use strict'
var app = angular.module('App');

app.controller('TasksCtrl', function($scope, $location, $uibModal, $timeout, CELLTYPES, $http){
  $scope.tableClassName = 'tasks-table';
  $scope.title = 'Tasks';
  $scope.buttonText = 'Add Task';
  $scope.rowHeaders = ['Task','Due','Assignees','Description', 'Delete'];

  $scope.cellTypes = {
    task: CELLTYPES.CLICKABLE,
    dueDate: CELLTYPES.DATE,
    assignees: CELLTYPES.PLAIN,
    description: CELLTYPES.PLAIN,
    garbage: CELLTYPES.DELETE
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

    var editTask = function(row){
		var modalInstance = $uibModal.open({
            backdrop: 'static',
            templateUrl: '/psr/view/modal-edit-task.ejs',
            controller: 'EditTaskModalCtrl',
            appendTo: $('body'),
            resolve: {
                items: function(){
                    return row;
                }
            }
        });

        modalInstance.result.then(function(task){

        row.viewableData.task = task.viewableData.task;
        row.viewableData.assignees = task.viewableData.assignees;
        row.viewableData.description = task.viewableData.description;
        row.viewableData.dueDate = task.viewableData.dueDate;

          $http({
            method: 'GET',
            url: '/psr/updateTask/' + task.viewableData.task + '/' + task.viewableData.dueDate + '/' + task.viewableData.assignees + '/' + task.viewableData.description + '/' + task.hiddenData.id
          }).then(function successCallback(response) {
          }, function errorCallback(response) {
              console.log(response);
          });
	    });
    };

	$scope.clickHandlerMap = {
		button: function() {
			addTask();
		},
        task: function(row){
            editTask(row);
        },
        garbage: function(row, i, event){
          $http({
            method: 'GET',
            url: '/psr/deleteTask/' + row.hiddenData.id
          }).then(function successCallback(response){
          }, function errorCallback(response){
            console.log(response);
          });
          var tr = $(event.target).closest('tr').remove();
        }
	};
  //var t0 = performance.now(); //performance start
  $http({
    method: 'GET',
    url: '/psr/allTask'
  }).then(function successCallback(response){
    $scope.rows = response.data.map(x => {
      return { viewableData: {
        "task": x.name,
        "dueDate": x.dueDate,
        "assignees": x.assignees,
        "description": x.description,
        "garbage": true
      }, hiddenData: {id: x._id}};
    });
  }, function errorCallback(response){
    console.log(response);
  });
  //var t1 = performance.now(); //performance end
  //window.alert("performance time: " + (t1-t0) + " ms");
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
				"assignees": $scope.assignees,
                "garbage": true
			}, hiddenData: {"id": 'task-0A'} });
	};
	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

app.controller('EditTaskModalCtrl', function($scope, $uibModalInstance, items){

	var genericDateObj = {
		date: new Date(),
		isOpen: false,
		placement: 'bottom-right',
		format: 'MMM dd, yyyy',
		altInputFormats: ['MMM dd, yyyy'],
		options: {},
	};


    $scope.taskName = items.viewableData.task;
    $scope.dueDate = items.viewableData.dueDate;
    $scope.dueDate = _.clone(genericDateObj);
    $scope.taskDescription = items.viewableData.description;
    $scope.taskAssignees = items.viewableData.assignees;
    $scope.taskId = items.hiddenData.id;
    $scope.editTask = function() {
		$uibModalInstance.close({
			viewableData: {
				"task": $scope.taskName,
				"dueDate": $scope.dueDate.date,
                "description": $scope.taskDescription,
				"assignees": $scope.taskAssignees
            }, hiddenData: {"id": $scope.taskId } });
	};

	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
