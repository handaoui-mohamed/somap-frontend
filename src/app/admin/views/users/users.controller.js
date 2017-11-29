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
				templateUrl: "app/admin/dialogs/user/user.html",
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
					angular.forEach(commune, function (value, key) {
						user[key] = usr[key];
					});
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