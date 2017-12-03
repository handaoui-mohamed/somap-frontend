(function () {
    "use strict";

    angular
        .module("somap")
        .run(run);

    function run(UserDetails) {
        UserDetails.identity();
    }
})();