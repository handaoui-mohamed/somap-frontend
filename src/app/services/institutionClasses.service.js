(function () {
	'use strict';

	angular
		.module("services")
		.factory("InstitutionClassService", InstitutionClassService);

	function InstitutionClassService($resource, API_ENDPOINT) {
		return $resource(API_ENDPOINT + 'institution_classes/:institutionClassId', { institutionClassId: '@id' }, {
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