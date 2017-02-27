(function(){
    'use strict';
    
    angular
        .module("auth")
        .controller("AuthController",AuthController);

    function AuthController(UserService, $auth, $window, $state, $rootScope,Toast){
        var vm = this;
        vm.loginUser = loginUser;
        vm.registerUser = registerUser;

        function registerUser(){
            vm.disabledRegistration = true;
            UserService.save(vm.user,function(){
                Toast.message("registered")
                vm.loginUser();
            }, function(error){
                Toast.error(error);
                vm.disabledRegistration = false;
            });
        }
 
        function loginUser(){
            vm.disabledLogin = true;
            $auth.login(vm.registered_user).then(function (response) {
                if (!response.data.errors) {
                    Toast.message("created")
                    $window.localStorage['current_user'] = response.data.user.id;
                    $rootScope.current_user = response.data.user;
                    $state.go('home');
                }else{
                    Toast.error(response.data.errors)
                }
                vm.disabledLogin = false;
            }, function (error) {
                Toast.error(error)
                vm.disabledLogin = false;
            });
        }
    }
})();