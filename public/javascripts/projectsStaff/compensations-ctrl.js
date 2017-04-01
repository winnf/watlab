'use strict'
var app = angular.module('App');

app.controller('CompensationsCtrl', function($scope, $location, $uibModal, $timeout, CELLTYPES){
  $scope.tableClassName = 'compensations-table';
  $scope.title = 'Compensations';
  //$scope.description = ''
  $scope.buttonText = 'Add Compensation';
  $scope.rowHeaders = ['Assignee', 'Amount'];

  $scope.cellTypes = {
    assignee: CELLTYPES.PLAIN,
    amount: CELLTYPES.PLAIN
  };

    var addCompensation = function() {
		var modalInstance = $uibModal.open({
			backdrop: 'static',
      templateUrl: '/psr/view/modal-add-compensation.ejs',
      controller: 'AddCompensationModalCtrl',
      appendTo: $('body')
    });

    modalInstance.result.then(function(compensation){
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
    {viewableData: {"assignee": "rando","amount": "4118"}}
  ];

});

app.controller('AddCompensationModalCtrl', function($scope, $uibModalInstance){
	$scope.addCompensation = function() {
		$uibModalInstance.close({
			viewableData: {
				"assignee": $scope.assignee,
                "amount": $scope.amount
			}, hiddenData: {"id": 'compensation-0A'} });
	};
	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
