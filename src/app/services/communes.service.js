(function () {
	'use strict';

	angular
		.module("services")
		.factory("CommuneService", CommuneService);

	function CommuneService($resource, API_ENDPOINT) {
		return $resource(API_ENDPOINT + 'communes/:communeId', { communeId: '@id' }, {
			'get': {
				method: 'GET',
				isArray: false
			}
		});
	}
})();