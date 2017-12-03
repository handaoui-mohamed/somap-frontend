(function () {
	'use strict';

	angular
		.module("components")
		.directive("mainMap", mainMap);

	function mainMap(NgMap, $timeout, $interval, $log, $mdDialog) {
		return {
			restrict: 'E',
			replace: false,
			templateUrl: 'app/components/map-component/map.html',
			scope: {
				institutions: '=',
				institutionClasses: '='
			},
			link: function (scope) {
				var googleMap;
				NgMap.getMap('main-map').then(function (map) {
					googleMap = map;
					$interval(function () {
						$log.info("resized")
						google.maps.event.trigger(googleMap, 'resize');
					}, 1000);
				}).catch(function (error) { $log.info(error) });

				scope.icons = [
					"assets/images/blue-dot.png",
					"assets/images/red-dot.png",
					"assets/images/green-dot.png",
					"assets/images/yellow-dot.png",
					"assets/images/purple-dot.png"
				]

				scope.showInfoWindow = showInfoWindow;
				scope.hideInfoWindow = hideInfoWindow;
				scope.openInstitutionDetailsDialog = openInstitutionDetailsDialog;

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


				function openInstitutionDetailsDialog(event, institution) {
					$mdDialog.show({
						controller: "InstitutionDetailsDialogController",
						controllerAs: 'dialVm',
						templateUrl: "app/dialogs/institution-detail/institution-detail.html",
						parent: angular.element(document.body),
						targetEvent: event,
						clickOutsideToClose: true,
						fullscreen: true,
						locals: {
							Institution: institution
						}
					}).then(function () {
					}, function () { });
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

				scope.$on('showAllInstitutions', function () {
					scope.institutions.forEach(function (institution) {
						googleMap.markers[institution.id].setVisible(true);
					})
				});

				scope.$on('showInstitutions', function (event, institutions) {
					institutions.forEach(function (institution) {
						googleMap.markers[institution.id].setVisible(true);
					})
				});

				scope.$on('hideInstitutions', function () {
					scope.institutions.forEach(function (institution) {
						googleMap.markers[institution.id].setVisible(false);
						scope.institutions[getInstitutionIndex(institution.id)].selected = false;
					});
				});

				function getInstitutionIndex(institutionId) {
					return scope.institutions.findIndex(function (institution) {
						return institution.id === institutionId;
					}) || 0;
				}
			}
		}
	}
})();