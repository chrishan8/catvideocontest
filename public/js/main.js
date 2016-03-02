var app = angular.module('cat', ['ngRoute', 'ngSanitize'])

app.controller('navcontroller', ['$scope', '$location', function($scope, $location) {
	$scope.isActive = function (viewLocation) { 
        return $location.path().indexOf(viewLocation) == 0;
    }
}])
.controller('catcontroller', ['$scope', '$http', function($scope, $http) {
	var max = 5;
	$scope.videos = [];

	$http.get('/api/entries').then(function(dataFromServer){
		$scope.videos = dataFromServer.data;
	})

	$scope.submit = function() {
		if ($scope.videos.length < max) {
			$http.post('/api/entries', $scope.newEntry)
				.then(function(returnData){
					$scope.videos.push(returnData.data);
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
}])
.controller('votecontroller', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
	var min = 0;
	var max = 5;

	$scope.videos = [];

	var getvideos = function() {
		$http.get('/api/entries')
			.then(function(dataFromServer){
				$scope.videos = dataFromServer.data;
			})
	}

	getvideos();

	$scope.full = function() {
		if ($scope.videos.length == max) {
			return true;
		}
		else {
			return false;
		}
	}

	var videoindex = Array.apply(null, Array(max)).map(function (_, i) {return i;});
	
	getRandomInt = function (min, max) {
  		return Math.floor(Math.random() * (max - min)) + min;
	}

	$scope.showvote = false;

	$scope.indexone = 0;
	$scope.indextwo = 0;

	$scope.randvid = function() {
		if (videoindex.length > 2) {
			var one = getRandomInt(min, max);
			$scope.indexone = videoindex.indexOf(one);
			while ($scope.indexone == -1) {
    			one = getRandomInt(min, max);
    			$scope.indexone = videoindex.indexOf(one);
			}
			var two = getRandomInt(min,max);
			$scope.indextwo = videoindex.indexOf(two);
			while ($scope.indextwo == -1) {
    			two = getRandomInt(min, max);
    			$scope.indextwo = videoindex.indexOf(two);
			}
  			$scope.vidone = $scope.videos[one];
  			$scope.vidtwo = $scope.videos[two];
  			console.log(one);
  			console.log(two);
  			$scope.vidyouone = $sce.trustAsHtml($scope.vidone.url);
  			while ($scope.vidone == $scope.vidtwo || $scope.indextwo == -1) {
    			two = getRandomInt(min, max);
    			$scope.indextwo = videoindex.indexOf(two);
    			$scope.vidtwo = $scope.videos[two];
    			console.log('not stuck');
			}
  			$scope.vidyoutwo = $sce.trustAsHtml($scope.vidtwo.url);	
		}
	}

	var getvotes = function() {
		$http.get('/api/votes')
			.then(function(returnData) {
				$scope.totalvotes = returnData.data[0];
				console.log($scope.totalvotes.totalvotes);
			})
	}

	getvotes();

	$scope.rate = function(video) {
		$scope.totalvotes.totalvotes++;
		$http.post('/api/votes/' + $scope.totalvotes._id, $scope.totalvotes)
			.then(function(returnData) {
				console.log('+1 total vote');
			})
		video.vote++;
		console.log($scope.totalvotes.totalvotes);
		video.rating = (video.vote/$scope.totalvotes.totalvotes);
		for (var i = 0; i < $scope.videos.length; i++) {
			$scope.videos[i].rating = ($scope.videos[i].vote/$scope.totalvotes.totalvotes);
			$http.post('/api/entries/' + $scope.videos[i]._id, $scope.videos[i])
				.then(function(returnData) {
					console.log('changed');
				})
		}
		$http.post('/api/entries/' + video._id, video)
			.then(function(returnData) {
				console.log('+1 vote');
			})
		getvotes();
		getvideos();
	}

	$scope.removeoption = function(num) {
		videoindex.splice(num, 1);
		console.log(videoindex);
	}

	$scope.isvoteover = function() {
		$scope.voteover = false;
		if (videoindex.length < 2) {
			$scope.voteover = true;
		}
	}
}])