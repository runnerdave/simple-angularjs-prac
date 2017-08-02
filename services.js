// SERVICES
weatherApp.service('cityService', function () {
    this.city = 'London';
});

weatherApp.service('weatherService', ['$resource', function($resource) {
    this.GetWeather = function(city, days) {
        var weatherAPI = $resource(WEATHER_API, {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});
        return weatherAPI.get({q: city, cnt: days, APPID: API_KEY});
    }
}]);