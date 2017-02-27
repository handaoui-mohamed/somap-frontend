(function(){
    "use strict";

    angular
        .module("somap")
        .service("Toast",Toast)

    function Toast($mdToast){
        var toastObject = {}
        var toast = $mdToast.simple()
            .action('Fermer')
            .highlightAction(true)
            .hideDelay(5000)
            .position("bottom left");

        toastObject.error = function(errors){
            switch (errors.status){
                case 400:
                    for (var fieldName in errors.data['form_errors']) {
                        if (errors.data['form_errors'].hasOwnProperty(fieldName)) {
                            toast.textContent(errors.data['form_errors'][fieldName][0]);
                            $mdToast.show(toast);
                            break;
                        }
                    }
                break;
                case 404:
                    toast.textContent("Le contenu que vous avez demandé n'existe pas");
                    $mdToast.show(toast);
                break;
                case 401:
                    toast.textContent("Vous n'avez pas le droit d'effectuer cette opération.");
                    $mdToast.show(toast);
                break;
                default:
                    toast.textContent("Service inaccessible pour le moment.");
                    $mdToast.show(toast);
                break;
            }
        }

        toastObject.message = function(message){
            toast.textContent(message);
            $mdToast.show(toast);
        }

        return toastObject;
    }
})();