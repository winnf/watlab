'use strict'
var app = angular.module('App');

app.controller('ProjectsCtrl', function($scope, $location, $uibModal, $timeout, CELLTYPES){
  $scope.tableClassName = 'projects-table';
  $scope.title = 'Projects';
  //$scope.description = ''
  $scope.buttonText = 'Add Project';
  $scope.rowHeaders = ['Project Name','Description','Assignees'];

  $scope.cellTypes = {
    name: CELLTYPES.PLAIN,
    description: CELLTYPES.PLAIN,
    assignees: CELLTYPES.PLAIN
  };

    var addProject = function() {
		var modalInstance = $uibModal.open({
			backdrop: 'static',
      templateUrl: '/psr/view/modal-add-project.ejs',
      controller: 'AddProjectModalCtrl',
      appendTo: $('body')
    });

    modalInstance.result.then(function(project){
  		$scope.rows.push(project);
  		$timeout(function(){
  			var addedProject = $('#abstract-table tr').last();
  			$('#abstract-table').DataTable().row.add(addedProject[0]);
  		});
    });
	};

	$scope.clickHandlerMap = {
		button: function() {
			addProject();
		},
		name: function(row) {
			$location.url('/psr/project/' + row.hiddenData.id);
		}
	};

  $scope.rows = [
    {viewableData: {"name": "finish this goddamn project smh", "description": "Bah","assignees":"Igor"}}
  ];

});

app.controller('AddProjectModalCtrl', function($scope, $uibModalInstance){
	$scope.addProject = function() {
		$uibModalInstance.close({
			viewableData: {
				"name": $scope.projectName,
                "description": $scope.description,
				"assignees": $scope.assignees
			}, hiddenData: {"id": 'project-0A'} });
	};
	$scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
