(function () {
	'use strict';

	angular
		.module("home")
		.directive("appNavBar", appNavBar);

	function appNavBar($rootScope, $mdDialog, $window, $translate) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'app/home/components/navbar-component/navbar.html',
			scope: {
				queryText: "=",
				showInstitutions: "&"
			},
			link: function (scope) {
				scope.selectedLanguage = $window.localStorage['language'] || $translate.preferredLanguage();

				scope.toggleSideNav = function () {
					$rootScope.$broadcast('toggleSideNav');
				}

				scope.showAllInstitutions = function () {
					$rootScope.$broadcast('showAllInstitutions');
				}

				scope.hideInstitutions = function () {
					$rootScope.$broadcast('hideInstitutions');
				}

				scope.openInstitutionFormDialog = function (event) {
					$mdDialog.show({
						controller: "IntitutionFormDialogController",
						controllerAs: 'dialVm',
						templateUrl: "app/home/dialogs/institution/institution.html",
						parent: angular.element(document.body),
						targetEvent: event,
						clickOutsideToClose: true,
						fullscreen: true
					}).then(function () {
					}, function () { });
				}

				scope.changeLanguage = function (lang) {
					if (['fr', 'ar'].includes(lang)) {
						$window.localStorage['language'] = lang;
						scope.selectedLanguage = lang;
						$translate.use(lang);
					}
				}
			}
		}
	}
})();