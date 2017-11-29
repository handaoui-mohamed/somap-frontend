(function () {
	'use strict';

	angular
		.module("admin")
		.controller("CommuneController", CommuneController);

	function CommuneController($mdDialog, Toast, CommuneService) {
		var vm = this;
		vm.communes = [];
		vm.query = { limit: 10, page: 1 };

		CommuneService.get(function (data) {
			vm.communes = data.elements;
		}, function (error) { Toast.error(error) });


		vm.openCommuneDialog = openCommuneDialog
		vm.deleteCommuneDialog = deleteCommuneDialog;

		function openCommuneDialog(event, commune) {
			$mdDialog.show({
				controller: "CommuneDialogController",
				controllerAs: 'dialVm',
				templateUrl: "app/admin/dialogs/commune/commune.html",
				parent: angular.element(document.body),
				targetEvent: event,
				clickOutsideToClose: true,
				escapeToClose: true,
				fullscreen: true,
				locals: {
					Commune: commune
				}
			}).then(function (cmn, isNew) {
				if (isNew) {
					vm.communes.unshift(cmn);
				} else {
					angular.forEach(commune, function (value, key) {
						commune[key] = cmn[key];
					});
				}
			}, function () { });
		}

		function deleteCommuneDialog(event, communeId, index) {
			var confirm = $mdDialog.confirm()
				.title('Suppression!')
				.textContent('Voulez vous supprimer cette commune ?')
				.ariaLabel('validation')
				.targetEvent(event)
				.ok('Confirmer')
				.cancel('Annuler');
			$mdDialog.show(confirm).then(function () {
				CommuneService.delete({ communeId: communeId }, function () {
					vm.communes.slice(index, 1);
				}, function (error) { Toast.error(error) })
			}, function () { });
		}
	}
})();