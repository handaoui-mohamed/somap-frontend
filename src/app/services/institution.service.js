(function () {
	'use strict';

	angular
		.module("services")
		.factory("InstitutionService", InstitutionService);

	function InstitutionService($resource, API_ENDPOINT) {
		return $resource(API_ENDPOINT + 'institutions/:institutionId', { institutionId: '@id' }, {
			'get': {
				method: 'GET',
				isArray: false
			},
			'update': {
				method: 'PUT'
			}
		});
	}
})();