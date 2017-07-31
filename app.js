// CONSTANTS
const WEATHER_API = 'http://api.openweathermap.org/data/2.5/forecast/daily';
const API_KEY = '6f6a9295d082f940d5090e4d8564d156';
// sample call: http://api.openweathermap.org/data/2.5/forecast/daily?q=London&cnt=2&APPID=6f6a9295d082f940d5090e4d8564d156

//MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);