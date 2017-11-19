(function () {
	'use strict';

	angular
		.module("admin", [])
		.config(config);

	function config($stateProvider) {
		$stateProvider
			.state('admin.users', {
				url: '/users',
				controller: 'UserController as userVm',
				templateUrl: 'app/admin/views/users/users.html'
			})
			.state('admin.institutions', {
				url: '/etablisements',
				controller: 'InstitutionController as instVm',
				templateUrl: 'app/admin/views/institutions/institutions.html'
			})
			.state('admin.institution_classes', {
				url: '/types-etablisement',
				controller: 'InstitutionClassesController as incVm',
				templateUrl: 'app/admin/views/institution-classes/institution-classes.html'
			})
			.state('admin.wilayas', {
				url: '/wilayas',
				controller: 'WilayaController as wilVm',
				templateUrl: 'app/admin/views/wilayas/wilayas.html'
			}).state('admin.communes', {
				url: '/communes',
				controller: 'CommuneController as comVm',
				templateUrl: 'app/admin/views/communes/communes.html'
			});
	}
})();