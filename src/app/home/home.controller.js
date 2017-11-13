(function () {
	"use strict";

	angular
		.module("home")
		.controller("HomeController", HomeController);

	function HomeController($rootScope, $scope, $mdSidenav, $filter, Toast, WilayaService, InstitutionClassService,
		InstitutionService) {

		var vm = this;

		vm.institutions = [];
		vm.institutionClasses = [];
		vm.selectedInstitutions = [];
		vm.wilayas = [];
		vm.selectedWilayas = [];
		vm.selectedInstitutionsId = [];
		vm.selectedWilayasId = [];
		vm.filteredInstitutions = [];
		vm.query = "";
		vm.atHome = true;
		vm.limit = 20;
		vm.showAll = showAll;
		vm.openned = true;

		// fetch Data from server
		InstitutionClassService.get(function (data) {
			vm.institutionClasses = data.elements;
			vm.selectedInstitutions = new Array(vm.institutionClasses.length).fill(true);
			vm.selectedInstitutionsId = vm.institutionClasses.map(function (institutionClass) {
				return institutionClass.id;
			});
		}, function (errors) {
			Toast.error(errors);
		});

		WilayaService.get(function (data) {
			vm.wilayas = data.elements;
			vm.selectedWilayas = new Array(vm.wilayas.length).fill(true);
			vm.selectedWilayasId = vm.wilayas.map(function (institutionClass) {
				return institutionClass.id;
			});
		}, function (errors) {
			Toast.error(errors);
		});

		InstitutionService.get(function (data) {
			vm.institutions = data.elements;
			vm.filteredInstitutions = vm.institutions;
		}, function (errors) {
			Toast.error(errors);
		});

		vm.selectAll = selectAll;
		vm.filterInstitutionClasses = filterInstitutionClasses;
		vm.filterWilayas = filterWilayas;
		vm.filterInstitutions = filterInstitutions;


		function filterInstitutionClasses() {
			vm.selectedInstitutions.forEach(function (institutionClass, index) {
				vm.selectedInstitutions[index] = vm.selectedInstitutionsId.includes(index + 1);
			});
			filterInstitutions();
		}

		function filterWilayas() {
			vm.selectedWilayas.forEach(function (wilaya, index) {
				vm.selectedWilayas[index] = vm.selectedWilayasId.includes(index + 1);
			});
			filterInstitutions();
		}


		function selectAll(value) {
			if (value) {
				vm.selectedWilayasId = vm.wilayas.map(function (institutionClass) {
					return institutionClass.id;
				});
			} else {
				vm.selectedWilayasId = [];
			}
			for (var i = 0; i < vm.selectedWilayas.length; i++) {
				vm.selectedWilayas[i] = value;
			}
			filterInstitutions();
		}

		function showAll() {
			vm.allShowed = !vm.allShowed;
			vm.filteredInstitutions.forEach(function (institution) {
				vm.map.markers[institution.id].setVisible(vm.allShowed);
			})
		}

		function filterInstitutions() {
			vm.filteredInstitutions = vm.institutions.filter(function (institution) {
				return vm.selectedInstitutions[(institution.class_id) - 1] &&
					vm.selectedWilayas[(institution.wilaya_id) - 1];
			});
			vm.filteredInstitutions = $filter('filter')(vm.filteredInstitutions, vm.query);
			return vm.filteredInstitutions;
		}
	}
})();