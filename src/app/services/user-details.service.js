(function () {
    'use strict';

    angular
        .module("services")
        .factory("UserDetails", UserDetails);

    function UserDetails($q, $rootScope, $window, $auth, $state, UserService) {
        var _identity = undefined,  // user idenity
            _authenticated = false; // boolean if account is authenticated

        // check if account async request was resolved
        var isIdentityResolved = function () {
            return angular.isDefined(_identity);
        }

        // check if account is authenticated
        var isAuthenticated = function () {
            return _authenticated;
        }

        // check if account has any matching roles
        var isAdmin = function () {
            return _authenticated && _identity.isAdmin;
        }

        // fetch account from server is not request not sent yet otherwise return the reloved one
        var identity = function () {
            var deferred = $q.defer();
            // if account was fetch return it
            if (angular.isDefined(_identity)) {
                deferred.resolve(_identity);
            } else {
                var userId = $window.localStorage['current_user'];
                if (!userId) {
                    deferred.resolve(_identity);
                } else {
                    UserService.get({ userId: userId }).$promise.then(function (data) {
                        save(data.element);
                        deferred.resolve(_identity);
                    }, function (error) {
                        logout();
                        error.status === 401 ? deferred.resolve(_identity) : deferred.reject(_identity);
                    })
                }
            }
            return deferred.promise;
        }

        var logout = function () {
            _identity = undefined;
            _authenticated = false;
            savePreviousState();
            $window.localStorage.removeItem('current_user');
            $auth.logout();
            delete $rootScope.currentUser;
            $state.go('home');
        }

        var save = function (user) {
            $rootScope.currentUser = user;
            _identity = user;
            _authenticated = true;
        }

        var savePreviousState = function () {
            $rootScope.nextState = angular.copy($state.current.name);
            $rootScope.nextStateParams = angular.copy($state.params);
        }

        return {
            identity: identity,
            isIdentityResolved: isIdentityResolved,
            isAuthenticated: isAuthenticated,
            isAdmin: isAdmin,
            logout: logout,
            save: save
        };
    }
})();