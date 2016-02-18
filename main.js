var app = angular.module('cat', [])

app.controller('catcontroller', ['$scope', '$http', function($scope, $http) {
	$http.get('/api/entries').then(function(dataFromServer){
		$scope.videos = dataFromServer.data;
	})

	$scope.submit = function() {
		$http.post('/api/entries', $scope.newEntry).then(function(dataFromServer){
			$scope.videos = dataFromServer.data;
			$scope.newEntry = {};
		})
	}
}])