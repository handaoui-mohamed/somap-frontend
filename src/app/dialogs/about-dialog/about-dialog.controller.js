(function(){
    'use strict';

    angular
        .module("dialogs")
        .controller("AboutDialogController",AboutDialogController);

    function AboutDialogController($mdDialog){
        var vm = this;

        vm.close = close;

        function close(){
            $mdDialog.hide();
        }
    }
})();