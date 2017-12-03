(function () {
    "use strict";

    angular
        .module("somap")
        .run(run);

    function run($rootScope, $state, UserDetails) {
        UserDetails.identity();

        $rootScope.$on('$stateChangeError', function () {
            $state.go('home');
        });
    }
})();