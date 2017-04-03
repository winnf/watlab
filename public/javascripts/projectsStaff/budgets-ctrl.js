'use strict'
var app = angular.module('App');

app.controller('BudgetsCtrl', function($scope, $location, $uibModal, $timeout, $http, CELLTYPES){
  $scope.tableClassName = 'budgets-table';
  $scope.title = 'Budgets';
  //$scope.description = ''
  $scope.buttonText = 'Add Budget';
  $scope.rowHeaders = ['Name', 'Amount', 'Category', 'Delete'];

  $scope.cellTypes = {
    name: CELLTYPES.PLAIN,
    amount: CELLTYPES.PLAIN,
    category: CELLTYPES.PLAIN,
    garbage: CELLTYPES.DELETE
  };

    var addBudget = function() {
		var modalInstance = $uibModal.open({
			backdrop: 'static',
      templateUrl: '/psr/view/modal-add-budget.ejs',
      controller: 'AddBudgetModalCtrl',
      appendTo: $('body')
    });

    modalInstance.result.then(function(budget){
      $http({
        method: 'GET',
        url: '/psr/addBudget/' + budget.viewableData.assignee + '/' + budget.viewableData.amount + '/' + budget.viewableData.category
      }).then(function successCallback(response){
      }, function errorCallback(response){
        console.log(response);
      });
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
        garbage: function(i, row, event){
            var tr = $(event.target).closest('tr').remove();
        }

	};

  $scope.rows = [
    {viewableData: {"name": "rando","amount": "4118", "category": "idk", "garbage": true}}
  ];
      $http({
        method: 'GET',
        url: '/psr/allBudget'
      }).then(function successCallback(response){
        var budgets = response.data;
        console.log('budgets' + budgets);
        for(var i = 0; i < Object.keys(budgets).length; i++){
          $scope.rows.push({viewableData: {"assignee": budgets[i].assignee, "amount": budgets[i].amount, "category": budgets[i].category, "garbage": true}, hiddenData: {"id": budgets[i]._id}});
        }
      }, function errorCallback(response){
        console.log(response);
      });

});

app.controller('AddBudgetModalCtrl', function($scope, $uibModalInstance){
	$scope.addBudget = function() {
		$uibModalInstance.close({
			viewableData: {
				"assignee": $scope.assignee,
                "amount": $scope.amount,
                "category": $scope.category
			}, hiddenData: {"id": 'budget-0A'} });
	};
	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
