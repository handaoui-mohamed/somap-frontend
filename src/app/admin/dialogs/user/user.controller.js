(function () {
	'use strict';

	angular
		.module("admin")
		.controller("UserDialogController", UserDialogController);

	function UserDialogController($mdDialog, Toast, User, UserService, WilayaService) {
		var vm = this;
		vm.user = angular.copy(User);
		vm.isUpdate = !!vm.user;

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
			if (!vm.changePassword) delete vm.user.password;
			UserService.save(vm.user, function (data) {
				$mdDialog.hide(data.element);
			}, function (error) { Toast.error(error) });
		}

		function add() {
			UserService.save(vm.user, function (data) {
				$mdDialog.hide(data.element, true);
			}, function (error) { Toast.error(error) });
		}
	}
})();