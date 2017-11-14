(function () {
	"use strict";

	angular
		.module("home")
		.controller("InstitutionController", InstitutionController);

	function InstitutionController($scope, $log, InstitutionService, WilayaService, InstitutionClassService, Toast, Upload, API_ENDPOINT) {
		var vm = this;
		vm.institution = {};
		vm.wilayas = [];
		vm.markers = [];
		vm.institutionClasses = [];
		vm.selectedWilaya = [];
		vm.institution_image = null;

		WilayaService.get(function (data) {
			vm.wilayas = data.elements;
		}, function (errors) {
			Toast.error(errors);
		});

		InstitutionClassService.get(function (data) {
			vm.institutionClasses = data.elements;
		}, function (errors) {
			Toast.error(errors);
		});


		vm.loadCommunes = loadCommunes;
		vm.addInstitution = addInstitution;
		vm.getCoordinates = getCoordinates;
		vm.onMapClicked = onMapClicked;

		function loadCommunes() {
			if (vm.institution && vm.institution.wilaya_id) {
				return WilayaService.get({ wilayaId: vm.institution.wilaya_id }, function (data) {
					vm.selectedWilaya = data.element;
				});
			}
		}

		function addInstitution() {
			$log(vm.institution);
			InstitutionService.save(vm.institution, function (/*data*/) {
				// uploadInstitutionFile(vm.institution_image,data.element.id)
				Toast.message("L'institution en attente de validation, On vous remercie.");
			}, function (errors) {
				Toast.error(errors);
			});
		}

		function onMapClicked(event) {
			var lat = event.latLng.lat();
			var lng = event.latLng.lng();
			vm.markers = [{
				id: 0,
				lat: lat,
				lng: lng
			}];
			vm.institution.latitude = lat;
			vm.institution.longitude = lng;
		}

		// TODO Must Improve this function
		function getCoordinates() {
			if (!vm.geocoder) vm.geocoder = new google.maps.Geocoder();
			vm.geocoder.geocode({
				'address': vm.wilayas[vm.institution.wilaya_id - 1].name + ", " +
				vm.selectedWilaya.communes.find(function (commune) { return commune.id === vm.institution.commune_id }).name
			}, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var location = results[0].geometry.location;
					vm.institution.latitude = location.lat();
					vm.institution.longitude = location.lng();
					vm.markers = [{
						id: 0,
						lat: vm.institution.latitude,
						lng: vm.institution.longitude
					}];
					Toast.message("veuillez vérifier si l'adresse est correcte, sinon modifier la sur la map");
				} else {
					Toast.error("Cette adresse est introuvable!, veuillez la rechercher sur la map");
				}
			});
		}

		function uploadInstitutionFile(file, institutionId) {
			vm.file = file;
			Upload.upload({
				url: API_ENDPOINT + 'uploads/' + institutionId,
				data: { file: file }
			}).then(function () {
				Toast.message("L'image de l'institution a été téléchargé avec succé.");
			}, function () {
				Toast.message("Echec téléchargement d'image de l'institution.");
			}, function (evt) {
				vm.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			});
		}
	}
})();