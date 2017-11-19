(function () {
	'use strict';

	angular
		.module("home")
		.directive("appSideNav", appSideNav);

	function appSideNav($rootScope, $window, $mdSidenav, $log) {
		return {
			restrict: 'E',
			replace: false,
			transclude: true,
			templateUrl: 'app/components/sidenav-component/sidenav.html',
			scope: {
				institutionClasses: "=",
				wilayas: "=",
				selected: "=selectedItems",
				filterInstitutions: "&"
			},
			link: function (scope) {
				var windowWidth = $window.innerWidth;
				var MOBILE_WIDTH = 800;
				scope.openned = (windowWidth > MOBILE_WIDTH);

				angular.element($window).bind('resize', function () {
					windowWidth = $window.innerWidth;
				});

				scope.$on('toggleSideNav', function () {
					if (windowWidth > MOBILE_WIDTH) {
						if (!scope.openned)
							$mdSidenav("left").close();
						scope.openned = !scope.openned;
					} else {
						scope.openned = false;
						$mdSidenav("left").toggle()
					}
				});

				scope.selectWilayas = function (value) {
					scope.selected.wilayas = !value ? [] : scope.wilayas.map(function (wilaya) {
						return wilaya.id;
					});
					$log.info('wilayas', scope.selected.wilayas);
					scope.filterInstitutions();
				}
			}
		}
	}
})();