'use strict'
var app = angular.module('App');

app.controller('CompensationsCtrl', function($scope, $location, $uibModal, $timeout, CELLTYPES, $http){
  $scope.tableClassName = 'compensations-table';
  $scope.title = 'Compensations';
  //$scope.description = ''
  $scope.buttonText = 'Add Compensation';
  $scope.rowHeaders = ['Assignee', 'Amount', 'Date Assigned', 'Delete'];

  $scope.cellTypes = {
    assignee: CELLTYPES.CLICKABLE,
    amount: CELLTYPES.PLAIN,
    dateAssigned: CELLTYPES.DATE,
    garbage: CELLTYPES.DELETE
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

    var editCompensation = function(row) {
		var modalInstance = $uibModal.open({
            backdrop: 'static',
            templateUrl: '/psr/view/modal-edit-compensation.ejs',
            controller: 'EditCompensationModalCtrl',
            appendTo: $('body'),
            resolve: {
                items: function(){
                    return row;
                }
            }
    });

    modalInstance.result.then(function(compensation){
        if (row.viewableData.assignee != compensation.viewableData.assignee){
            row.viewableData.assignee = compensation.viewableData.assignee;
        }
        if (row.viewableData.amount != compensation.viewableData.amount){
            row.viewableData.amount = compensation.viewableData.amount;
        }
        if (row.viewableData.dateAssigned != compensation.viewableData.dateAssigned){
            row.viewableData.dateAssigned = compensation.viewableData.dateAssigned;
        }
      $http({
        method: 'GET',
        url: '/psr/updateCompensation/' + compensation.viewableData.assignee + '/' + compensation.viewableData.amount + '/' + compensation.viewableData.dateAssigned + '/' + compensation.hiddenData.id
      }).then(function successCallback(response){
      }, function errorCallback(response){
        console.log(response);
      });
    });
	};

	$scope.clickHandlerMap = {
		button: function() {
			addCompensation();
		},
        assignee: function(row){
            editCompensation(row);
        },
        garbage: function(row, i, event){
          console.log(row);
            $http({
              method: 'GET',
              url: '/psr/deleteCompensation/' + row.hiddenData.id
            }).then(function successCallback(response){
            }, function errorCallback(response){
              console.log(response);
            });
            var tr = $(event.target).closest('tr').remove();
        }
	};

  $scope.rows = [
    {viewableData: {"assignee": "Julie Mongo","amount": "$3000", "dateAssigned": "Apr 01, 2017", "garbage": true}, hiddenData: { "id": 'blah'}}
  ];

  $http({
    method: 'GET',
    url: '/psr/allCompensation'
  }).then(function successCallback(response){
    var compensations = response.data;
    for(var i = 0; i < Object.keys(compensations).length; i++){
      $scope.rows.push({viewableData: {"assignee": compensations[i].assignee, "amount": compensations[i].amount, "dateAssigned": compensations[i].date, "garbage": true}, hiddenData: {"id": compensations[i]._id}});
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
                "dateAssigned": $scope.dateAssigned.date,
                "garbage": true
			}, hiddenData: {"id": 'compensation-0A'} });
	};
	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
app.controller('EditCompensationModalCtrl', function($scope, $uibModalInstance, items){
	var genericDateObj = {
		date: new Date(),
		isOpen: false,
		placement: 'bottom-right',
		format: 'MMM dd, yyyy',
		altInputFormats: ['MMM dd, yyyy'],
		options: {},
	};
    $scope.compensationAmount = items.viewableData.amount;
    $scope.compensationAssignee = items.viewableData.assignee;
    $scope.dateAssigned = items.viewableData.dateAssigned;
    $scope.dateAssigned = _.clone(genericDateObj);

    $scope.compensationId = items.viewableData.hiddenData.id;

	$scope.editCompensation = function() {
		$uibModalInstance.close({
			viewableData: {
				"assignee": $scope.compensationAssignee,
                "amount": $scope.compensationAmount,
                "dateAssigned": $scope.dateAssigned.date
			}, hiddenData: {"id": $scope.compensationId} });
	};
	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
