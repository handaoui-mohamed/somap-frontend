(function () {
    'use strict';

    angular
        .module("admin")
        .directive('adminRequired', adminRequired);

    function adminRequired(UserDetails) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                UserDetails.identity().then(function (user) {
                    if (!user || (user && !user.isAdmin)) element.remove();
                });
            }
        }
    }
})();