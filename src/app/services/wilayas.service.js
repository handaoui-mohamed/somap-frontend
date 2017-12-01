(function () {
	'use strict';

	angular
		.module("services")
		.factory("WilayaService", WilayaService);

	function WilayaService($resource, API_ENDPOINT) {
		return $resource(API_ENDPOINT + 'wilayas/:wilayaId', { wilayaId: '@id' }, {
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