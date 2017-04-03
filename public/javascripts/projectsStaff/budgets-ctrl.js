'use strict'
var app = angular.module('App');

app.controller('BudgetsCtrl', function($scope, $location, $uibModal, $timeout, $http, CELLTYPES){
  $scope.tableClassName = 'budgets-table';
  $scope.title = 'Budgets';
  //$scope.description = ''
  $scope.buttonText = 'Add Budget';
  $scope.rowHeaders = ['Name', 'Amount ($)', 'Category', 'Delete'];

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
        url: '/psr/addBudget/' + budget.viewableData.name + '/' + budget.viewableData.amount + '/' + budget.viewableData.category
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
        garbage: function(row, i, event){
          $http({
            method: 'GET',
            url: '/psr/deleteBudget/' + row.hiddenData.id
          }).then(function successCallback(response){
          }, function errorCallback(response){
            console.log(response);
          });
            var tr = $(event.target).closest('tr').remove();
        }

	};

      $http({
        method: 'GET',
        url: '/psr/allBudget'
      }).then(function successCallback(response){
        // var budgets = response.data;
        // for(var i = 0; i < Object.keys(budgets).length; i++){
        //   console.log(budgets[i]);
        //   $scope.rows.push({viewableData: {"name": budgets[i].name, "amount": budgets[i].amount, "category": budgets[i].category, "garbage": true}, hiddenData: {"id": budgets[i]._id}});
        // }
        $scope.rows = response.data.map(x => {
            return {viewableData:{
              "name": x.name,
              "amount": x.amount,
              "category": x.category,
              "garbage": true
            }, hiddenData: {id: x._id}};
        });
      }, function errorCallback(response){
        console.log(response);
      });

});

app.controller('AddBudgetModalCtrl', function($scope, $uibModalInstance){
	$scope.addBudget = function() {
		$uibModalInstance.close({
			viewableData: {
				"name": $scope.name,
                "amount": $scope.amount,
                "category": $scope.category,
                "garbage": true
			}, hiddenData: {"id": "budget-01"} });
	};
	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
