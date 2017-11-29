(function () {
	'use strict';

	angular
		.module("admin")
		.controller("WilayaController", WilayaController);

	function WilayaController($mdDialog, Toast, WilayaService) {
		var vm = this;
		vm.wilayas = [];
		vm.query = { limit: 10, page: 1 };

		WilayaService.get(function (data) {
			vm.wilayas = data.elements;
		}, function (error) { Toast.error(error) });

		vm.openWilayaDialog = openWilayaDialog;
		vm.deleteWilayaDialog = deleteWilayaDialog;

		function openWilayaDialog(event, wilaya) {
			$mdDialog.show({
				controller: "WilayaFormDialogController",
				controllerAs: 'dialVm',
				templateUrl: "app/admin/dialogs/wilaya/wilaya.html",
				parent: angular.element(document.body),
				targetEvent: event,
				clickOutsideToClose: true,
				escapeToClose: true,
				fullscreen: true,
				locals: {
					Wilaya: wilaya
				}
			}).then(function (wil, isNew) {
				if (isNew) {
					vm.wilayas.unshift(wil);
				} else {
					for (var key in wilaya) {
						if (wilaya.hasOwnProperty(key)) {
							wilaya[key] = wil[key];
						}
					}
				}
			}, function () { });
		}

		function deleteWilayaDialog(event, wilayaId, index) {
			var confirm = $mdDialog.confirm()
				.title('Suppression!')
				.textContent('Voulez vous supprimer cette wilaya ?')
				.ariaLabel('validation')
				.targetEvent(event)
				.ok('Confirmer')
				.cancel('Annuler');
			$mdDialog.show(confirm).then(function () {
				WilayaService.delete({ wilayaId: wilayaId }, function () {
					vm.wilayas.slice(index, 1);
				}, function (error) { Toast.error(error) })
			}, function () { });
		}
	}
})();