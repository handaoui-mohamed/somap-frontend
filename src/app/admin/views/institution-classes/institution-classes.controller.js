(function () {
	'use strict';

	angular
		.module("admin")
		.controller("InstitutionClassesController", InstitutionClassesController);

	function InstitutionClassesController(Toast, InstitutionClassService) {
		var vm = this;
		vm.institutionClasses = [];

		InstitutionClassService.get(function (data) {
			vm.institutionClasses = data.elements;
		}, function (error) { Toast.error(error) });
	}
})();