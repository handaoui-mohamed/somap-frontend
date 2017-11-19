(function () {
	'use strict';

	angular
		.module("dialogs")
		.controller("AuthDialogController", AuthDialogController);

	function AuthDialogController($mdDialog) {
		var vm = this;

		vm.close = close;

		function close() {
			$mdDialog.hide();
		}
	}
})();