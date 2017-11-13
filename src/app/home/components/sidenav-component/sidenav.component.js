(function () {
	'use strict';

	angular
		.module("home")
		.directive("appSideNav", appSideNav);

	function appSideNav($rootScope, $mdSidenav) {
		return {
			restrict: 'E',
			replace: false,
			transclude: true,
			templateUrl: 'app/home/components/sidenav-component/sidenav.html',
			scope: {
				institutionClasses: "=",
				wilayas: "=",
				filterWilayas: "&",
				filterInstitutionClasses: "&"
			},
			link: function (scope) {
				scope.openned = true;
				scope.$on('toggleSideNav', function () {
					if (!scope.openned)
						$mdSidenav("left").close();
					scope.openned = !scope.openned;
					$rootScope.$broadcast('mapResized');
				});
			}
		}
	}
})();