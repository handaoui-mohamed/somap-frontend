(function(){
    "use strict";
    
    angular
        .module("somap",[
            "ngResource",
            "satellizer",
            "ngMap",
            "ngMaterial",
            "ngAria",
            "ngAnimate",
            'ui.router',

            //costum modules
            "home"
        ]);
})();