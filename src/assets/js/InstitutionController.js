/**
 * @author THEDJA
 */
var myApp = angular.module('SoMap', ['ngMap']);

myApp.controller('InstitutionController', ['$scope', '$http',
	function($scope, $http) {
		$scope.$on('mapInitialized', function(event, map) {
			$scope.map = map;
		});
		
		$scope.sourceBlack = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAE7UlEQVR4Xt2b3XEcNwzHiW3A7iByBZYrsFJB5Ari5epdSgWRK4j0ruU6FUSuIFIFUSqI0oHTAJH527yZ9c0tCYDcu0s4oxcdjyR+BPFB8MjtoU3TdMLMb5n5lIhOnXMn6W8++7Nz7pmZn4gIf4993+N/qzZaa3QIHWO8JKLzHcJKpwWQ+67rbteC0RzANE1nzPyzc+5MKqWw3wMRfej7/kHYX9StGYCk5tMKgm8LAhB9K41oAmCapktmvhEhb9PpMxFd931/WztcFYBpml7GGKd0zmvXov5+sg/Qhs/qL6cvmAEklf/NOQerfsgGj/G9FYIJwDRNp8z8u3Pu5SEln82NIwEIT9r1qAFA7Zn5jwrXpl2jtL9JE9QAQggQ/tBqvwTlyXv/RkoM/VQAQgiw9JeaCQ7Q99Z7fyWdVwwgBTg490ffkj0QBUwiAEd87pc249l7/0qyUyIA4zheExHC2+rGzH8T0QMzf0l+0oAnRISE6YyIvquexDnHzB+GYbgujVUEkHb/rwYu75GIrkquKrlY2Jq3pcUXPodrfFWKD4oAxnG8IqJfrIth5n+6rjvXJjGwOTHGeyJ6UTH3T8MwZEP0IoAQAnYf+bu6MfOfXdedlXZhaeAUaiP5ea2e/OsXim4xCyCpI/y+utUKv5mwFgIRvckduywAq/FLao+dV4emu0hjI2KM0AT1cSgZwyyAEAJ8qdoYlSZVq5NzzroZzrlH7/3i5UwJAGsXCzfXdd2p9dwX7MGzRQu894tyLn5Qcf5VoagGsDUUT+5w5wVrDgDu9tShryYM1QiPvnd3d+dd1+EOQtVya1oEYPX/OXVTrXqhcwjBciz7YRg+7hoyB8AU/h4pgMWwuDUAcRJi1QZLYJbzSq0BuCPVgMWQuLkRPEYAJiNovQCJMb67uLi4t6p47nt79QJHGgfAkv+ohWuKAzCJxeU450R5uFYI670EItNhGBaz2VIo/H/IBT5571Gh3tlWyQaTFpgKFUvZoLUQw8zZS5EsAKvRSUIgcUEubq7bYZzaC9nc+cf4xRuhcRxxptV5eIKAas07aym7tv6IS5lhGLJFnCKAEILJ8s5UGQABQXRPP7sJQjKGxMdcfyypv0gDKo/B/EgDwI33/lPOA4QQfnDOobJT/cKkpP4iAOg0jiPOc5P7ehjIVNf/Jj+PMaI2AGtt3vEtsL9679+X3G3xCCQA74kIz1/+M02y+2INSBBqjOG+wYl2XwvAdD+wb8m/CPW1IiR6Yyg6AhshGtuCtdio7iRVABp6hFWET/WIE03wpQKAVVtrBatIvDWoxO9vr0MNID2BRYRnjQ7XYpFNepYmVQNIHqGqYtyagEX1N2swATi2o1BzC2UGkKq2plJVYw1QWf1qGzAfwHpv2AqAJNsrzWXWgFlscBB7kM49irCigKepEdwerEHKXNqobz5v+f6gWgNmmgDXaH3KogWwWOtTDSS5EZIOWPuURToPMzcTXpUMSRa4BwjiLE+y3uYAMOCKkWJz4VcBkCCYHzUt7Nwqwq8GYAbhYwPDuJrwqwJIEPCbopqHjqsKvzqASghVIe7BjOCuiVN1B292RZXd1q4uB6NZICQhXnrmhggPNYGlB02SObR99goAixvHEXf1N9sXKi3DWw2EvQPY5SFaPazWCL7pexAAG+O4+blt+iFFVRXZIjy+8y9B8M9f9tzoZwAAAABJRU5ErkJggg=="
		$scope.sourceBlue  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFJElEQVR4Xt2af3IaNxTHv4+6zXSGpb5BlxMUnyD4BLVPUPvPQGZMThDnBMYzBf8Z9wQmJwg5gekJrNzAZpnJ4Ka8jnYhxoRdSU9aYOr/PGglvY/eb4mwgb/46ksM/vclwA0ADYBjAsXLSzNYAaQAjAAagX74pF79rP8v9Y/Kmj0T+usZwEerwtquOYcyAO1dlgUjOID4KmmC8ZaApq2gNuMYGILwTr2KhjbjbccEAzA/8fehBV8VJAOxdxpKI4IAiHuTMyLu2lL3HcfM90DlXLWrl75zeQGIL3gfLyb61I98NyL5noEBptVT9YbuJd/rb8QAUpWffb0h0l59e3/MGOGxeiiFIAIQ9yYNYPaRiPa3J/rTynOTOFTt6sh1P84AMrVPbqWhzXWDtuOlmuAOoJfcblvt86BoCKodHdhCc/YBcS/pEuHMZYFNj2XGpWpHHdt1rTVAJzjE+Gg78TbHMeHQNmGyArCrdp9rCmClWrW6zSHYAegl50R4azOhcQzzZyYMwbrwSYsf6OIIxDExmiD61TiHxQBmvFPt6Nw01AggPf2fkjvfkMfAJzB1TKEqDbHEXQJemjZf9HsaGh+juik/MAPoTzoEvpBvhh+Y6MjWJhfrZD6HBwD9Il2bQW9Uq1qYolsAGN9JYz4Df2NabZpOIU/Aeao9JOA3CQSbsFgIQKsjEd+KFvcU/psmZPWGBwQ6KDI7AwCp8+MH5krTZO+2YLODmA0l5mByhsUA+okm7+yMTIvaCr48LhZGIu18VSvKbc4UAqj3E3berA5zj1FDavdF/oBeJDp0OjvFu1aUK2fuD1L7d01FXQBLU3GmvXpeBykfgDD1dUlDXYTXY+P+WDdYb1y/K9pTPgBh/C9SN9eNrxsvMUtmOlXt6vW6+QpMQBYBdhNAflocFIDu49sWIVJtiPvuiVlRVAoKQAu1kxpQkBIHd4I7CaCgPxAcAIOPVas2kKp40XebjQLCOqDUPKA/vibQH65wRXmAXkQWcuzqcFchxH0J5s937dqzm+jltf//tQDjg2pHuTdXpVSDPhcV6zTD5yLG1BQxaIAs9dRCpHf70+jAtyjybcgW2b/ep7EjVO+P7yUVWApB39tV9o6lV9m+94+6I6VaUeHdpRFALPS8C1VOzaFCx5KeIGZ849OMNam/lQZIY++qLacPG2bcVa9rHwpj/Z/j31GhToiHFib1twKQhsPeWIXr1+vHDRigsrgTmOOYsQ5VRz4nvgyWwX+pVu3EFG6NJpDW4b3JCRG/N022S7/bnL61BmRJkdwZbhqM7ek7AZA2JTctfBp9Clpgq/uxMoHFRyF9QVlgXGsRJwChIkJZwgP8wNModkm+nACkDlF4V1Ce0E8z28R9LxNIAVx9iYn/0e95nfvzZUJgQ9GTt7azBmRa4HtjHBqFu+ovdiACsGum4NOFkgO44H3pVVXI83f1+t4+YHmCbT+csqn2TLDFGrCYeHv+QL88+bEhLbW9fcAzTfAsmU2n9P3v4d4feGvAkyYkI+lTFlcARXd9rnOFA+D5lMV24yGFdyqGbDbo+6jJtIZLlWeaK6gPeB4ZyskUyxA+uAZ88wcej5rWnVxZwpcGIM0Usxef176OsUzhSwWQQvB0jGULXzoAHwi+Ke7WnOC6hee3O13bm93Qoa4IRrA8wIa4+ZlbmuHpF+VrHzTZrOE6ZqMA5s7xhGjW/b6hEi69dYGwcQDrIoTvq3IXgVfHbgXAk3NMsrf806jj0sj0EXj12/8A7IjAX6I9VzEAAAAASUVORK5CYII="
		$scope.Institutions = [];
		$scope.InstitutionClasses = [];
		$scope.selectedInstitutions = [];
		$scope.Wilayas = [];
		$scope.SelectedWilayas = [];
		$scope.selectedMarkers = [];
		var marker = null;

		$scope.filterMarkers = function(marker){
			return function(marker){
				return $scope.selectedInstitutions[marker.typeId];
			};
		};

		$scope.filterWilayas = function(marker){
			return function(marker){

				return $scope.SelectedWilayas[(marker.wilayaID)-1];
			};
		};

		$scope.onMarkerClicked = function(evt) {
			$scope.selectedMarker = $scope.Institutions[this.id];
			$scope.showInfoWindow(evt, 'myInfoWindow', this);
		};

		$scope.onMapClicked = function(event) {
			// hide the infowindow if it is visible
			if ($scope.selectedMarker != null) {
				$scope.hideInfoWindow(event, 'myInfoWindow', $scope.selectedMarker);
				$scope.selectedMarker = null;
				$scope.map.setCenter(new google.maps.LatLng(32 , -4) );
				$scope.map.setZoom(6);
			}
		};

		// fetch institutionClasses from file : "institutionClasses.json"
		$http.get('assets/InstitutionsClasses.json').success(function(data) {
			for (elt in data) {
				$scope.InstitutionClasses[data[elt].id] = data[elt];
				$scope.selectedInstitutions[data[elt].id] = true;
			}
		}).error(function(data) {
			console.log("can't load institution-classes !");
		});

		$http.get('assets/Wilaya.json').success(function(data) {
			for (elt in data) {
				$scope.Wilayas[data[elt].id] = data[elt];
				$scope.SelectedWilayas[data[elt].id] = true;
			}
		}).error(function(data) {
			console.log("can't load wilaya !");
		});

		// fetch institutions from file : "institutions.json"
		$http.get('assets/institutions.json').success(function(data) {
			for (elt in data) {
				$scope.Institutions[data[elt].id] = data[elt];
			}
		}).error(function(data) {
			console.log("can't load institutions !");
		});

		// Query
		$scope.query = "";
		$scope.searchAction = function(){
			$scope.queryString = $scope.query;
		};


		$scope.showOnMap = function(event, institution){
			marker = $scope.map.markers[institution.id];
			$scope.selectedMarker = institution;
			if ($scope.map.markers[institution.id].getVisible() == false)
			{

				$scope.map.markers[institution.id].setVisible(true);
				$('#button'+institution.id).css("backgroundColor","#F2F2F2");
				$('#image'+institution.id).attr("src",$scope.sourceBlue);
				$('#contact'+institution.id).css("display","block");
				$('#meaning'+institution.id).css("display","block");

				var lng = marker.getPosition().lng() ;
				var lat = marker.getPosition().lat() ;
				$scope.map.setCenter(new google.maps.LatLng(lat + 0.01 , lng - 0.03) );
				$scope.map.setZoom(13);
				$scope.showInfoWindow(event, 'myInfoWindow', marker);

				if ($scope.selectedMarkers.indexOf(institution.id)===-1)
				{
					$scope.selectedMarkers.push(institution.id);
				}

			}
			else
			{
				$scope.map.markers[institution.id].setVisible(false);
				$('#button'+institution.id).css("backgroundColor","WHITE");
				$('#image'+institution.id).attr("src",$scope.sourceBlack);
				$('#contact'+institution.id).css("display","none");
				$('#meaning'+institution.id).css("display","none");
				$scope.hideInfoWindow(event, 'myInfoWindow', marker);
				$scope.selectedMarker = null;

				var index =$scope.selectedMarkers.indexOf(institution.id);
				if (index > -1)
				{
					if (index === $scope.selectedMarkers.length -1)
					{
						if ($scope.selectedMarkers.length > 1)
						{
							var prevMarker = $scope.map.markers[$scope.selectedMarkers[index-1]];
							$scope.map.markers[$scope.selectedMarkers[index-1]].setVisible(true);
							var lng = prevMarker.getPosition().lng() ;
							var lat = prevMarker.getPosition().lat() ;
							$scope.map.setCenter(new google.maps.LatLng(lat + 0.01 , lng - 0.03) );
							$scope.map.setZoom(13);
							$scope.showInfoWindow(event, 'myInfoWindow', prevMarker);
						}
					}

					$scope.selectedMarkers.splice(index,1);
					if ($scope.selectedMarkers.length === 0){
						$scope.map.setCenter(new google.maps.LatLng(32 , -4) );
						$scope.map.setZoom(6);
					}
				}
			}
		};

		$scope.onSearchClicked = function(){
			var i= -1;
			var button = null;
			$scope.reset();
			$('#main').find('.institution:visible').each(function(){
				while (button == null)
				{
					i++;
					button = document.getElementById('button'+i);
				}
				$scope.map.markers[i].setVisible(true);
				$('#button'+i).css("backgroundColor","#F2F2F2");
				$('#image'+i).attr("src",$scope.sourceBlue);
				$('#contact'+i).css("display","block");
				$('#meaning'+i).css("display","block");
				i++;
				button = document.getElementById('button'+i);
			});
		};

		$scope.reset = function(){
			for(var i=0;i<$scope.Institutions.length;i++)
			{
				if ($scope.map.markers[i].getVisible() == true)
				{
					$scope.map.markers[i].setVisible(false);
					if ($('#button'+i) != null){
						$('#button'+i).css("backgroundColor","WHITE");
						$('#image'+i).attr("src",$scope.sourceBlack);
						$('#contact'+i).css("display","none");
						$('#meaning'+i).css("display","none");
					}

				}
			}
		};

		$scope.hoverIn =  function(institution){
			if ($('#contact'+institution.id).css("display") ===  "none")
			$('#button'+institution.id).css("backgroundColor","#F2F2F2");
		};

		$scope.hoverOut =  function(institution){
			if ($('#contact'+institution.id).css("display") ===  "none")
				$('#button'+institution.id).css("backgroundColor","WHITE");
		};

		$scope.selectAll= function (value) {
			for (var i = 0;i < $scope.SelectedWilayas.length; i++){
				$scope.SelectedWilayas[i] = value;
			}
		};
		
		// pour recuperer les position "geocoder"
		/*$scope.showOnMap = function(institution){

			if (!this.geocoder) this.geocoder = new google.maps.Geocoder();
			this.geocoder.geocode({ 'address': institution.wilaya+", "+institution.commune}, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var loc = results[0].geometry.location;
					console.log("\t\t*position*:"+"{\n"+"\t\t\t*lat*: "+loc.lat(),",\n\t\t\t*lng*: " +loc.lng()+"\n\t\t},\n");
				} else {

				}
			});
		};*/
	}]);
