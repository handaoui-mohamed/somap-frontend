(function () {
	'use strict';

	angular
		.module("home")
		.directive("institutionCard", institutionCard);

	function institutionCard() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'app/home/components/institution-component/institution.html',
			scope: {
				appMap: '=',
				institution: '=',
				institutionClass: '=',
				wilayas: "="
			},
			link: function (scope, element, attrs) {
				scope.map = scope.appMap;
				scope.selected = false;

				scope.showOnMap = function (event, institution) {
					var marker = scope.map.markers[institution.id];
					if (!scope.map.markers[institution.id].getVisible()) {
						scope.selected = true;
						scope.map.markers[institution.id].setVisible(true);
						var position = marker.getPosition();
						scope.map.setCenter(new google.maps.LatLng(position.lng(), position.lat()));
						scope.map.setZoom(13);
						scope.map.showInfoWindow(event, 'myInfoWindow', marker);
					} else {
						scope.selected = false;
						scope.map.markers[institution.id].setVisible(false);
						scope.map.hideInfoWindow(event, 'myInfoWindow', marker);
						scope.map.setCenter(new google.maps.LatLng(32, 2));
						scope.map.setZoom(6);
					}
				};
			}
		}
	}
})();