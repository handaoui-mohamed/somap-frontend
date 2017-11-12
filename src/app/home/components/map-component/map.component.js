(function() {
    'use strict';

    angular
        .module("home")
        .directive("soMap", soMap);

    function soMap() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/home/components/map-component/map.html',
            scope: {
                selectedMarker: '=',
                institutions: '=',
                institutionClasses: '=',
                atHome: "=",
            },
            link: function(scope, element, attrs) {
                var goolgeMap;
                scope.$on('mapInitialized', function(event, map) {
                    goolgeMap = map;
                    destroyOnMapInitilized();
                });

                function destroyOnMapInitilized(){
                    scope.$on('mapInitialized', function(event, map) {
                        return;
                    });
                }

 
                scope.onMarkerClicked = onMarkerClicked;
                scope.onMapClicked = onMapClicked;

                function onMarkerClicked(evt, marker) {
                    goolgeMap.showInfoWindow(evt, 'myInfoWindow', goolgeMap.markers[marker.id]);
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