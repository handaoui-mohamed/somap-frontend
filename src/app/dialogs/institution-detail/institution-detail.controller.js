(function () {
	'use strict';

	angular
		.module("home")
		.controller("InstitutionDetailsDialogController", InstitutionDetailsDialogController);

	function InstitutionDetailsDialogController($mdDialog, Institution) {
		var vm = this;
		vm.institution = angular.copy(Institution);


		vm.close = close;

		function close() {
			$mdDialog.hide();
		}
	}
})();