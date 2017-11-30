(function () {
	'use strict';

	angular
		.module("admin")
		.controller("CommuneDialogController", CommuneDialogController);

	function CommuneDialogController($mdDialog, Toast, Commune, WilayaService, CommuneService) {
		var vm = this;
		vm.commune = angular.copy(Commune);
		vm.isUpdate = !!vm.commune;
		vm.wilayas = [];

		WilayaService.get(function (data) {
			vm.wilayas = data.elements;
		}, function (error) { Toast.error(error) });

		vm.save = save;
		vm.close = close;

		function close() {
			$mdDialog.hide();
		}

		function save() {
			(vm.isUpdate ? update : add)();
		}

		function update() {
			CommuneService.save({ communeId: vm.commune.id }, vm.commune, function (data) {
				Toast.message("La commune a été modifié.");
				$mdDialog.hide(data.element);
			}, function (error) { Toast.error(error) });
		}

		function add() {
			CommuneService.save(vm.commune, function (data) {
				Toast.message("La commune a été ajouté.");
				$mdDialog.hide(data.element, true);
			}, function (error) { Toast.error(error) });
		}
	}
})();