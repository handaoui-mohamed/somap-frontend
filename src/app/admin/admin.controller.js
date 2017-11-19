(function () {
	'use strict';

	angular
		.module("admin")
		.controller("AdminController", AdminController);

	function AdminController($mdSidenav) {
		var vm = this;
		vm.isLockedOpen = true;

		vm.toggleSideNav = toggleSideNav;

		function toggleSideNav() {
			if (!vm.isLockedOpen)
				$mdSidenav("left").close();
			vm.isLockedOpen = !vm.isLockedOpen;
		}
	}
})();