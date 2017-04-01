'use strict'
var app = angular.module('App');

app.controller('NoticesCtrl', function($scope, $location, $uibModal, $timeout, CELLTYPES){
  $scope.tableClassName = 'notices-table';
  $scope.title = 'Notices';
  //$scope.description = ''
  $scope.buttonText = 'Add Notice';
  $scope.rowHeaders = ['Title','Due','Complete'];

  $scope.cellTypes = {
    title: CELLTYPES.PLAIN,
    'due-date': CELLTYPES.DATE,
    complete: CELLTYPES.PLAIN
  };


  $scope.rows = [
    {viewableData: {"title": "CRY","due-date":"Apr 1, 2017","complete":"ha"}}
  ];

});
