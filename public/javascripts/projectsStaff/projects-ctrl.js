'use strict'
var app = angular.module('App');

app.controller('ProjectsCtrl', function($scope, $location, $uibModal, $timeout, CELLTYPES, $http){
  $scope.tableClassName = 'projects-table';
  $scope.title = 'Projects';
  //$scope.description = ''
  $scope.buttonText = 'Add Project';
  $scope.rowHeaders = ['Project Name','Description','Assignees','Delete'];

  $scope.cellTypes = {
    name: CELLTYPES.CLICKABLE,
    description: CELLTYPES.PLAIN,
    assignees: CELLTYPES.PLAIN,
    garbage: CELLTYPES.DELETE
  };

    var addProject = function() {
		var modalInstance = $uibModal.open({
            backdrop: 'static',
            templateUrl: '/psr/view/modal-add-project.ejs',
            controller: 'AddProjectModalCtrl',
            appendTo: $('body')
    });

    modalInstance.result.then(function(project){
      $http({
        method: 'GET',
        url: '/psr/addProject/' + project.viewableData.name + '/' + project.viewableData.assignees + '/' + project.viewableData.description
      }).then(function successCallback(response){
      }, function errorCallback(response){
        console.log(response);
      });
  		$scope.rows.push(project);
  		$timeout(function(){
  			var addedProject = $('#abstract-table tr').last();
  			$('#abstract-table').DataTable().row.add(addedProject[0]);
  		});
    });
	};
    var editProject = function(row) {
        console.log('the row name is:' + row.viewableData.project);
		var modalInstance = $uibModal.open({
            backdrop: 'static',
            templateUrl: '/psr/view/modal-edit-project.ejs',
            controller: 'EditProjectModalCtrl',
            appendTo: $('body'),
            resolve: {
                items: function(){
                    return row;
                }
            }
    });

    modalInstance.result.then(function(project){
        console.log(project.viewableData);
        if (row.viewableData.name != project.viewableData.name){
            row.viewableData.name = project.viewableData.name;
        }
        if (row.viewableData.assignees != project.viewableData.assignees){
            row.viewableData.assignees = project.viewableData.assignees;
        }
        if (row.viewableData.description != project.viewableData.description){
            row.viewableData.description = project.viewableData.description;
        }
      $http({
        method: 'GET',
        url: '/psr/updateProject/' + project.viewableData.name + '/' + project.viewableData.assignees + '/' + project.viewableData.description + '/' + project.hiddenData.id
      }).then(function successCallback(response){
      }, function errorCallback(response){
        console.log(response);
      });
    });
	};

	$scope.clickHandlerMap = {
		button: function() {
			addProject();
		},
        name: function(row){
            editProject(row);
        },
        garbage: function(row, i, event){
          console.log(row);
          $http({
            method: 'GET',
            url: '/psr/deleteProject/' + row.hiddenData.id
          }).then(function successCallback(response){
          }, function errorCallback(response){
            console.log(response);
          });
          var tr = $(event.target).closest('tr').remove();
        }
	};


  $http({
    method: 'GET',
    url: '/psr/allProject'
  }).then(function successCallback(response){
    // var projects = response.data;
    // for(var i = 0; i < Object.keys(projects).length; i++){
    //   $scope.rows.push({viewableData: {"name": projects[i].name, "description": projects[i].description, "assignees": projects[i].assignees, "garbage": true}, hiddenData: {"id": projects[i]._id}});
    // }
    $scope.rows = response.data.map(x => {
      return{viewableData:{
        "name": x.name,
        "description": x.description,
        "assignees": x.assignees,
        "garbage": true
      }, hiddenData:{id: x._id}};
    });
  }, function errorCallback(response){
    console.log(response);
  });

});

app.controller('AddProjectModalCtrl', function($scope, $uibModalInstance){
	$scope.addProject = function() {
		$uibModalInstance.close({
			viewableData: {
				"name": $scope.projectName,
        "description": $scope.description,
				"assignees": $scope.assignees,
        "garbage": true
			}, hiddenData: {"id": $scope._id} });
	};
	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
app.controller('EditProjectModalCtrl', function($scope, $uibModalInstance, items){
    $scope.projectName = items.viewableData.name;
    $scope.projectDescription = items.viewableData.description;
    $scope.projectAssignees = items.viewableData.assignees;
    $scope.projectId = items.hiddenData.id;

	$scope.editProject = function() {
		$uibModalInstance.close({
			viewableData: {
				"name": $scope.projectName,
                "description": $scope.projectDescription,
				"assignees": $scope.projectAssignees
			}, hiddenData: {"id": $scope.projectId} });
	};
	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
