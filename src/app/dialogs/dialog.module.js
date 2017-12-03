(function () {
	'use strict';

	angular
		.module("dialogs", ["satellizer"])
		.config(config);

	function config($authProvider) {
		$authProvider.tokenPrefix = '';
		$authProvider.authHeader = 'Authorization';
		$authProvider.authToken = 'token';
	}
})();