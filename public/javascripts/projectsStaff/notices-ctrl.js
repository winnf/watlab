'use strict'
var app = angular.module('App');

app.controller('NoticesCtrl', function($scope, $location, $uibModal, $timeout, CELLTYPES, $http){
  $scope.tableClassName = 'notices-table';
  $scope.title = 'Notices';
  //$scope.description = ''
  $scope.buttonText = 'Add Notice';
  $scope.rowHeaders = ['Title','Due','Description', 'Assignees'];

  $scope.cellTypes = {
    title: CELLTYPES.CLICKABLE,
    dueDate: CELLTYPES.DATE,
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
      $http({
        method: 'GET',
        url: '/psr/addNotice/' + notice.viewableData.title + '/' + notice.viewableData.dueDate + '/' + notice.viewableData.assignees + '/' + notice.viewableData.description
      }).then(function successCallback(response) {
      }, function errorCallback(response) {
          console.log(response);
      });
  		$scope.rows.push(notice);
  		$timeout(function(){
  			var addedNotice = $('#abstract-table tr').last();
  			$('#abstract-table').DataTable().row.add(addedNotice[0]);
  		});
    });
	};

    var editNotice = function(){
		var modalInstance = $uibModal.open({
			backdrop: 'static',
      templateUrl: '/psr/view/modal-edit-notice.ejs',
      controller: 'EditNoticeModalCtrl',
      appendTo: $('body')
    });

    //need it to update the row itself and not add an additional row
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
		},
        row: function(){
            editNotice();
        }
	};


  $scope.rows = [
    {viewableData: {"title": "CRY","dueDate":"Apr 1, 2017","description":"just keep crying until you're done", "assignees":"[Bob, William, Ray]"}, hiddenData: {"id": 'notice-1'}}
  ];

  $http({
    method: 'GET',
    url: '/psr/allNotice'
  }).then(function successCallback(response){
    var notices = response.data;
  //  $scope.rows = [{viewableData: {"task": tasks[0].name, "dueDate":tasks[0].dueDate, "assignees":tasks[0].assignees, "description":tasks[0].description}};
    for(var i = 0; i < Object.keys(notices).length; i++){
      $scope.rows.push({viewableData: {"title": notices[i].name, "dueDate":notices[i].postDate, "assignees":notices[i].assignees, "description":notices[i].description}});
    }
  }, function errorCallback(response){
    console.log(response);
  });
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
				"dueDate": $scope.dueDate.date,
                "description": $scope.description,
				"assignees": $scope.assignees
			}, hiddenData: {"id": 'notice-0A'} });
	};
	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

app.controller('EditNoticeModalCtrl', function($scope, $uibModalInstance){
	var genericDateObj = {
		date: new Date(),
		isOpen: false,
		placement: 'bottom-right',
		format: 'MMM dd, yyyy',
		altInputFormats: ['MMM dd, yyyy'],
		options: {},
	};

	$scope.dueDate = _.clone(genericDateObj);
	$scope.editNotice = function() {
		$uibModalInstance.close({
			viewableData: {
				"title": $scope.noticeName,
				"dueDate": $scope.dueDate.date,
                "description": $scope.description,
				"assignees": $scope.assignees
			}, hiddenData: {"id": 'notice-0A'} });
	};
	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
