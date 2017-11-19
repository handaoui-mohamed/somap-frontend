(function () {
	'use strict';

	angular
		.module("admin")
		.controller("CommuneController", CommuneController);

	function CommuneController(Toast, CommuneService) {
		var vm = this;
		vm.communes = [];

		CommuneService.get(function (data) {
			vm.communes = data.elements;
		}, function (error) { Toast.error(error) });
	}
})();