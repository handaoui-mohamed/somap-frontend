(function() {
    "use strict";

    angular
        .module("home")
        .controller("HomeController", HomeController);

    function HomeController($scope, $mdDialog, WilayaService, InstitutionClassService,
        InstitutionService, SourceBlack, SourceBlue, Toast, $mdSidenav) {
        var vm = this;

        vm.sourceBlack = SourceBlack;
        vm.sourceBlue = SourceBlue
        vm.institutions = [];
        vm.institutionClasses = [];
        vm.selectedInstitutions = [];
        vm.wilayas = [];
        vm.selectedWilayas = [];
        vm.selectedMarkers = [];
        vm.selectedInstitutionsId = [];
        vm.selectedWilayasId = [];
        vm.query = "";
        vm.showMap = true;

        $scope.$on('mapInitialized', function(event, map) {
            vm.map = map;
        });

        // fetch Data from server
        InstitutionClassService.get(function(data) {
            vm.institutionClasses = data.elements;
            vm.selectedInstitutions = new Array(vm.institutionClasses.length).fill(true);
            vm.selectedInstitutionsId = vm.institutionClasses.map(function(institutionClass) {
                return institutionClass.id;
            });
        }, function(errors) {
            Toast.error(errors);
        });

        WilayaService.get(function(data) {
            vm.wilayas = data.elements;
            vm.selectedWilayas = new Array(vm.wilayas.length).fill(true);
            vm.selectedWilayasId = vm.wilayas.map(function(institutionClass) {
                return institutionClass.id;
            });
        }, function(errors) {
            Toast.error(errors);
        });

        InstitutionService.get(function(data) {
            vm.institutions = data.elements;
        }, function(errors) {
            Toast.error(errors);
        });

        vm.selectAll = selectAll;
        vm.filterMarkers = filterMarkers;
        vm.filterWilayas = filterWilayas;
        vm.showAboutDialog = showAboutDialog;
        vm.showSelectedInstitutions = showSelectedInstitutions;
        vm.showSelectedWilayas = showSelectedWilayas;
        vm.toggleSideNav = toggleSideNav;

        function toggleSideNav() {
            $mdSidenav('left').toggle();
        }

        function showSelectedInstitutions() {
            vm.selectedInstitutions.forEach(function(institutionClass, index) {
                vm.selectedInstitutions[index] = vm.selectedInstitutionsId.includes(index + 1);
            });
        }

        function showSelectedWilayas() {
            vm.selectedWilayas.forEach(function(wilaya, index) {
                vm.selectedWilayas[index] = vm.selectedWilayasId.includes(index + 1);
            });
        }

        //Functions Implementation 
        function filterMarkers() {
            return function(marker) {
                return vm.selectedInstitutions[(marker.class_id) - 1];
            };
        }

        function filterWilayas() {
            return function(marker) {
                return vm.selectedWilayas[(marker.wilaya_id) - 1];
            };
        }

        function selectAll(value) {
            for (var i = 0; i < vm.selectedWilayas.length; i++) {
                vm.selectedWilayas[i] = value;
            }
        }

        // Dialogs Section
        function showAboutDialog(event) {
            $mdDialog.show({
                controller: "AboutDialogController",
                controllerAs: "aboutVm",
                templateUrl: 'app/home/dialogs/about-dialog/about-dialog.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true,
                escapeToClose: true
            });
        }
    }
})();