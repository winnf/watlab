'use strict';
var app = angular.module('App');

app.constant('CELLTYPES', {
	CLICKABLE: '/view/cell-clickable.ejs', 
	DELETE: '/view/cell-delete.ejs', 
	DOWNLOAD: '/view/cell-download.ejs', 
	DATE: '/view/cell-formatted-date.ejs', 
	PLAIN: '/view/cell-plain.ejs', 
	STATUS: '/view/cell-status.ejs'
});