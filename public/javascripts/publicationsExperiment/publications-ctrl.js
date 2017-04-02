/*jslint node: true */
/*global $, jQuery, alert, angular*/
'use strict';
var app = angular.module('App');

app.controller('PublicationsCtrl', function ($scope, $location, $uibModal, $timeout, CELLTYPES, $http) {
	$scope.tableClassName = 'publications-table';
	$scope.title = 'Publications';
	$scope.buttonText = 'Add Publication';
	$scope.description = 'Click on publication to ...';
	$scope.rowHeaders = ['Publication', 'Authors', 'Date', 'Status'];

	$scope.cellTypes = {
		pubName: CELLTYPES.CLICKABLE,
        authors: CELLTYPES.CLICKABLE,
		date: CELLTYPES.DATE,
		status: CELLTYPES.STATUS
	};
    
    var createPublication = function () {
        var modalInstance = $uibModal.open({
            backdrop: 'static',
            templateUrl: '/per/view/modal-create-publication.ejs',
            controller: 'CreatePublicationModalCtrl',
            appendTo: $('body')
        });
        
        modalInstance.result.then(function (publication) {
            console.log(publication);
            $http({
                method: 'GET',
                url: '/per/createPublication/' + publication.viewableData.pubName
            }).then(function successCallback(response) {
            }, function errorCallback(response) {
                console.log(response);
            });
            $scope.rows.push(publication);
            $timeout(function () {
                var addedPublication = $('#absract-table tr').last();
                $('#abstract-table').DataTable().row.add(addedPublication[0]);
            });
        });
    },
    
	    editPublication = function () {
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
	
	$scope.statusMap = {
		'In Progress': 'label-primary',
		'Complete': 'label-success',
		'Approaching Deadline': 'label-warning',
		'Overdue': 'label-danger'
	};
	// {"publication-0A": "Deep De-Noising Autoencoders","publication-0B": "Convolutional Nets and Radon Transform","publication-3": "Evolutionary Projection Selection","publication-4": "ROI Estimation in Ultrasound Images","publication-5": "Image Segmentation with Self-Configuration","publication-6": "Learning Opposites with Evolving Rules","publication-7": "Validation of Atlas-Based Segmentation"}
	$scope.rows = [
		{viewableData: {"pubName": "Deep De-Noising Autoencoders", "authors": "A.Z.", "date": "Jan 1, 1928", "status": "In Progress"}, hiddenData: {"id": 'publication-0A'}  },
		{viewableData: {"pubName": "Convolutional Nets and Radon Transform", "authors": "A.Z.", "date": "Jan 1, 1952", "status": "Complete"}, hiddenData: {"id": 'publication-0B'} },
		{viewableData: {"pubName": "Evolutionary Projection Selection", "authors": "A.Z.", "date": "Jan 1, 1964", "status": "Approaching Deadline"}, hiddenData: {"id": 'publication-3'} },
		{viewableData: {"pubName": "ROI Estimation in Ultrasound Images", "authors": "A.Z.", "date": "Jan 1, 1964", "status": "Overdue"}, hiddenData: {"id": 'publication-4'} },
		{viewableData: {"pubName": "Image Segmentation with Self-Configuration", "authors": "A.Z.", "date": "Jan 1, 1995", "status": "In Progress"}, hiddenData: {"id": 'publication-5'} },
		{viewableData: {"pubName": "Learning Opposites with Evolving Rules", "authors": "A.Z.", "date": "Jan 1, 1974", "status": "Complete"}, hiddenData: {"id": 'publication-6'} },
		{viewableData: {"pubName": "Validation of Atlas-Based Segmentation", "authors": "A.Z.", "date": "Jan 1, 1974", "status": "Approaching Deadline"}, hiddenData: {"id": 'publication-7'} }
	];
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