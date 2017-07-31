// DIRECTIVES
weatherApp.directive('dayForecast', function () {
    return {
        restrict: 'E',
        templateUrl: 'directives/dayForecast.html',
        replace: true,
        scope: {
            weatherResult: "=",
            convertToStandard: "&",
            convertToDate: "&",
            dateFormat: "@"
        }
    }
});