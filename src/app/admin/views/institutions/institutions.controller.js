(function () {
	'use strict';

	angular
		.module("admin")
		.controller("InstitutionController", InstitutionController);

	function InstitutionController($mdDialog, InstitutionService, Toast) {
		var vm = this;
		vm.institutions = [];
		vm.query = {limit: 10, page: 1};

		vm.promise = InstitutionService.get(function (data) {
			vm.institutions = data.elements;
		}, function (error) { Toast.error(error) }).$promise;

		vm.openInstitutionDialog = openInstitutionDialog;

		function openInstitutionDialog(event) {
			$mdDialog.show({
				controller: "IntitutionFormDialogController",
				controllerAs: 'dialVm',
				templateUrl: "app/dialogs/institution/institution.html",
				parent: angular.element(document.body),
				targetEvent: event,
				clickOutsideToClose: true,
				fullscreen: true
			}).then(function () {
			}, function () { });
		}
	}
})();