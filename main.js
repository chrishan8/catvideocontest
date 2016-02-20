var app = angular.module('cat', ['ngRoute', 'ngSanitize'])

app.controller('navcontroller', ['$scope', '$location', function($scope, $location) {
	$scope.isActive = function (viewLocation) { 
        return $location.path().indexOf(viewLocation) == 0;
    }
}])
.controller('catcontroller', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
	$scope.videos = [];

	$http.get('/api/entries').then(function(dataFromServer){
		$scope.videos = dataFromServer.data;
	})

	$scope.submit = function() {
		if ($scope.videos.length < max) {
			$http.post('/api/entries', $scope.newEntry).then(function(dataFromServer){
			$scope.videos = dataFromServer.data;
			$scope.newEntry = {};
			console.log($scope.videos);
			})
		}
	}

	$scope.full = function() {
		if ($scope.videos.length == max) {
			return true;
		}
		else {
			return false;
		}
	}

	var min = 0;
	var max = 2;
	
	getRandomInt = function (min, max) {
  		return Math.floor(Math.random() * (max - min)) + min;
	}

	if($scope.videos.length == max) {
		$scope.vidone = $scope.videos[getRandomInt(min,max)];
  		$scope.vidtwo = $scope.videos[getRandomInt(min,max)];
  		$scope.vidyouone = $sce.trustAsHtml($scope.vidone.url);
  		$scope.vidyoutwo = $sce.trustAsHtml($scope.vidtwo.url);
	}

	$scope.randvid = function() {
  		$scope.vidone = $scope.videos[getRandomInt(min,max)];
  		$scope.vidtwo = $scope.videos[getRandomInt(min,max)];
  		$scope.vidyouone = $sce.trustAsHtml($scope.vidone.url);
  		$scope.vidyoutwo = $sce.trustAsHtml($scope.vidtwo.url);
  		while ($scope.vidone == $scope.vidtwo) {
  			$scope.vidtwo = $scope.videos[getRandomInt(min,max)];
  			$scope.vidyoutwo = $sce.trustAsHtml($scope.vidtwo.url);
  		}
  		console.log($scope.vidone);
  		console.log($scope.vidtwo);
	}
}])