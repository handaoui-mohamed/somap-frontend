(function () {
    'use strict';

    angular
        .module("admin")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, $auth, $mdDialog, $window, $state, $mdSidenav) {
        var vm = this;

        vm.toggleSideNav = toggleSideNav;
        vm.openProfileDialog = openProfileDialog;
        vm.logout = logout;

        function toggleSideNav() {
            $mdSidenav("left").toggle();
        }

        function logout() {
            $auth.logout();
            $window.localStorage.removeItem('current_user');
            delete $rootScope.currentUser;
            $state.go('home');
        }

        function openProfileDialog(event) {
            $mdDialog.show({
                controller: "UserDialogController",
                controllerAs: 'dialVm',
                templateUrl: "app/admin/dialogs/user/user.html",
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true,
                escapeToClose: true,
                fullscreen: true,
                locals: {
                    User: $rootScope.currentUser
                }
            }).then(function (data) {
                $rootScope.currentUser = data.user;
            }, function () { });
        }
    }
})();