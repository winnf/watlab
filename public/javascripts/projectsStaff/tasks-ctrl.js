'use strict'
var app = angular.module('App');

app.controller('TasksCtrl', function($scope, $location, $uibModal, $timeout, CELLTYPES){
  $scope.tableClassName = 'tasks-table';
  $scope.title = 'Tasks';
  //$scope.description = ''
  $scope.buttonText = 'Add Task';
  $scope.rowHeaders = ['Task','Due','Assignees','Completed'];

  $scope.cellTypes = {
    task: CELLTYPES.PLAIN,
    'due-date': CELLTYPES.DATE,
    assigness: CELLTYPES.PLAIN,
    complete: CELLTYPES.PLAIN
  };


  $scope.rows = [
    {viewableData: {"task": "finish this goddamn project smh","due-date":"Apr 1, 2017","assigness":"Igor","complete":"hell no"}}
  ];

});
