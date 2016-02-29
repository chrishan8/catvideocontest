app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: "public/html/home.html",
			controller: "catcontroller"
		})
		.when('/submit', {
			templateUrl: "public/html/submit.html",
			controller: "catcontroller"
		})
		.when('/view', {
			templateUrl: "public/html/view.html",
			controller: "votecontroller"
		})
		.when('/winner', {
			templateUrl: "public/html/winner.html",
			controller: "votecontroller"
		})
})