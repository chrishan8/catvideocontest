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
	var videoindex = Array.apply(null, Array(max)).map(function (_, i) {return i;});
	
	getRandomInt = function (min, max) {
  		return Math.floor(Math.random() * (max - min)) + min;
	}

	$scope.showvote = false;

	$scope.randvid = function() {
		var one = getRandomInt(min,videoindex.length);
		var index = videoindex.indexOf(one);
		if (index > -1) {
    		videoindex.splice(index, 1);
		}
		var two = getRandomInt(min,videoindex.length);
  		$scope.vidone = $scope.videos[one];
  		$scope.vidtwo = $scope.videos[two];
  		console.log($scope.vidone);
  		console.log($scope.vidtwo);
  		$scope.vidyouone = $sce.trustAsHtml($scope.vidone.url);
  		$scope.vidyoutwo = $sce.trustAsHtml($scope.vidtwo.url);
  		while ($scope.vidone == $scope.vidtwo) {
  			two = getRandomInt(min,videoindex.length);
  			$scope.vidtwo = $scope.videos[two];
  			$scope.vidyoutwo = $sce.trustAsHtml($scope.vidtwo.url);
  		}
  		console.log(videoindex);
  		console.log($scope.vidone);
  		console.log($scope.vidtwo);
	}

}])