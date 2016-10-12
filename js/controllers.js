/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var module = angular.module("MichiganTendies.controllers", []);

module.controller("MichiganTendiesController",
        function ($scope, $interval, $window, Item, foodAliases, MDiningAPI, MDiningData, GoogleMaps) {
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
                $scope.filteredItems = [];
                var formattedSearchTerm = searchTerm.toLowerCase();
                if (typeof foodAliases[formattedSearchTerm] !== "undefined") {
                    formattedSearchTerm = foodAliases[formattedSearchTerm];
                }
                for (var name in MDiningData.items) {
                    if (!MDiningData.items.hasOwnProperty(name) || typeof MDiningData.items[name] === "undefined") {
                        continue;
                    }
                    if (name.search(formattedSearchTerm) !== -1) {
                        $scope.filteredItems.push(MDiningData.items[name]);
                    }
                }
            };
            
            menuList.getDocHeight = function () {
                var D = document;
                return Math.max(
                        D.body.scrollHeight, D.documentElement.scrollHeight,
                        D.body.offsetHeight, D.documentElement.offsetHeight,
                        D.body.clientHeight, D.documentElement.clientHeight
                        );
            };
            
            menuList.amountScrolled = function () {
                var winheight = window.innerHeight || (document.documentElement || document.body).clientHeight;
                var docheight = menuList.getDocHeight();
                var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
                var trackLength = docheight - winheight;
                var pctScrolled = Math.floor(scrollTop / trackLength * 100); // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
                return pctScrolled;
            };
            
            $scope.totalDisplayed = 20;
            
            $scope.loadMore = function () {
                $scope.totalDisplayed += 20;
            };
            
            $window.ontouchmove = function () {
                if (menuList.amountScrolled() >= 75) { //If scrolled more than 75% of page
                    $scope.loadMore();
                    $scope.$apply();
                }
            };
            
            $window.onscroll = function () {
                if (menuList.amountScrolled() >= 75) { //If scrolled more than 75% of page
                    $scope.loadMore();
                    $scope.$apply();
                }
            };
            
            menuList.init = function () {
                $scope.filteredItems = [new Item("Loading Data...")];
                $scope.allowInput = false;
                MDiningAPI.requestDiningData(function () {
                    console.log(MDiningData);
                    var initialSearchTerm = "Tendies";
                    $scope.searchTerm = "";
                    var count = 0;
                    $interval(function () {
                        $scope.searchTerm += initialSearchTerm[count];
                        menuList.filterItems($scope.searchTerm);
                        count += 1;
                    }, 200, initialSearchTerm.length);
                    $scope.allowInput = true;
                });
            };
            menuList.init();
        });