(function(){
    "use strict";

    angular
        .module("home")
        .factory("InstitutionService",InstitutionService)
        .factory("InstitutionClassService",InstitutionClassService)
        .factory("WilayaService",WilayaService);

    function InstitutionService($resource, API_ENDPOINT){
        return $resource(API_ENDPOINT + 'institutions/:institutionId', {institutionId: '@id'},{
            'get':{
                method: 'GET',
                isArray: false
            },
            'update' :{
                method :'PUT'
            }
        });
    }

    function InstitutionClassService($resource, API_ENDPOINT){
        return $resource(API_ENDPOINT + 'institution_classes/:institutionClassId', {institutionClassId: '@id'},{
            'get':{
                method: 'GET',
                isArray: false
            },
            'update' :{
                method :'PUT'
            }
        });
    }

    function WilayaService($resource, API_ENDPOINT){
        return $resource(API_ENDPOINT + 'wilayas/:wilayaId', {wilayaId: '@id'},{
            'get':{
                method: 'GET',
                isArray: false
            }
        });
    }
})();