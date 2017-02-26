(function(){
    "use strict";
    
    angular
        .module("home")
        .controller("HomeController",HomeController);

    function HomeController($scope, $mdDialog, WilayaService, InstitutionClassService,
                             InstitutionService, SourceBlack, SourceBlue){
        var vm = this;
		
		vm.sourceBlack = SourceBlack;
        vm.sourceBlue = SourceBlue
        vm.institutions = [];
		vm.institutionClasses = [];
		vm.selectedInstitutions = [];
		vm.wilayas = [];
		vm.selectedWilayas = [];
		vm.selectedMarkers = [];
		vm.query = "";

        $scope.$on('mapInitialized', function(event, map) {
			vm.map = map;
		});

        // fetch institutionClasses
        InstitutionClassService.get(function(data){
            vm.institutionClasses = data.elements;
            vm.selectedInstitutions = new Array(vm.institutionClasses.length).fill(true);
        },function(errors){
            console.log("can't load institution classes !");
        });
        
        WilayaService.get(function(data){
            vm.wilayas = data.elements;
			vm.selectedWilayas = new Array(vm.wilayas.length).fill(true);
        },function(errors){
            console.log("can't load wilayas !");
        });

		// fetch institutions from file : "institutions.json"

        InstitutionService.get(function(data){
            vm.institutions = data.elements;
        },function(errors){
            console.log("can't load institutions !");
        });

        vm.onMarkerClicked = onMarkerClicked;
        vm.onMapClicked = onMapClicked;
		vm.searchAction = searchAction;
		vm.onSearchClicked = onSearchClicked;
        vm.selectAll= selectAll;
		vm.reset = reset;
        vm.filterMarkers = filterMarkers;
		vm.filterWilayas = filterWilayas;
		vm.showAboutDialog = showAboutDialog;


        //Functions Implementation 
        function filterMarkers(){
			return function(marker){
				return vm.selectedInstitutions[(marker.typeId)-1];
			};
		}

        function filterWilayas(){
			return function(marker){
				return vm.selectedWilayas[(marker.wilayaId)-1];
			};
		}

        function searchAction(){
			vm.queryString = vm.query;
		};

        function onMarkerClicked(evt) {
			vm.selectedMarker = vm.Institutions[this.id];
			$scope.showInfoWindow(evt, 'myInfoWindow', this);
		}

        function onMapClicked(event) {
			// hide the infowindow if it is visible
			if (vm.selectedMarker != null) {
				$scope.hideInfoWindow(event, 'myInfoWindow', vm.selectedMarker);
				vm.selectedMarker = null;
				vm.map.setCenter(new google.maps.LatLng(32 , -4) );
				vm.map.setZoom(6);
			}
		}

        function onSearchClicked(){
			var i= -1;
			var button = null;
			vm.reset();
			$('#main').find('.institution:visible').each(function(){
				while (button == null)
				{
					i++;
					button = document.getElementById('button'+i);
				}
				vm.map.markers[i].setVisible(true);
				$('#button'+i).css("backgroundColor","#F2F2F2");
				$('#image'+i).attr("src",vm.sourceBlue);
				$('#contact'+i).css("display","block");
				$('#meaning'+i).css("display","block");
				i++;
				button = document.getElementById('button'+i);
			});
		}

        function selectAll(value) {
			for (var i = 0;i < vm.selectedWilayas.length; i++){
				vm.selectedWilayas[i] = value;
			}
		}

        function reset(){
			for(var i=0;i<vm.Institutions.length;i++)
			{
				if (vm.map.markers[i].getVisible() == true)
				{
					vm.map.markers[i].setVisible(false);
					if ($('#button'+i) != null){
						$('#button'+i).css("backgroundColor","WHITE");
						$('#image'+i).attr("src",vm.sourceBlack);
						$('#contact'+i).css("display","none");
						$('#meaning'+i).css("display","none");
					}

				}
			}
		}
		
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


		// Dialogs Section
		function showAboutDialog(event) {
			$mdDialog.show({
				controller: "AboutDialogController",
				controllerAs: "aboutVm",
				templateUrl: 'app/home/about-dialog/about-dialog.html',
				parent: angular.element(document.body),
				targetEvent: event, 
				clickOutsideToClose:true,
				escapeToClose: true
			});
		}
    }
})();