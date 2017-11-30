(function () {
	'use strict';

	angular
		.module("admin")
		.controller("UserDialogController", UserDialogController);

	function UserDialogController($mdDialog, Toast, User, UserService, WilayaService) {
		var vm = this;
		vm.user = angular.copy(User);
		vm.isUpdate = !!vm.user;
		vm.wilayas = [];

		WilayaService.get(function (data) {
			vm.wilayas = data.elements;
		}, function (error) { Toast.error(error) });

		vm.save = save;
		vm.close = close;

		function close() {
			$mdDialog.cancel();
		}

		function save() {
			(vm.isUpdate ? update : add)();
		}

		function update() {
			if (!vm.changePassword) delete vm.user.password;
			UserService.update({ userId: vm.user.id }, vm.user, function (data) {
				Toast.message("L'utilisateur a été modifié.");
				$mdDialog.hide({ user: data.element });
			}, function (error) { Toast.error(error) });
		}

		function add() {
			UserService.save(vm.user, function (data) {
				Toast.message("L'utilisateur a été ajouté.");
				$mdDialog.hide({ user: data.element, isNew: true });
			}, function (error) { Toast.error(error) });
		}
	}
})();