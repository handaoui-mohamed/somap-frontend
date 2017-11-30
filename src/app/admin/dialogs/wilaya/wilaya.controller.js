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
			$mdDialog.hide();
		}

		function save() {
			(vm.isUpdate ? update : add)();
		}

		function update() {
			WilayaService.save({ wilayaId: vm.wilaya.id }, vm.wilaya, function (data) {
				Toast.message("La wilaya a été modifié.");
				$mdDialog.hide(data.element);
			}, function (error) { Toast.error(error) });
		}

		function add() {
			WilayaService.save(vm.wilaya, function (data) {
				Toast.message("La wilaya a été ajouté.");
				$mdDialog.hide(data.element, true);
			}, function (error) { Toast.error(error) });
		}
	}
})();