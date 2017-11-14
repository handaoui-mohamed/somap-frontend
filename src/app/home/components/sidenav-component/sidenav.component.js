(function () {
	'use strict';

	angular
		.module("home")
		.directive("appSideNav", appSideNav);

	function appSideNav($rootScope, $mdSidenav, $log) {
		return {
			restrict: 'E',
			replace: false,
			transclude: true,
			templateUrl: 'app/home/components/sidenav-component/sidenav.html',
			scope: {
				institutionClasses: "=",
				wilayas: "=",
				selected: "=selectedItems",
				filterInstitutions: "&"
			},
			link: function (scope) {
				scope.openned = true;
				scope.$on('toggleSideNav', function () {
					if (!scope.openned)
						$mdSidenav("left").close();
					scope.openned = !scope.openned;
					$rootScope.$broadcast('mapResized');
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