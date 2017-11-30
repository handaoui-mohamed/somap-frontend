(function () {
	'use strict';

	angular
		.module("admin")
		.controller("InstitutionController", InstitutionController);

	function InstitutionController($mdDialog, InstitutionService, Toast) {
		var vm = this;
		vm.institutions = [];
		vm.query = { limit: 10, page: 1 };

		vm.promise = InstitutionService.get(function (data) {
			vm.institutions = data.elements;
		}, function (error) { Toast.error(error) }).$promise;

		vm.openInstitutionDialog = openInstitutionDialog;
		vm.showConfirmationDialog = showConfirmationDialog;
		vm.deleteInstitutionDialog = deleteInstitutionDialog;

		function openInstitutionDialog(event, institution) {
			$mdDialog.show({
				controller: "IntitutionFormDialogController",
				controllerAs: 'dialVm',
				templateUrl: "app/dialogs/institution/institution.html",
				parent: angular.element(document.body),
				targetEvent: event,
				clickOutsideToClose: true,
				escapeToClose: true,
				fullscreen: true,
				locals: {
					Institution: institution
				}
			}).then(function (data) {
				if (data.isNew) {
					vm.institutions.unshift(data.institution);
				} else {
					angular.forEach(institution, function (value, key) {
						institution[key] = data.institution[key];
					});
				}
			}, function () { });
		}

		function showConfirmationDialog(event, institution) {
			var confirm = $mdDialog.confirm()
				.title('Confirmation:')
				.textContent('Voulez vous changer la validation de cet etablissement?')
				.ariaLabel('validation')
				.targetEvent(event)
				.ok('Confirmer')
				.cancel('Annuler');
			$mdDialog.show(confirm).then(function () {
				var inst = angular.copy(institution);
				inst.validated = !inst.validated;
				inst.longitude = inst.position.lat;
				inst.latitude = inst.position.lng;
				InstitutionService.update({ institutionId: institution.id }, inst, function (data) {
					institution.validated = data.element.validated;
				}, function (error) { Toast.error(error) })
			}, function () { });
		}

		function deleteInstitutionDialog(event, InstitutionId, index) {
			var confirm = $mdDialog.confirm()
				.title('Suppression!')
				.textContent('Voulez vous supprimer cet etablissement?')
				.ariaLabel('validation')
				.targetEvent(event)
				.ok('Confirmer')
				.cancel('Annuler');
			$mdDialog.show(confirm).then(function () {
				InstitutionService.delete({ institutionId: InstitutionId }, function () {
					vm.institutions.splice(index, 1);
				}, function (error) { Toast.error(error) })
			}, function () { });
		}
	}
})();