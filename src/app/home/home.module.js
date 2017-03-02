(function(){
    'use strict';

    angular
        .module("home",[])
        .config(config);

    function config($stateProvider){
        $stateProvider.state('home.institution', {
            url: 'institution/:id',
            controller: 'InstitutionController as vmIns',
            templateUrl: 'app/home/views/institution/institution.html'
        });
    }
})();