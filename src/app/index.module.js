(function() {
    "use strict";

    angular
        .module("somap", [
            "ngResource",
            "satellizer",
            "ngMessages",
            "ngMap",
            "ngMaterial",
            "ngAria",
            "ngAnimate",
            'ui.router',

            //costum modules
            "home",
            "auth"
        ]);
})();