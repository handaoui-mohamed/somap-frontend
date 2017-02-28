(function(){
    'use strict';

    angular
        .module("auth",['satellizer'])
        .config(config);

    function config($stateProvider, $authProvider){
        $authProvider.loginUrl = 'http://localhost:5000/api/login';
        $authProvider.tokenPrefix = '';
        $authProvider.authHeader = 'Authorization';
        $authProvider.authToken = '';

        $authProvider.facebook({
            clientId: '1187667897997263'
        });

        $authProvider.google({
            clientId: 'Google Client ID'
        });
        
        $stateProvider.state('auth', {
            url: '/auth',
            views: {
                'main@': {
                    controller: 'AuthController as vm',
                    templateUrl: 'app/auth/auth.html'
                }
            }
        });
    }
})();