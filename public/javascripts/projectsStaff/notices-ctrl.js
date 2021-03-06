'use strict'
var app = angular.module('App');

app.controller('NoticesCtrl', function($scope, $location, $uibModal, $timeout, CELLTYPES, $http){
  $scope.tableClassName = 'notices-table';
  $scope.title = 'Notices';
  //$scope.description = ''
  $scope.buttonText = 'Add Notice';
  $scope.rowHeaders = ['Title','Due','Description', 'Assignees', 'Delete'];

  $scope.cellTypes = {
    title: CELLTYPES.CLICKABLE,
    dueDate: CELLTYPES.DATE,
    description: CELLTYPES.PLAIN,
    assignees: CELLTYPES.PLAIN,
    garbage: CELLTYPES.DELETE
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

    var editNotice = function(row){
		var modalInstance = $uibModal.open({
            backdrop: 'static',
            templateUrl: '/psr/view/modal-edit-notice.ejs',
            controller: 'EditNoticeModalCtrl',
            appendTo: $('body'),
            resolve: {
                items: function(){
                    return row;
                }
            }
    });

    modalInstance.result.then(function(notice){
        if (row.viewableData.title != notice.viewableData.title){
            row.viewableData.title = notice.viewableData.title;
        }
        if (row.viewableData.assignees != notice.viewableData.assignees){
            row.viewableData.assignees = notice.viewableData.assignees;
        }
        if (row.viewableData.description != notice.viewableData.description){
            row.viewableData.description = notice.viewableData.description;
        }
        if (row.viewableData.dueDate != notice.viewableData.dueDate){
            row.viewableData.dueDate = notice.viewableData.dueDate;
        }
        $http({
            method: 'GET',
            url: '/psr/updateNotice/' + notice.viewableData.title + '/' + notice.viewableData.dueDate + '/' + notice.viewableData.assignees + '/' + notice.viewableData.description + '/' + notice.hiddenData.id
        }).then(function successCallback(response) {
        }, function errorCallback(response) {
            console.log(response);
        });
    });
	};

	$scope.clickHandlerMap = {
		button: function() {
			addNewNotice();
		},
        title: function(row){
            editNotice(row);
        },
        garbage: function(row, i, event){
          $http({
            method: 'GET',
            url: '/psr/deleteNotice/' + row.hiddenData.id
          }).then(function successCallback(response){
          }, function errorCallback(response){
            console.log(response);
          });
          var tr = $(event.target).closest('tr').remove();
        }
	};

  $http({
    method: 'GET',
    url: '/psr/allNotice'
  }).then(function successCallback(response){
    // for(var i = 0; i < Object.keys(notices).length; i++){
    //   $scope.rows.push({viewableData: {"title": notices[i].name, "dueDate":notices[i].postDate, "assignees":notices[i].assignees, "description":notices[i].description, "garbage": true}, hiddenData: {"id": notices[i]._id}});
    // }
    $scope.rows = response.data.map(x => {
      return { viewableData: {
        "title": x.name,
        "dueDate": x.postDate,
        "assignees": x.assignees,
        "description": x.description,
        "garbage": true
      }, hiddenData: {id: x._id}};
    });
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
				"assignees": $scope.assignees,
                "garbage": true
			}, hiddenData: {"id": "notice-0a"} });
	};
	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

app.controller('EditNoticeModalCtrl', function($scope, $uibModalInstance, items){
	var genericDateObj = {
		date: new Date(),
		isOpen: false,
		placement: 'bottom-right',
		format: 'MMM dd, yyyy',
		altInputFormats: ['MMM dd, yyyy'],
		options: {},
	};

    $scope.noticeName = items.viewableData.title;
    $scope.dueDate = items.viewableData.dueDate;
	$scope.dueDate = _.clone(genericDateObj);
    $scope.noticeDescription = items.viewableData.description;
    $scope.noticeAssignees = items.viewableData.assignees;
    $scope.noticeId = items.hiddenData.id;

	$scope.editNotice = function() {
		$uibModalInstance.close({
			viewableData: {
				"title": $scope.noticeName,
				"dueDate": $scope.dueDate.date,
                "description": $scope.noticeDescription,
				"assignees": $scope.noticeAssignees
			}, hiddenData: {"id": $scope.noticeId } });
	};
	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
