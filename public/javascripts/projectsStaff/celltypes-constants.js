/*jslint node: true */
/*global $, jQuery, alert, angular*/
'use strict';
var app = angular.module('App');

app.constant('CELLTYPES', {
	CLICKABLE: '/psr/view/cell-clickable.ejs',
	DELETE: '/psr/view/cell-delete.ejs',
	DOWNLOAD: '/psr/view/cell-download.ejs',
	DATE: '/psr/view/cell-formatted-date.ejs',
	PLAIN: '/psr/view/cell-plain.ejs',
	STATUS: '/psr/view/cell-status.ejs'
});
