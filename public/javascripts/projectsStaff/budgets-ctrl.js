'use strict'
var app = angular.module('App');

app.controller('BudgetsCtrl', function($scope, $location, $uibModal, $timeout, CELLTYPES){
  $scope.tableClassName = 'budgets-table';
  $scope.title = 'Budgets';
  //$scope.description = ''
  $scope.buttonText = 'Add Budget';
  $scope.rowHeaders = ['Name', 'Amount', 'Category'];

  $scope.cellTypes = {
    name: CELLTYPES.PLAIN,
    amount: CELLTYPES.PLAIN,
    category: CELLTYPES.PLAIN
  };

    var addBudget = function() {
		var modalInstance = $uibModal.open({
			backdrop: 'static',
      templateUrl: '/psr/view/modal-add-budget.ejs',
      controller: 'AddBudgetModalCtrl',
      appendTo: $('body')
    });

    modalInstance.result.then(function(budget){
  		$scope.rows.push(budget);
  		$timeout(function(){
  			var addedBudget = $('#abstract-table tr').last();
  			$('#abstract-table').DataTable().row.add(addedBudget[0]);
  		});
    });
	};

	$scope.clickHandlerMap = {
		button: function() {
			addBudget();
		},
		name: function(row) {
			$location.url('/psr/budget/' + row.hiddenData.id);
		}
	};

  $scope.rows = [
    {viewableData: {"name": "rando","amount": "4118", "category": "idk"}}
  ];

});

app.controller('AddBudgetModalCtrl', function($scope, $uibModalInstance){
	$scope.addBudget = function() {
		$uibModalInstance.close({
			viewableData: {
				"name": $scope.name,
                "amount": $scope.amount,
                "category": $scope.category
			}, hiddenData: {"id": 'budget-0A'} });
	};
	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
