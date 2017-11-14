(function () {
	'use strict';

	angular
		.module("home")
		.directive("soMap", soMap);

	function soMap(NgMap, $timeout, $log) {
		return {
			restrict: 'E',
			replace: false,
			templateUrl: 'app/home/components/map-component/map.html',
			scope: {
				institutions: '=',
				institutionClasses: '=',
				atHome: "="
			},
			link: function (scope) {
				var googleMap;
				NgMap.getMap('main-map').then(function (map) {
					googleMap = map;
				}).catch(function (error) { $log(error) });

				scope.showInfoWindow = showInfoWindow;
				scope.hideInfoWindow = hideInfoWindow;

				function showInfoWindow(event, marker, clickedInMap) {
					var position = clickedInMap ? googleMap.markers[marker.id].getPosition() : marker.getPosition();
					googleMap.setCenter(new google.maps.LatLng(position.lng(), position.lat()));
					googleMap.setZoom(13);
					scope.selectedInstitution = scope.institutions[marker.id];
					googleMap.showInfoWindow(event, 'myInfoWindow', googleMap.markers[marker.id]);
				}

				function hideInfoWindow(event) {
					if (scope.selectedInstitution) {
						googleMap.hideInfoWindow(event, 'myInfoWindow', scope.selectedInstitution);
						scope.selectedInstitution = null;
						googleMap.setCenter(new google.maps.LatLng(32, 2));
						googleMap.setZoom(6);
					}
				}

				scope.$on('showInstitutionMarker', function (event, markerId) {
					var marker = googleMap.markers[markerId];
					marker.setVisible(true);
					showInfoWindow(event, marker);
				});

				scope.$on('hideInstitutionMarker', function (event, markerId) {
					var marker = googleMap.markers[markerId];
					marker.setVisible(false);
					hideInfoWindow(event);
				});

				scope.$on('mapResized', function () {
					$timeout(function () {
						google.maps.event.trigger(googleMap, "resize");
					}, 300);
				});

				scope.$on('showInstitutions', function () {
					googleMap.markers.forEach(function (marker, index) {
						marker.setVisible(true);
						institutions[index].selected = true;
					});
				});

				scope.$on('hideInstitutions', function () {
					googleMap.markers.forEach(function (marker, index) {
						institutions[index].selected = false;
						marker.setVisible(false);
					});
				});
			}
		}
	}
})();