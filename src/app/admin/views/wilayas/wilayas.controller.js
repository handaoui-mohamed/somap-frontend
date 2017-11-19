(function () {
	'use strict';

	angular
		.module("admin")
		.controller("WilayaController", WilayaController);

	function WilayaController(Toast, WilayaSerice) {
		var vm = this;
		vm.wilayas = [];

		WilayaSerice.get(function (data) {
			vm.wilayas = data.elements;
		}, function (error) { Toast.error(error) });
	}
})();