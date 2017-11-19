(function () {
	'use strict';

	angular
		.module("admin")
		.controller("AdminController", AdminController);

	function AdminController($auth, $window, $state, $mdSidenav) {
		var vm = this;
		vm.isLockedOpen = true;

		vm.toggleSideNav = toggleSideNav;
		vm.logout = logout;

		function toggleSideNav() {
			if (!vm.isLockedOpen)
				$mdSidenav("left").close();
			vm.isLockedOpen = !vm.isLockedOpen;
		}

		function logout() {
			$auth.logout();
			$window.localStorage.removeItem('current_user');
			$state.go('home');
		}
	}
})();