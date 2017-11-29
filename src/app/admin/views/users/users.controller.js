(function () {
	'use strict';

	angular
		.module("admin")
		.controller("UserController", UserController);

	function UserController($mdDialog, Toast, UserService) {
		var vm = this;
		vm.users = [];

		UserService.get(function (data) {
			vm.users = data.elements;
		}, function (error) { Toast.error(error) });

		vm.openUserDialog = openUserDialog;
		vm.deleteUserDialog = deleteUserDialog

		function openUserDialog(event, user) {
			$mdDialog.show({
				controller: "UserDialogController",
				controllerAs: 'dialVm',
				templateUrl: "app/admin/dialogs/user-dialog/user-dialog.html",
				parent: angular.element(document.body),
				targetEvent: event,
				clickOutsideToClose: true,
				escapeToClose: true,
				fullscreen: true,
				locals: {
					User: user
				}
			}).then(function (usr, isNew) {
				if (isNew) {
					vm.users.unshift(usr);
				} else {
					for (var key in user) {
						if (user.hasOwnProperty(key)) {
							user[key] = usr[key];
						}
					}
				}
			}, function () { });
		}

		function deleteUserDialog(event, userId, index) {
			var confirm = $mdDialog.confirm()
				.title('Suppression!')
				.textContent('Voulez vous supprimer cet utilisateur ?')
				.ariaLabel('validation')
				.targetEvent(event)
				.ok('Confirmer')
				.cancel('Annuler');
			$mdDialog.show(confirm).then(function () {
				UserService.delete({ userId: userId }, function () {
					vm.users.slice(index, 1);
				}, function (error) { Toast.error(error) })
			}, function () { });
		}
	}
})();