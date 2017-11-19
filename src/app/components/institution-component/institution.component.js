(function () {
	'use strict';

	angular
		.module("home")
		.directive("institutionCard", institutionCard);

	function institutionCard($rootScope) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'app/components/institution-component/institution.html',
			scope: {
				institution: '=',
				institutionClass: '=',
				selected: "="
			},
			link: function (scope) {
				scope.toggle = function (event, markerId) {
					scope.selected = !scope.selected;
					$rootScope.$broadcast(scope.selected ? 'showInstitutionMarker' : 'hideInstitutionMarker', markerId);
				};
			}
		}
	}
})();