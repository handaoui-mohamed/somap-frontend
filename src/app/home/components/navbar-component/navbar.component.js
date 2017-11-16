(function () {
	'use strict';

	angular
		.module("home")
		.directive("appNavBar", appNavBar);

	function appNavBar($rootScope, $mdDialog) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'app/home/components/navbar-component/navbar.html',
			scope: {
				queryText: "=",
				showInstitutions: "&"
			},
			link: function (scope) {
				scope.toggleSideNav = function () {
					$rootScope.$broadcast('toggleSideNav')
				}


				scope.openInstitutionFormDialog = function (event) {
					$mdDialog.show({
						controller: "IntitutionFormDialogController",
						controllerAs: 'dialgVm',
						templateUrl: "app/home/dialogs/institution/institution.html",
						parent: angular.element(document.body),
						targetEvent: event,
						clickOutsideToClose: true,
						fullscreen: true
					}).then(function () {
					}, function (msg) { });
				}
			}
		}
	}
})();