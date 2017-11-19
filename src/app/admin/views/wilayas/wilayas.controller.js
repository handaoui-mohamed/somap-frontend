(function () {
	'use strict';

	angular
		.module("admin")
		.controller("WilayaController", WilayaController);

	function WilayaController(Toast, WilayaService) {
		var vm = this;
		vm.wilayas = [];

		WilayaService.get(function (data) {
			vm.wilayas = data.elements;
		}, function (error) { Toast.error(error) });
	}
})();