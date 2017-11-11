(function() {
    "use strict";

    angular
        .module("home")
        .controller("HomeController", HomeController);

    function HomeController($scope, $mdDialog, WilayaService, InstitutionClassService,
        InstitutionService, SourceBlack, SourceBlue, Toast, $mdSidenav, $filter) {
        var vm = this;

        vm.sourceBlack = SourceBlack;
        vm.sourceBlue = SourceBlue;
        vm.institutions = [];
        vm.institutionClasses = [];
        vm.selectedInstitutions = [];
        vm.wilayas = [];
        vm.selectedWilayas = [];
        vm.selectedMarkers = [];
        vm.selectedInstitutionsId = [];
        vm.selectedWilayasId = [];
        vm.filteredInstitutions = [];
        vm.query = "";
        vm.atHome = true;
        vm.limit = 20;
        vm.showAll = showAll;

        $scope.$on('mapInitialized', function(event, map) {
            vm.map = map;
            destroyOnMapInitilized();
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
            vm.filteredInstitutions = vm.institutions.slice(0, vm.limit);
        }, function(errors) {
            Toast.error(errors);
        });

        vm.selectAll = selectAll;
        vm.showAboutDialog = showAboutDialog;
        vm.showSelectedInstitutions = showSelectedInstitutions;
        vm.showSelectedWilayas = showSelectedWilayas;
        vm.toggleSideNav = toggleSideNav;
        vm.filterInstitutions = filterInstitutions;

        function destroyOnMapInitilized(){
            $scope.$on('mapInitialized', function(event, map) {
                return;
            });
        }

        function toggleSideNav() {
            $mdSidenav('left').toggle();
        }

        function showSelectedInstitutions() {
            vm.selectedInstitutions.forEach(function(institutionClass, index) {
                vm.selectedInstitutions[index] = vm.selectedInstitutionsId.includes(index + 1);
            });
            filterInstitutions();
        }

        function showSelectedWilayas() {
            vm.selectedWilayas.forEach(function(wilaya, index) {
                vm.selectedWilayas[index] = vm.selectedWilayasId.includes(index + 1);
            });
            filterInstitutions();
        }


        function selectAll(value) {
            if(value){
                vm.selectedWilayasId = vm.wilayas.map(function(institutionClass) {
                    return institutionClass.id;
                });
            }else{
                vm.selectedWilayasId = [];
            }
            for (var i = 0; i < vm.selectedWilayas.length; i++) {
                vm.selectedWilayas[i] = value;
            }
            filterInstitutions();
        }

        function showAll(){
            vm.allShowed = !vm.allShowed;
            vm.filteredInstitutions.forEach(function(institution){
                vm.map.markers[institution.id].setVisible(vm.allShowed);
            })
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

        function filterInstitutions(added){ 
            if (!added) {vm.limit = 20;}
            vm.filteredInstitutions = $filter('filter')(vm.institutions, function(marker) {
                return vm.selectedInstitutions[(marker.class_id) - 1];
            });
            vm.filteredInstitutions = $filter('filter')(vm.filteredInstitutions, function(marker) {
                return vm.selectedWilayas[(marker.wilaya_id) - 1];
            });
            if (vm.query !== ""){
                vm.filteredInstitutions = $filter('filter')(vm.filteredInstitutions, vm.query);
            }
            vm.filteredInstitutions = $filter('limitTo')(vm.filteredInstitutions, vm.limit);
            return vm.filterInstitutions;
        }
    }
})();