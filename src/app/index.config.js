(function(){
    "use strict";

    angular
        .module("somap")
        .config(config);

    function config($stateProvider, $locationProvider, $urlRouterProvider){
        $locationProvider.html5Mode(true).hashPrefix('!');
        $stateProvider.state('home', {
            url: '/',
            views: {
                'main@': {
                    controller: 'HomeController as vm',
                    templateUrl: 'app/home/home.html'
                }
            }
        });
        $urlRouterProvider.otherwise('/');// we can use 404 page

        // angular-translate configuration
        // inject these: $translateProvider, $translatePartialLoaderProvider
        // $translateProvider.useLoader('$translatePartialLoader', {
        //     urlTemplate: '{part}/i18n/{lang}.json'
        // });

        // $translateProvider.preferredLanguage('ar');
        // // $translateProvider.useSanitizeValueStrategy('sanitize');
        // $translatePartialLoaderProvider.addPart('app');
    }
})();