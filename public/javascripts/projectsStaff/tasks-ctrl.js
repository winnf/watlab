'use strict'
var app = angular.module('App');

app.controller('TasksCtrl', function($scope, $location, $uibModal, $timeout, CELLTYPES, $http){
  $scope.tableClassName = 'tasks-table';
  $scope.title = 'Tasks';
  //$scope.description = ''
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
        console.log('the row name is:' + row.viewableData.task);
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
            console.log('the row: ' + row + 'blah'+ i)
			var tr = $(event.target).closest('tr').remove();
        }
	};

    $scope.rows = [
        {viewableData: {"name": "finish this goddamn project smh", "dueDate": "April 1, 2017", "description": "Bah","assignees":"Igor", "garbage": true}}
    ];

  $http({
    method: 'GET',
    url: '/psr/allTask'
  }).then(function successCallback(response){
    var tasks = response.data;
    console.log(tasks[0]._id);
    debugger;
    for(var i = 0; i < Object.keys(tasks).length; i++){
      console.log(tasks[i]._id);
      $scope.rows.push({viewableData: {"task": tasks[i].name, "dueDate":tasks[i].dueDate, "assignees":tasks[i].assignees, "description":tasks[i].description, "garbage": true}, hiddenData: {"id": tasks[i]._id}});
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

app.controller('EditTaskModalCtrl', function($scope, $uibModalInstance, items){

	var genericDateObj = {
		date: new Date(),
		isOpen: false,
		placement: 'bottom-right',
		format: 'MMM dd, yyyy',
		altInputFormats: ['MMM dd, yyyy'],
		options: {},
	};

    // items.viewableData.dueDate = _.clone(genericDateObj);

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
                "description": $scope.taskDescription ,
				"assignees": $scope.taskAssignees
            }, hiddenData: {"id": $scope.taskId } });
	};

	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
