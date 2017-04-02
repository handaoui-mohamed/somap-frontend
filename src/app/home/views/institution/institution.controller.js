(function() {
    "use strict";

    angular
        .module("home")
        .controller("InstitutionController", InstitutionController);

    function InstitutionController($scope, InstitutionService, WilayaService, InstitutionClassService, Toast) {
        var vm = this;
        vm.institution = {};
        vm.wilayas = [];
        vm.institutionClasses = [];
        vm.selectedWilaya = [];

        WilayaService.get(function(data) {
            vm.wilayas = data.elements;
        }, function(errors) {
            Toast.error(errors);
        });

        InstitutionClassService.get(function(data) {
            vm.institutionClasses = data.elements;
        }, function(errors) {
            Toast.error(errors);
        });


        vm.loadCommunes = loadCommunes;
        vm.addInstitution = addInstitution;
        vm.getCoordinates = getCoordinates;

        function loadCommunes() {
            if (vm.institution && vm.institution.wilaya_id) {
                return WilayaService.get({ wilayaId: vm.institution.wilaya_id }, function(data) {
                    vm.selectedWilaya = data.element;
                    console.log(vm.selectedWilaya);
                });
            }
        }

        function addInstitution() {
            InstitutionService.save(vm.institution, function(data) {
                Toast.message("L'institution en attente de validation, On vous remercie.");
            }, function(errors) {
                Toast.error(errors);
            });
        }

        // TODO Must Improve this function
        function getCoordinates() {
            if (!vm.geocoder) vm.geocoder = new google.maps.Geocoder();
            vm.geocoder.geocode({
                    'address': vm.wilayas[vm.institution.wilaya_id].name + ", " +
                        vm.selectedWilaya.communes.find(function(commune) { return commune.id === vm.institution.commune_id }).name
                },
                function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var location = results[0].geometry.location;
                        vm.institution.latitude = location.lat();
                        vm.institution.longitude = location.lng();
                        addInstitution()
                    } else {
                        vm.geocoder.geocode({ 'address': vm.wilayas[vm.institution.wilaya_id].name },
                            function(results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                    var location = results[0].geometry.location;
                                    vm.institution.latitude = location.lat();
                                    vm.institution.longitude = location.lng();
                                    addInstitution()
                                } else {
                                    Toast.error("Cette adresse est introuvable!");
                                }
                            });
                    }
                });
        }
    }
})();