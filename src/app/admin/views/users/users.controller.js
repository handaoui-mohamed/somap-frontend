(function () {
	'use strict';

	angular
		.module("admin")
		.controller("UserController", UserController);

	function UserController($mdDialog, Toast, UserService) {
		var vm = this;
		vm.users = [];
		vm.query = { limit: 10, page: 1 };

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
			}).then(function (data) {
				if (data.isNew) {
					vm.users.unshift(data.user);
				} else {
					angular.forEach(user, function (value, key) {
						user[key] = data.user[key];
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
                    index = vm.users.findIndex(function (user) { return user.id === wilayaId });
					vm.users.splice(index, 1);
				}, function (error) { Toast.error(error) })
			}, function () { });
		}
	}
})();