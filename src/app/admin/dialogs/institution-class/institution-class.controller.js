(function () {
	'use strict';

	angular
		.module("admin")
		.controller("IntitutionClassDialogController", IntitutionClassDialogController);

	function IntitutionClassDialogController($mdDialog, Toast, InstitutionClass, InstitutionClassService) {
		var vm = this;
		vm.institutionClass = angular.copy(InstitutionClass);
		vm.isUpdate = !!vm.institutionClass;

		vm.save = save;
		vm.close = close;

		function close() {
			$mdDialog.hide();
		}

		function save() {
			(vm.isUpdate ? update : add)();
		}

		function update() {
			InstitutionClassService.save({ institutionClassId: vm.institutionClass.id }, vm.institutionClass, function (data) {
				Toast.message("Le type d'établissement a été modifié.");
				$mdDialog.hide(data.element);
			}, function (error) { Toast.error(error) });
		}

		function add() {
			InstitutionClassService.save(vm.institutionClass, function (data) {
				Toast.message("Le type d'établissement a été ajouté.");
				$mdDialog.hide(data.element, true);
			}, function (error) { Toast.error(error) });
		}
	}
})();