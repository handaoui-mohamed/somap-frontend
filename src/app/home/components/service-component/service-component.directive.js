(function(){
    'use strict';

    angular
        .module("home")
        .directive("serviceCard",serviceCard);

    function serviceCard(SourceBlack, SourceBlue){
        return{ 
            restrict: 'E',
            replace: true,
            templateUrl: 'app/home/components/service-component/service-component.html',
            scope: {
                selectedMarker: '=',
                selectedMarkers:"=",
                appMap: '=',
                institution: '=',
                institutionClasses: '=',
                wilayas: "="
            },
            link:function(scope, element, attrs){
                scope.map = scope.appMap;
                scope.sourceBlack = SourceBlack;
                scope.hoverIn =  function(institution){
                    if ($('#contact'+institution.id).css("display") ===  "none")
                    $('#button'+institution.id).css("backgroundColor","#F2F2F2");
                };

                scope.hoverOut =  function(institution){
                    if ($('#contact'+institution.id).css("display") ===  "none")
                        $('#button'+institution.id).css("backgroundColor","WHITE");
                };

                scope.showOnMap = function (event, institution){
                    var marker = scope.map.markers[institution.id];
                    var lng,lat,prevMarker;
                    scope.selectedMarker = institution;
                    if (scope.map.markers[institution.id].getVisible() == false)
                    {

                        scope.map.markers[institution.id].setVisible(true);
                        $('#button'+institution.id).css("backgroundColor","#F2F2F2");
                        $('#image'+institution.id).attr("src",SourceBlue);
                        $('#contact'+institution.id).css("display","block");
                        $('#meaning'+institution.id).css("display","block");

                        lng = marker.getPosition().lng() ;
                        lat = marker.getPosition().lat() ;
                        scope.map.setCenter(new google.maps.LatLng(lat + 0.01 , lng - 0.03) );
                        scope.map.setZoom(13);
                        scope.map.showInfoWindow(event, 'myInfoWindow', marker);

                        if (scope.selectedMarkers.indexOf(institution.id)===-1)
                        {
                            scope.selectedMarkers.push(institution.id);
                        }
                    }
                    else
                    {
                        scope.map.markers[institution.id].setVisible(false);
                        $('#button'+institution.id).css("backgroundColor","WHITE");
                        $('#image'+institution.id).attr("src",SourceBlack);
                        $('#contact'+institution.id).css("display","none");
                        $('#meaning'+institution.id).css("display","none");
                        scope.map.hideInfoWindow(event, 'myInfoWindow', marker);
                        scope.selectedMarker = null;

                        var index =scope.selectedMarkers.indexOf(institution.id);
                        if (index > -1)
                        {
                            if (index === scope.selectedMarkers.length -1)
                            {
                                if (scope.selectedMarkers.length > 1)
                                {
                                    scope.map.markers[scope.selectedMarkers[index-1]].setVisible(true);
                                    lng = prevMarker.getPosition().lng() ;
                                    lat = prevMarker.getPosition().lat() ;
                                    scope.map.setCenter(new google.maps.LatLng(lat + 0.01 , lng - 0.03) );
                                    scope.map.setZoom(13);
                                    scope.map.showInfoWindow(event, 'myInfoWindow', prevMarker);
                                }
                            }

                            scope.selectedMarkers.splice(index,1);
                            if (scope.selectedMarkers.length === 0){
                                scope.map.setCenter(new google.maps.LatLng(32 , -4) );
                                scope.map.setZoom(6);
                            }
                        }
                    }
                };
            }
        }
    }
})();