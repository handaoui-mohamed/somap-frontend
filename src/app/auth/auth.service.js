(function(){
    "use strict";

    angular
        .module("auth")
        .factory("UserService",UserService);

    function UserService($resource, API_ENDPOINT){
        return $resource(API_ENDPOINT + 'users/:userId', {userId: '@id'},{
            'get':{
                method: 'GET',
                isArray: false
            },
            'update' :{
                method :'PUT'
            }
        });
    }
})();