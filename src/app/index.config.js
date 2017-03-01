(function(){
    "use strict";

    angular
        .module("somap")
        .config(config);

    function config($stateProvider, $locationProvider, $urlRouterProvider,$mdThemingProvider){
        // $mdThemingProvider.definePalette('amazingPaletteName', {
        //     '50': '2C303A',
        //     '100': '2C303A',
        //     '200': '2C303A',
        //     '300': '2C303A',
        //     '400': '2C303A',
        //     '500': '2C303A',
        //     '600': '2C303A',
        //     '700': '2C303A',
        //     '800': '2C303A',
        //     '900': '2C303A',
        //     'A100': '2C303A',
        //     'A200': '2C303A',
        //     'A400': '2C303A',
        //     'A700': '2C303A',
        //     'contrastDefaultColor': 'light',
        // });

        // $mdThemingProvider.theme('default')
        //     .primaryPalette('amazingPaletteName');
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