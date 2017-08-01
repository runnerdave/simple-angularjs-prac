// CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$log', '$location', 'cityService', function ($scope, $log, $location, cityService) {
    $log.info('in home controller');

    $scope.city = cityService.city;

    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });

    $scope.submit = function(){
        $location.path("/forecast");
    }

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