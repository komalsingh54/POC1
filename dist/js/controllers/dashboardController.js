/**
 * Created by KSingh1 on 1/27/2016.
 */
var app = angular.module('dashboardApp', ['angular-raphael-gauge']);
app.controller('dashboardController', function($scope) {
    $scope.gauge = {
        name: 'Best Customers',
        opacity:0.55,
        value: 40,
        text: '',
        arcColor: "skyblue"
    };
    $scope.gauge1 = {
        name: 'Former Best Customers',
        opacity: 0.55,
        value: 30,
        text: '',
        arcColor: "skyblue"
    };
    $scope.gauge2 = {
        name: 'New Customers',
        opacity: 0.55,
        value: 10,
        text: '',
        arcColor: "skyblue"
    };
    $scope.gauge3 = {
        name: 'One Time User',
        opacity: 0.55,
        value: 20,
        arcColor: "skyblue",
        text: ''
    };
});