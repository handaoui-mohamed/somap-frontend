(function() {
    'use strict';

    angular
        .module("home")
        .directive("googleMaps", googleMaps);

    function googleMaps() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/home/components/map-component/map-component.html',
            scope: {
                selectedMarker: '=',
                institutions: '=',
                institutionClasses: '='
            },
            link: function(scope, element, attrs) {
                var goolgeMap;
                scope.$on('mapInitialized', function(event, map) {
                    goolgeMap = map;
                });

                scope.onMarkerClicked = onMarkerClicked;
                scope.onMapClicked = onMapClicked;

                function onMarkerClicked(evt) {
                    scope.selectedMarker = scope.institutions[this.id];
                    goolgeMap.showInfoWindow(evt, 'myInfoWindow', this);
                }

                function onMapClicked(event) {
                    // hide the infowindow if it is visible
                    if (scope.selectedMarker != null) {
                        goolgeMap.hideInfoWindow(event, 'myInfoWindow', scope.selectedMarker);
                        scope.selectedMarker = null;
                        goolgeMap.setCenter(new google.maps.LatLng(32, 2));
                        goolgeMap.setZoom(6);
                    }
                }
            }
        }
    }


})();