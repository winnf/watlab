/*jslint node: true */
/*global $, jQuery, alert, angular*/
'use strict';
var app = angular.module('App');

app.controller('SpecificExperimentCtrl', function ($scope, $window, $routeParams, $uibModal, CELLTYPES, ngToast, $timeout, $http) {
	var experimentId = $routeParams.experimentId;

	// Dummy http request for now
	var getNameFromId = function (id) { return {"experiment-0A": "Correlated diffusion imaging (CDI) for cancer imaging", "experiment-0B": "Evolutionary deep intelligence for operational deep intelligence", "experiment-3": "Musculoskeletal kinematic analysis using video fluoroscopy", "experiment-4": "Ocular morphological analysis", "experiment-5": "Sea ice analysis using synthetic aperture radar ", "experiment-6": "Image and video noise reduction and artifact reduction", "experiment-7": "Spectral demultiplexed imaging (SDI) for single-shot multispectral tissue"}[id]; };

	$scope.tableClassName = 'specific-experiment-table';
	$scope.tabs = ['Data', 'Labbook', 'Protocols', 'Literature & Papers Reference'];

	$scope.title = getNameFromId(experimentId);
	$http.get('/per/getExperimentData/' + experimentId).then(function(result){
		var data = result.data;
		$scope.title = data.name;

		var entries = data.entryIds;
		var entryRows = entries.map(x => {
			return {viewableData: {
				fileName: x.name, description: x.description, 
				date: x.date, owner: x.owner.name, format: x.format, archive: true, download: true
				},
				hiddenData: {id: x._id, mimetype: x.mimetype, filePath: x.filePath} }; 
		});
		$scope.table[0].rows = entryRows;
	}, function() {

	});

	$scope.table = [
		{
			rowHeaders: ['File Name', 'Description', 'Date', 'Owner', 'Format', 'Download', 'Archive'],
			cellTypes: {
				fileName: CELLTYPES.PLAIN,
				description: CELLTYPES.PLAIN,
				date: CELLTYPES.DATE,
				owner: CELLTYPES.PLAIN,
				format: CELLTYPES.PLAIN,
				download: CELLTYPES.DOWNLOAD,
				archive: CELLTYPES.DELETE
			},
			// rows: [
			// 	{viewableData: {"file-name": "Cell Sample Data", "description": "Collection of blood, saliva, and buccal cell samples in a pilot study on the Danish nurse cohort: comparison of the response rate and quality of genomic DNA.", "date": "Jan 1, 1928", "owner": "William Smith", "format": ".csv", "download": true, "archive": true}, hiddenData: {"url": "experiment-0A"} },
			// 	{viewableData: {"file-name": "Microwave Data", "description": "We present a full-sky 100 μm map that is a reprocessed composite of the COBE/DIRBE and IRAS/ISSA maps, with the zodiacal foreground and confirmed point sources removed. Before using the ISSA maps, we remove the remaining artifacts", "date": "Jan 1, 1952", "owner": "John Smith", "format": ".py", "download": true, "archive": true}, hiddenData: {"url": "experiment-0B"} },
			// 	{viewableData: {"file-name": "Radiation Data", "description": "The phenomenon of growth, decline and death—aging—has been the source of considerable speculation. This cycle seems to be a more or less direct function of the metabolic rate and this in turn depends on the species (animal or plant)", "date": "Jan 1, 1964", "owner": "John Bob", "format": ".mat", "download": true, "archive": true}, hiddenData: {"url": "experiment-3"} },
			// 	{viewableData: {"file-name": "Bird Calls", "description": "Automatic identification of bird calls without manual intervention has been a challenging task for meaningful research on the taxonomy and monitoring of bird migrations in ornithology", "date": "Jan 1, 1964", "owner": "Bob John", "format": ".mp3", "download": true, "archive": true}, hiddenData: {"url": "experiment-4"} },
			// 	{viewableData: {"file-name": "Seisometer", "description": "A tomographic image of the upper mantle beneath central Tibet from INDEPTH data has revealed a subvertical high-velocity zone from∼ 100-to∼ 400-kilometers depth, located approximately south of the Bangong-Nujiang Suture", "date": "Jan 1, 1995", "owner": "Smith William", "format": ".jpeg", "download": true, "archive": true}, hiddenData: {"url": "experiment-5"} },
			// 	{viewableData: {"file-name": "Lochness Monster Sighting", "description": "Recent publicity concerning new claims for the existence of the Loch Ness monster has focused on the evidence offered by Sir Peter Scott and Robert Rines.", "date": "Jan 1, 1974", "owner": "Bob Smith", "format": ".mp4", "download": true, "archive": true}, hiddenData: {"url": "experiment-6"} }
			// ]
		},
		{
			rowHeaders: ['File Name', 'Status'],
			cellTypes: {
				'file-name': CELLTYPES.CLICKABLE,
				status: CELLTYPES.STATUS
			},
			rows: [
				{viewableData: {"file-name": "Cell Sample Data", "status": "In Progress"}, hiddenData: {"url": "experiment-0A"} },
				{viewableData: {"file-name": "Microwave Data", "status": "Complete"}, hiddenData: {"url": "experiment-0B"} },
				{viewableData: {"file-name": "Radiation Data", "status": "Approaching Deadline"}, hiddenData: {"url": "experiment-3"} },
				{viewableData: {"file-name": "Bird Calls", "status": "Overdue" }, hiddenData: {"url": "experiment-4"} },
				{viewableData: {"file-name": "Seisometer", "status": "Complete"}, hiddenData: {"url": "experiment-5"} },
				{viewableData: {"file-name": "Lochness Monster Sighting", "status": "Approaching Deadline"}, hiddenData: {"url": "experiment-6"} }
			]
		},
		{
			rowHeaders: ['Protocols'],
			cellTypes: {
				protocols: CELLTYPES.PLAIN
			},
			rows: [
				{viewableData: {"protocols": "Protocol1"}, hiddenData: {} },
				{viewableData: {"protocols": "Protocol2"}, hiddenData: {} },
				{viewableData: {"protocols": "Protocol3"}, hiddenData: {} },
				{viewableData: {"protocols": "Protocol4"}, hiddenData: {} },
				{viewableData: {"protocols": "Protocol5"}, hiddenData: {} },
				{viewableData: {"protocols": "Protocol6"}, hiddenData: {} }
			]
		},
		{
			rowHeaders: ['Literature and References'],
			cellTypes: {
				literature: CELLTYPES.PLAIN
			},
			rows: [
				{viewableData: {"literature": "Paper1"}, hiddenData: {} },
				{viewableData: {"literature": "Paper2"}, hiddenData: {} },
				{viewableData: {"literature": "Paper3"}, hiddenData: {} },
				{viewableData: {"literature": "Paper4"}, hiddenData: {} },
				{viewableData: {"literature": "Paper5"}, hiddenData: {} },
				{viewableData: {"literature": "Paper6"}, hiddenData: {} }
			]
		}
	];

	var uploadData = function () {
		var modalInstance = $uibModal.open({
			backdrop: 'static',
            templateUrl: '/per/view/modal-add-data.ejs',
            controller: 'AddDataModalCtrl',
            appendTo: $('body')
        });

        modalInstance.result.then(function(result){
        	$scope.showToast = true;
	    	$timeout(function(){ 
	    		if(typeof result.err === 'undefined') {
		    		ngToast.create('Success uploading ' + result.map(x=>x.name).join(', ')); 
	    		} else {
	    			ngToast.create({className: 'danger', content: 'Error uploading data'}); 
	    		}
	    	});
        })
	};

	$scope.includeTabs = true;
	$scope.clickHandlerMap = {
		button: function () {
			if ($scope.currentTabIndex === 0) {
				uploadData();
			} else {
				alert('Add ' + $scope.tabs[$scope.currentTabIndex]);
			}
		},
		archive: function (row, i, event) {
			var tr = $(event.target).closest('tr');
			$('#abstract-table').DataTable().row(tr).remove().draw();
		},
		download: function (row) {
			var entryId = row.hiddenData.id;
			$window.open('/per/downloadFile/' + entryId);
		},
		tabChange: function (index) {
			var table = $scope.table[index];
			$scope.buttonText = 'Add ' + $scope.tabs[index];
			$scope.description = 'Here is your ' + $scope.tabs[index];
			$scope.rowHeaders = table.rowHeaders;
			$scope.cellTypes = table.cellTypes;
			$scope.rows = table.rows;
			$scope.currentTabIndex = index;
		}
	};

	$scope.clickHandlerMap.tabChange(0);
	
	$scope.statusMap = {
		'In Progress': 'label-primary',
		'Complete': 'label-success',
		'Approaching Deadline': 'label-warning',
		'Overdue': 'label-danger'
	};
});