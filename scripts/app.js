'use strict';

var scoreCard = angular.module('scoreCard', [
	'ngRoute',
	'genericController'
]);

scoreCard.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'views/overall.html',
				controller: 'TestCtrl'
			}).
			otherwise({
				redirectTo: '/'
			});
	}
]);