/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var module = angular.module("MichiganTendies.controllers", []);


module.controller("MichiganTendiesController", [
    "$scope", "$interval", "MDiningAPI", "MDiningData", "GoogleMaps", "MDiningDataFilter", "defaultAttributes", "defaultDateRange",
    function ($scope, $interval, MDiningAPI, MDiningData, GoogleMaps, MDiningDataFilter, defaultAttributes, defaultDateRange) {
        var controller = this;

        /**
         *
         * @param {array} mealNames
         * @returns {string} string list of meals in array
         */
        controller.printableMealNames = function (mealNames) {
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
        controller.getGoogleMapsURL = function (diningHallMatch) {
            return GoogleMaps.getURL(diningHallMatch);
        };

        controller.filterItems = function (searchTerm) {
            $scope.totalDisplayed = 20;
            $scope.filteredItems = MDiningDataFilter.filterItemsWithKeyword(searchTerm);
        };

        controller.updateFilters = function (attributes, startDate, endDate, diningHalls) {
            console.log("UPDATING FILTER");
            console.log(attributes);
            console.log(startDate);
            console.log(endDate);
            startDate.setHours(0);
            startDate.setMinutes(0);
            startDate.setMilliseconds(0);
            endDate.setHours(23);
            endDate.setMinutes(59);
            endDate.setMilliseconds(59);
            $scope.totalDisplayed = 20;
            $scope.filteredItems = MDiningDataFilter.filterItems($scope.searchTerm, attributes, startDate, endDate, diningHalls);
            console.log($scope.filteredItems);
        };

        controller.init = function () {

            $scope.filteredItems = [];
            $scope.allowInput = false;
            $scope.isLoadingData = true;
            $scope.loadingPercentage = 0;
            console.log(MDiningAPI);
            MDiningAPI.requestDiningData(function (progress) {
                $scope.loadingPercentage = Math.floor(100 * progress);
                $scope.$apply();
            }, function () {
                $scope.isLoadingData = false;
                console.log(MDiningData);
                var initialSearchTerm = "Tendies";
                $scope.searchTerm = "";
                var count = 0;
                $interval(function () {
                    $scope.searchTerm += initialSearchTerm[count];
                    controller.filterItems($scope.searchTerm);
                    count += 1;
                }, 100, initialSearchTerm.length);
                $scope.allowInput = true;

                $scope.attributes = defaultAttributes;
                $scope.diningHalls = MDiningData.diningHalls;
                $scope.updateFilters = controller.updateFilters;
            });
        };
        controller.init();
    }]);
