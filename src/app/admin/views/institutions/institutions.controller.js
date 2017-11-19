(function () {
	'use strict';

	angular
		.module("admin")
		.controller("InstitutionController", InstitutionController);

	function InstitutionController(InstitutionService, Toast) {
		var vm = this;
		vm.institutions = [];

		InstitutionService.get(function (data) {
			vm.institutions = data.elements;
		}, function (error) { Toast.error(error) });
	}
})();