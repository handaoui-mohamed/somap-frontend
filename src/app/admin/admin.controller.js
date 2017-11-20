(function () {
	'use strict';

	angular
		.module("admin")
		.controller("AdminController", AdminController);

	function AdminController($rootScope, $auth, $window, $state, $mdSidenav) {
		var vm = this;

		vm.toggleSideNav = toggleSideNav;
		vm.logout = logout;

		function toggleSideNav() {
			$mdSidenav("left").toggle();
		}

		function logout() {
			$auth.logout();
			$window.localStorage.removeItem('current_user');
			delete $rootScope.currentUser;
			$state.go('home');
		}
	}
})();