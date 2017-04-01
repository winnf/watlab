/*jslint node: true */
/*global $, jQuery, alert, angular*/
'use strict';
var app = angular.module('App');

app.constant('CELLTYPES', {
	CLICKABLE: '/per/view/cell-clickable.ejs',
	DELETE: '/per/view/cell-delete.ejs',
	DOWNLOAD: '/per/view/cell-download.ejs',
	DATE: '/per/view/cell-formatted-date.ejs',
	PLAIN: '/per/view/cell-plain.ejs',
	STATUS: '/per/view/cell-status.ejs'
});