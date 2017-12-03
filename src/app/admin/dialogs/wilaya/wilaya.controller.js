(function () {
	'use strict';

	angular
		.module("admin")
		.controller("WilayaDialogController", WilayaDialogController);

	function WilayaDialogController($mdDialog, Toast, Wilaya, WilayaService) {
		var vm = this;
		vm.wilaya = angular.copy(Wilaya);
		vm.isUpdate = !!vm.wilaya;

		vm.save = save;
		vm.close = close;

		function close() {
			$mdDialog.cancel();
		}

		function save() {
			(vm.isUpdate ? update : add)();
		}

		function update() {
			WilayaService.update({ wilayaId: vm.wilaya.id }, vm.wilaya, function (data) {
				Toast.message("La wilaya a été modifié.");
				$mdDialog.hide({ wilaya: data.element });
			}, function (error) { Toast.error(error) });
		}

		function add() {
			WilayaService.save(vm.wilaya, function (data) {
				Toast.message("La wilaya a été ajouté.");
				$mdDialog.hide({ wilaya: data.element, isNew: true });
			}, function (error) { Toast.error(error) });
		}
	}
})();