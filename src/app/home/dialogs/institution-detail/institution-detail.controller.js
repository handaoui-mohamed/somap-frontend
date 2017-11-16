(function () {
	'use strict';

	angular
		.module("home")
		.controller("InstitutionDetailsDialogController", InstitutionDetailsDialogController);

	function InstitutionDetailsDialogController(Institution, Toast) {
		var vm = this;
		vm.institution = angular.copy(Institution);
	}
})();