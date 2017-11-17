(function() {
    "use strict";

    angular
        .module("somap", [
            "ngResource",
            "ngMessages",
            "ngMap",
            "ngMaterial",
            "ngAria",
            "ngAnimate",
            'ui.router',
            'ngFileUpload',
            'pascalprecht.translate',

            //costum modules
            "home" 
        ]);
})();