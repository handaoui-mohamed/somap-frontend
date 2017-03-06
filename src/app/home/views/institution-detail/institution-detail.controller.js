(function() {
    'use strict';

    angular
        .module("home")
        .controller("InstitutionDetailController", InstitutionDetailController);

    function InstitutionDetailController(InstitutionService, $stateParams, Toast) {
        var vm = this;

        InstitutionService.get({ institutionId: $stateParams.id }, function(data) {
            vm.institution = data.element;
        }, function(errors) {
            Toast.error(errors);
        });
    }
})();