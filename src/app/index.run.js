(function () {
	"use strict";

	angular
		.module("somap")
		.run(run);

	function run($rootScope, $window, UserService) {
		var userId = $window.localStorage['current_user'];
		if (userId) {
			UserService.get({ userId: userId }, function (data) {
				$rootScope.currentUser = data.element;
				console.log("current user", data);
			}, function () { });
		}
	}
})();