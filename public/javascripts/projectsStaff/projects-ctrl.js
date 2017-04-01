'use strict'
var app = angular.module('App');

app.controller('ProjectsCtrl', function($scope, $location, $uibModal, $timeout, CELLTYPES){
  $scope.tableClassName = 'projects-table';
  $scope.title = 'Projects';
  //$scope.description = ''
  $scope.buttonText = 'Add Project';
  $scope.rowHeaders = ['Project Name','Description','Assignees','Completed'];

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
