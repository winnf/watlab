'use strict'
var app = angular.module('App');

app.controller('CompensationsCtrl', function($scope, $location, $uibModal, $timeout, CELLTYPES, $http){
  $scope.tableClassName = 'compensations-table';
  $scope.title = 'Compensations';
  //$scope.description = ''
  $scope.buttonText = 'Add Compensation';
  $scope.rowHeaders = ['Assignee', 'Amount', 'Date Assigned'];

  $scope.cellTypes = {
    assignee: CELLTYPES.PLAIN,
    amount: CELLTYPES.PLAIN,
    dateAssigned: CELLTYPES.DATE
  };

    var addCompensation = function() {
		var modalInstance = $uibModal.open({
			backdrop: 'static',
      templateUrl: '/psr/view/modal-add-compensation.ejs',
      controller: 'AddCompensationModalCtrl',
      appendTo: $('body')
    });

    modalInstance.result.then(function(compensation){
      $http({
        method: 'GET',
        url: '/psr/addCompensation/' + compensation.viewableData.assignee + '/' + compensation.viewableData.amount + '/' + compensation.viewableData.dateAssigned
      }).then(function successCallback(response){
      }, function errorCallback(response){
        console.log(response);
      });
      $scope.rows.push(compensation);
  		$timeout(function(){
  			var addedCompensation = $('#abstract-table tr').last();
  			$('#abstract-table').DataTable().row.add(addedCompensation[0]);
  		});
    });
	};

	$scope.clickHandlerMap = {
		button: function() {
			addCompensation();
		},
		name: function(row) {
			$location.url('/psr/compensation/' + row.hiddenData.id);
		}
	};

  $scope.rows = [
    {viewableData: {"assignee": "rando","amount": "4118", "dateAssigned": "Apr 01, 2017"}}
  ];

  $http({
    method: 'GET',
    url: '/psr/allCompensation'
  }).then(function successCallback(response){
    var compensations = response.data;
    for(var i = 0; i < Object.keys(compensations).length; i++){
      $scope.rows.push({viewableData: {"assignee": compensations[i].assignee, "amount": compensations[i].amount, "dateAssigned": compensations[i].date}});
    }
  }, function errorCallback(response){
    console.log(response);
  });


});

app.controller('AddCompensationModalCtrl', function($scope, $uibModalInstance){
  var genericDateObj = {
		date: new Date(),
		isOpen: false,
		placement: 'bottom-right',
		format: 'MMM dd, yyyy',
		altInputFormats: ['MMM dd, yyyy'],
		options: {},
	};
  $scope.dateAssigned = _.clone(genericDateObj);
  $scope.addCompensation = function() {
		$uibModalInstance.close({
			viewableData: {
				"assignee": $scope.assignee,
        "amount": $scope.amount,
        "dateAssigned": $scope.dateAssigned.date
			}, hiddenData: {"id": 'compensation-0A'} });
	};
	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
