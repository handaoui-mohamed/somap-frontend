(function () {
	'use strict';

	angular
		.module("admin")
		.controller("InstitutionClassesController", InstitutionClassesController);

	function InstitutionClassesController($mdDialog, Toast, InstitutionClassService) {
		var vm = this;
		vm.institutionClasses = [];
		vm.query = { limit: 10, page: 1 };

		InstitutionClassService.get(function (data) {
			vm.institutionClasses = data.elements;
		}, function (error) { Toast.error(error) });

		vm.openInstitutionClassDialog = openInstitutionClassDialog;
		vm.deleteInstitutionClassDialog = deleteInstitutionClassDialog;

		function openInstitutionClassDialog(event, institutionClass) {
			$mdDialog.show({
				controller: "IntitutionClassDialogController",
				controllerAs: 'dialVm',
				templateUrl: "app/admin/dialogs/institution-class/institution-class.html",
				parent: angular.element(document.body),
				targetEvent: event,
				clickOutsideToClose: true,
				escapeToClose: true,
				fullscreen: true,
				locals: {
					InstitutionClass: institutionClass
				}
			}).then(function (data) {
				if (data.isNew) {
					vm.institutionClasses.unshift(data.institutionClass);
				} else {
					angular.forEach(institutionClass, function (value, key) {
						institutionClass[key] = data.institutionClass[key];
					});
				}
			}, function () { });
		}

		function deleteInstitutionClassDialog(event, InstitutionClassId, index) {
			var confirm = $mdDialog.confirm()
				.title('Suppression!')
				.textContent('Voulez vous supprimer ce type d\'établissement?')
				.ariaLabel('validation')
				.targetEvent(event)
				.ok('Confirmer')
				.cancel('Annuler');
			$mdDialog.show(confirm).then(function () {
				InstitutionClassService.delete({ InstitutionClassId: InstitutionClassId }, function () {
					vm.InstitutionClasses.splice(index, 1);
				}, function (error) { Toast.error(error) })
			}, function () { });
		}
	}
})();