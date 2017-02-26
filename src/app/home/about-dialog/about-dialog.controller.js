(function(){
    'use strict';

    angular
        .module("somap")
        .controller("AboutDialogController",AboutDialogController);

    function AboutDialogController($mdDialog){
        var vm = this;

        vm.close = close;

        function close(){
            $mdDialog.hide();
        }
    }
})();