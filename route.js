app.config(function ($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: "home.html",
			controller: "catcontroller"
		})
		.when('/submit', {
			templateUrl: "submit.html",
			controller: "catcontroller"
		})
		.when('/view', {
			templateUrl: "view.html",
			controller: "catcontroller"
		})
		.when('/winner', {
			templateUrl: "winner.html",
			controller: "catcontroller"
		})
})