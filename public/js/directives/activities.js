angular.module('MyApp').directive('activities', function(){
	return {
		restrict: 'E',
		templateUrl:'/partials/activities.html',
		controller: 'ActivitiesController',
		controllerAs: 'activCtrl'
	};
});
