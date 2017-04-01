'use strict'
var app = angular.module('App');

app.controller('NoticesCtrl', function($scope, $location, $uibModal, $timeout, CELLTYPES){
  $scope.tableClassName = 'notices-table';
  $scope.title = 'Notices';
  //$scope.description = ''
  $scope.buttonText = 'Add Notice';
  $scope.rowHeaders = ['Title','Due','Description', 'Assignees'];

  $scope.cellTypes = {
    title: CELLTYPES.PLAIN,
    'due-date': CELLTYPES.DATE,
    description: CELLTYPES.PLAIN,
    assignees: CELLTYPES.PLAIN,
  };

	var addNewNotice = function() {
		var modalInstance = $uibModal.open({
			backdrop: 'static',
      templateUrl: '/psr/view/modal-add-new-notice.ejs',
      controller: 'AddNewNoticeModalCtrl',
      appendTo: $('body')
    });

    modalInstance.result.then(function(notice){
  		$scope.rows.push(notice);
  		$timeout(function(){
  			var addedNotice = $('#abstract-table tr').last();
  			$('#abstract-table').DataTable().row.add(addedNotice[0]);
  		});
    });
	};

	$scope.clickHandlerMap = {
		button: function() {
			addNewNotice();
		},
		name: function(row) {
			$location.url('/psr/notice/' + row.hiddenData.id);
		}
	};


  $scope.rows = [
    {viewableData: {"title": "CRY","due-date":"Apr 1, 2017","description":"just keep crying until you're done", "assignees":"[Bob, William, Ray]"}, hiddenData: {"id": 'notice-1'}}
  ];
});

app.controller('AddNewNoticeModalCtrl', function($scope, $uibModalInstance){
	var genericDateObj = {
		date: new Date(),
		isOpen: false,
		placement: 'bottom-right',
		format: 'MMM dd, yyyy',
		altInputFormats: ['MMM dd, yyyy'],
		options: {},
	};

	$scope.dueDate = _.clone(genericDateObj);
	$scope.addNewNotice = function() {
		$uibModalInstance.close({
			viewableData: {
				"title": $scope.noticeName, 
				"due-date": $scope.dueDate.date,
                "description": $scope.description,
				"assignees": $scope.assignees
			}, hiddenData: {"id": 'notice-0A'} });
	};
	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

