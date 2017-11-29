(function () {
	"use strict";

	angular
		.module("dialogs")
		.controller("IntitutionFormDialogController", IntitutionFormDialogController);

	function IntitutionFormDialogController($scope, $mdDialog, $log, $timeout, NgMap, Institution, InstitutionService, WilayaService, InstitutionClassService, Toast, Upload, API_ENDPOINT) {
		var vm = this;
		vm.institution = angular.copy(Institution);
		$log.info("update", vm.institution);
		vm.wilayas = [];
		vm.markers = [];
		vm.institutionClasses = [];
		vm.selectedWilaya = [];
		vm.institution_image = null;

		if (vm.institution) {
			vm.update = true;
			loadCommunes();
		}

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


		NgMap.getMap('new-institution-map').then(function (map) {
			vm.map = map;
			google.maps.event.trigger(vm.map, 'resize');
		}).catch(function (error) { $log(error) });


		vm.saveChanges = saveChanges;
		vm.loadCommunes = loadCommunes;
		vm.addInstitution = addInstitution;
		vm.getCoordinates = getCoordinates;
		vm.onMapClicked = onMapClicked;
		vm.close = close;

		function close() {
			$mdDialog.hide();
		}


		function loadCommunes() {
			if (vm.institution && vm.institution.wilaya_id) {
				return WilayaService.get({ wilayaId: vm.institution.wilaya_id }, function (data) {
					vm.selectedWilaya = data.element;
				});
			}
		}

		function saveChanges() {
			vm.update ? updateInstitution() : addInstitution();
		}

		function updateInstitution() {
			Institution.update({ institutionId: vm.institution.id }, function (data) {
				if (vm.institution_image) uploadInstitutionFile(vm.institution_image, data.element.id);
				Toast.message("L'institution a été modifier.");
				$mdDialog.hide(data.element, true);
			}, function (error) { Toast.error(error) });
		}

		function addInstitution() {
			InstitutionService.save(vm.institution, function (data) {
				if (vm.institution_image) uploadInstitutionFile(vm.institution_image, data.element.id);
				Toast.message("L'institution en attente de validation, On vous remercie.");
				$mdDialog.hide(data.element);
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