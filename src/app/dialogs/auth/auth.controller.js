(function () {
	'use strict';

	angular
		.module("dialogs")
		.controller("AuthDialogController", AuthDialogController);

	function AuthDialogController($rootScope, $mdDialog, $auth, $window, Toast, API_ENDPOINT) {
		var vm = this;

		vm.close = close;
		vm.login = login;

		function close() {
			$mdDialog.hide();
		}

		function login() {
			vm.disableLogin = true;
			$auth.login(vm.user, { url: API_ENDPOINT + 'login' }).then(function (response) {
				if (!response.data.errors) {
					Toast.message('Connexion avec succès');
					$window.localStorage['current_user'] = response.data.user._id;
					$rootScope.currentUser = response.data.user;
					close();
				} else {
					Toast.error(response.data.errors);
				}
				vm.disableLogin = false;
			}, function (response) {
				Toast.error(response);
				vm.disableLogin = false;
			});
		}
	}
})();