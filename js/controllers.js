/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var module = angular.module("MichiganTendies.controllers", []);


module.controller("MichiganTendiesController", [
    "$scope", "$interval", "$filter", "Item", "foodAliases", "MDiningAPI", "MDiningData", "GoogleMaps", "MDiningDataFilter",
    function ($scope, $interval, $filter, Item, foodAliases, MDiningAPI, MDiningData, GoogleMaps, MDiningDataFilter) {
        var menuList = this;
        $scope.filteredItems = [];
        $scope.allowInput = false;

        /**
         *
         * @param {array} mealNames
         * @returns {string} string list of meals in array
         */
        menuList.printableMealNames = function (mealNames) {
            return mealNames.reduce(function (previousValue, currentValue, currentIndex, array) {
                if (typeof currentValue === "undefined") {
                    return "";
                } else if (currentIndex === 0) {
                    return currentValue;
                } else if (currentIndex < array.length - 1) {
                    return previousValue + ", " + currentValue;
                } else {
                    return previousValue + " and " + currentValue;
                }
            }, "").toLowerCase();
        };

        /**
         *
         * @param {DiningHallMatch} diningHallMatch
         * @returns {string} url for dining hall
         */
        menuList.getGoogleMapsURL = function (diningHallMatch) {
            return GoogleMaps.getURL(diningHallMatch);
        };

        menuList.filterItems = function (searchTerm) {
            $scope.totalDisplayed = 20;
            $scope.filteredItems = MDiningDataFilter.filterItemsWithKeyword(searchTerm);
        };

        menuList.init = function () {
            $scope.filteredItems = [];
            $scope.allowInput = false;
            $scope.isLoadingData = true;
            $scope.loadingPercentage = 0;
            MDiningAPI.requestDiningData(function(progress) {
                $scope.loadingPercentage = Math.floor(100 * progress);
                $scope.$apply();
            },function () {
                $scope.isLoadingData = false;
                console.log(MDiningData);
                var initialSearchTerm = "Tendies";
                $scope.searchTerm = "";
                var count = 0;
                $interval(function () {
                    $scope.searchTerm += initialSearchTerm[count];
                    menuList.filterItems($scope.searchTerm);
                    count += 1;
                }, 100, initialSearchTerm.length);
                $scope.allowInput = true;
            });
        };
        menuList.init();
    }]);
