(function() {
    'use strict';

    angular
        .module("home", [])
        .config(config);

    function config($stateProvider) {
        $stateProvider.state('home.institution', {
            url: 'institution',
            controller: 'InstitutionController as vmIns',
            templateUrl: 'app/home/views/institution/institution.html'
        }).state('home.institution_detail', {
            url: 'institution/:id',
            controller: 'InstitutionDetailController as vmIns',
            templateUrl: 'app/home/views/institution-detail/institution-detail.html'
        });;
    }
})();