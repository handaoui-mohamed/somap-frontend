(function () {
	"use strict";

	angular
		.module("home")
		.controller("HomeController", HomeController);

	function HomeController($rootScope, $filter, Toast, WilayaService, InstitutionClassService,
		InstitutionService) {

		var vm = this;

		vm.wilayas = [];
		vm.institutions = [];
		vm.institutionClasses = [];
		vm.filteredInstitutions = [];
		vm.selected = {
			wilaya: [],
			insitutionClasses: []
		};
		vm.query = "";
		vm.atHome = true;
		vm.limit = 20;

		// fetch Data from server
		InstitutionClassService.get(function (data) {
			vm.institutionClasses = data.elements;
			vm.selected.institutionClasses = vm.institutionClasses.map(function (institutionClass) {
				return institutionClass.id;
			});
		}, function (errors) { Toast.error(errors); });

		WilayaService.get(function (data) {
			vm.wilayas = data.elements;
			vm.selected.wilayas = vm.wilayas.map(function (wilaya) {
				return wilaya.id;
			});
		}, function (errors) { Toast.error(errors); });

		InstitutionService.get(function (data) {
			vm.institutions = data.elements;
			vm.filteredInstitutions = angular.copy(vm.institutions);
		}, function (errors) { Toast.error(errors); });

		vm.filterInstitutions = filterInstitutions;
		vm.showInstitutions = showInstitutions;

		function showInstitutions() {
			$rootScope.$broadcast("showInstitutions", vm.filteredInstitutions);
		}

		function filterInstitutions() {
			vm.filteredInstitutions = vm.institutions.filter(function (institution) {
				return vm.selected.institutionClasses.includes(institution.class_id) &&
					vm.selected.wilayas.includes(institution.wilaya_id);
			});
			vm.filteredInstitutions = $filter('filter')(vm.filteredInstitutions, vm.query);
			return vm.filteredInstitutions;
		}
	}
})();