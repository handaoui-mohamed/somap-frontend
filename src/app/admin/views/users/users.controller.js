(function () {
	'use strict';

	angular
		.module("admin")
		.controller("UserController", UserController);

	function UserController(Toast, UserService) {
		var vm = this;
		vm.users = [];

		UserService.get(function (data) {
			vm.users = data.elements;
			console.log(vm.users);
		}, function (error) { Toast.error(error) });
	}
})();