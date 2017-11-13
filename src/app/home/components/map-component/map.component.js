(function () {
	'use strict';

	angular
		.module("home")
		.directive("soMap", soMap);

	function soMap() {
		return {
			restrict: 'E',
			replace: false,
			templateUrl: 'app/home/components/map-component/map.html',
			scope: {
				institutions: '=',
				institutionClasses: '=',
				atHome: "=",
			},
			link: function (scope, element, attrs) {
				var googleMap;
				scope.$on('mapInitialized', function (event, map) {
					googleMap = map;
					destroyOnMapInitilized();
				});

				function destroyOnMapInitilized() {
					scope.$on('mapInitialized', function (event, map) {
						return;
					});
				}


				scope.showInfoWindow = showInfoWindow;
				scope.hideInfoWindow = hideInfoWindow;

				function showInfoWindow(event, marker) {
					var position = marker.getPosition();
					googleMap.setCenter(new google.maps.LatLng(position.lng(), position.lat()));
					googleMap.setZoom(13);
					scope.selectedInstitution = scope.institutions[marker.id];
					googleMap.showInfoWindow(event, 'myInfoWindow', googleMap.markers[marker.id]);
				}

				function hideInfoWindow(event) {
					// hide the infowindow if it is visible
					if (scope.selectedInstitution != null) {
						googleMap.hideInfoWindow(event, 'myInfoWindow', scope.selectedInstitution);
						scope.selectedInstitution = null;
						googleMap.setCenter(new google.maps.LatLng(32, 2));
						googleMap.setZoom(6);
					}
				}

				scope.$on('showInstitutionMarker', function (event, markerId) {
					var marker = googleMap.markers[markerId];
					marker.setVisible(true);
					onMarkerClicked(event, marker);
				});

				scope.$on('hideInstitutionMarker', function (event, markerId) {
					var marker = googleMap.markers[markerId];
					marker.setVisible(false);
					onMapClicked(event);
				});
			}
		}
	}
})();