// CONSTANTS
const WEATHER_API = 'http://api.openweathermap.org/data/2.5/forecast/daily';
const API_KEY = '6f6a9295d082f940d5090e4d8564d156';
// sample call: http://api.openweathermap.org/data/2.5/forecast/daily?q=London&cnt=2&APPID=6f6a9295d082f940d5090e4d8564d156

//MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        .when('/forecast', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })
        .when('/forecast/:days', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        });

});

// SERVICES
weatherApp.service('cityService', function () {
    this.city = 'London';
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$log', 'cityService', function ($scope, $log, cityService) {
    $log.info('in home controller');

    $scope.city = cityService.city;

    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });

    $log.info($scope.city);
}]);

weatherApp.controller('forecastController', ['$scope', '$log', '$resource', '$routeParams', 'cityService',
    function ($scope, $log, $resource, $routeParams, cityService) {
        $log.info('in forecast controller');

        $scope.city = cityService.city;
        $scope.days = $routeParams.days || '2';
        $scope.weatherAPI = $resource(WEATHER_API, {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});
        $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days, APPID: API_KEY});


            $scope.convertToCelsius = function (degKelvin) {
                return Math.round(degKelvin - 273);
            }

        $scope.convertToDate = function (date) {
            return new Date(date * 1000)
        }

        $scope.$watch('city', function () {
            cityService.city = $scope.city;
        });

        $log.info($scope.city);
        $log.info($scope.weatherResult);
    }
]);

