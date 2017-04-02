'use strict';
var app = angular.module('App');

app.controller('AddDataModalCtrl', function ($scope, $uibModalInstance, $window, $http) {
	$scope.currentPage = 0;

    $window.fd.logging = false;

	$scope.clickUploadFile = function() {
		$('#upload-file-input').click();
	};

	$scope.processFileName = function() {
		$scope.uploadedFileName = Array.prototype.map.call($scope.files, x => x.name).join(', ');
		$scope.$apply();
	};

	$scope.handleManualInputChange = function(e) {
		$scope.files = e.target.files;
		$scope.processFileName();
	};

	$scope.handleUpload = function(e) {
		$scope.files = $scope.zone.eventFiles(e);
		$scope.processFileName();
	};

	$scope.upload = function() {
		var files = $scope.files;
		var formData = new FormData();

		formData.append('fileName', $scope.fileName);
		formData.append('format', $scope.format);
		formData.append('description', $scope.description);

	    for (var i = 0, len = files.length; i < len; i++) {
	        formData.append('file' + i, files[i]);
	    }
	    $http.post( '/per/uploadFile', formData, {
	        headers: { 'Content-Type': undefined },
	        transformRequest: angular.identity
	    }).then(function (result) {
	        $scope.closeModal(result.data);
	   	}, function (err) {
	        $scope.closeModal({err: err});
	    });
	}

	$scope.closeModal = function (obj) {
        $uibModalInstance.close(obj);
    };

    $scope.dismissModal = function() {
    	$uibModalInstance.dismiss();;
    }

    $scope.primaryBtn = function () {
		if ($scope.currentPage === 0) {
			$scope.currentPage++;
			$scope.zone = new FileDrop('zthumbs', {input: false});
			$scope.zone.event('upload', $scope.handleUpload);
			$('#upload-file-input').change($scope.handleManualInputChange);
		} else {
			$scope.upload();
		}
	};
});