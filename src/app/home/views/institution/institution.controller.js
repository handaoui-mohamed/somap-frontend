(function(){
    "use strict";

    angular
        .module("home")
        .controller("InstitutionController",InstitutionController);

    function InstitutionController(InstitutionService, WilayaService, InstitutionClassService, $stateParams, Toast){
        var vm = this;
        vm.institution = {};
        vm.wilayas = [];
        vm.institutionClasses = [];
        vm.selectedWilaya = [];

        InstitutionService.get({institutionId: $stateParams.id}, function(data){
            vm.institution = data.elements;
            console.log(vm.institution);
        }, function(errors){
            Toast.errors(errors);
        });

        WilayaService.get(function(data){
            vm.wilayas = data.elements;
        },function(errors){
            Toast.error(errors);
        });

        InstitutionClassService.get(function(data){
            vm.institutionClasses = data.elements;
        },function(errors){
            Toast.error(errors);
        });


        vm.loadCommunes = loadCommunes;
        vm.addInstitution = addInstitution;

        function loadCommunes(){
            if (vm.institution && vm.institution.wilayaId){
                return WilayaService.get({wilayaId: vm.institution.wilayaId}, function(data){
                    vm.selectedWilaya = data.element;
                });
            }
        }

        function addInstitution(){
            InstitutionService.save(vm.institution, function(data){
                Toast.message("L'institution en attente de validation, On vous remercie.");
            }, function(errors){
                Toast.error(errors);
            });
        }
    }
})();