angular
	.module('authApp', ['ui.router'])
	.config(interceptor)
	.config(MainRouter)

function interceptor($httpProvider){
	$httpProvider.interceptors.push('authInterceptorFactory')
}

function MainRouter($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'templates/home.html'
		})
		.state('loggedOut', {
			url: '/loggedOut',
			templateUrl: 'templates/home.html'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'templates/signup.html'
		})
		.state('login', {
			url: '/login',
			templateUrl: 'templates/login.html'
		})
}