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

weatherApp.controller('forecastController', ['$scope', '$log', '$routeParams', 'cityService', 'weatherService',
    function ($scope, $log, $routeParams, cityService, weatherService) {
        $log.info('in forecast controller');

        $scope.city = cityService.city;
        $scope.days = $routeParams.days || '2';

        $scope.weatherResult = weatherService.GetWeather($scope.city, $scope.days);


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