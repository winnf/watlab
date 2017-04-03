/*jslint node: true */
/*global $, jQuery, alert, angular*/
'use strict';
var app = angular.module('App');

app.controller('PublicationsCtrl', function ($scope, $location, $uibModal, $timeout, CELLTYPES, $http) {
	$scope.tableClassName = 'publications-table';
	$scope.title = 'Publications';
	$scope.buttonText = 'Add Publication';
	$scope.description = 'Click on publication to ...';
	$scope.rowHeaders = ['Publication', 'Authors', 'Date'];
    $http.get('/per/allPublications').then(function(response) {
        $scope.rows = response.data.map(x => {
            return {viewableData: {
                "pubName": x.pubName,
                "authors": x.authors.map(y => y.name).join(', '),
                "date": x.versions.slice(-1)[0].submittedDate,
                "status": x.status
            }, hiddenData: {id: x._id } };
        });
    },
    function (err) {});

	$scope.cellTypes = {
		pubName: CELLTYPES.CLICKABLE,
        authors: CELLTYPES.CLICKABLE,
		date: CELLTYPES.DATE
	};
    
    var createPublication = function () {
        var modalInstance = $uibModal.open({
            backdrop: 'static',
            templateUrl: '/per/view/modal-create-publication.ejs',
            controller: 'CreatePublicationModalCtrl',
            appendTo: $('body')
        });
        
        modalInstance.result.then(function (publication) {
            $http.get('/per/createPublication/' + publication.viewableData.pubName).then(function (response) {
                $scope.rows.push(publication);
                $timeout(function () {
                    var addedPublication = $('#absract-table tr').last();
                    $('#abstract-table').DataTable().row.add(addedPublication[0]);
                });
            }, function (err) {
            });
        });
    };
    
    var editPublication = function () {
        console.log("editPublication");
        var modalInstance = $uibModal.open({
            backdrop: 'static',
            templateUrl: '/per/view/modal-edit-publication.ejs',
            controller: 'EditPublicationModalCtrl',
            appendTo: $('body') // In future, want to modify existing
        });
    };

    $scope.clickHandlerMap = {
		button: function () {
            createPublication();
		},
		name: function (row) {
			$location.url('/per/publication/' + row.hiddenData.id);
		},
        row: function () {
            editPublication();
            console.log("edit Publication");
        }
	};
});

app.controller('CreatePublicationModalCtrl', function ($scope, $uibModalInstance) {
	$scope.createPublication = function () {
		$uibModalInstance.close({
			viewableData: {
				"pubName": $scope.publicationName,
                "authors": $scope.publicationAuthors,
				"date": "Apr 1, 2017",
                "status": "In Progress"
			},
            hiddenData: {"id": 'publication-4T2'}
        });
	};
	$scope.closeModal = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('EditPublicationModalCtrl', function ($scope, $uibModalInstance) {
    $scope.editPublication = function () {
        $uibModalInstance.close({
            viewableData: {
                "pubName": $scope.publicationName,
                "authors": $scope.publicationAuthors
            },
            hiddenData: {"id": 'publication-id_123'}
        });
    };
    $scope.closeModal = function () {
        $uibModalInstance.dismiss('cancel');
    };
});