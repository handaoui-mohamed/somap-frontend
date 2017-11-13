(function () {
	'use strict';

	angular
		.module("home")
		.directive("appNavBar", appNavBar);

	function appNavBar($rootScope) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'app/home/components/navbar-component/navbar.html',
			scope: {
			},
			link: function (scope) {
				scope.toggleSideNav = function () {
					$rootScope.$broadcast('toggleSideNav')
				}
			}
		}
	}
})();