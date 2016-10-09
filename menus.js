/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module("michiganTendies", []);

app.controller("MichiganTendiesController", function ($scope, $filter, $interval, $window) {
    var menuList = this;

    menuList.httpClient = {};
    menuList.httpClient.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState === 4 && anHttpRequest.status === 200)
                aCallback(anHttpRequest.responseText);
        };

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    };

    menuList.diningHallsLoaded = false;
    menuList.diningHalls = [];
    menuList.diningHallMatches = [];
    menuList.items = {};
    $scope.filteredItems = [];

    menuList.diningHallListURL = "https://crossorigin.me/https://mobile.its.umich.edu/michigan/services/dining/shallowDiningHallGroups?_type=json";
    menuList.diningHallMenuURL = "https://crossorigin.me/https://mobile.its.umich.edu/michigan/services/dining/shallowMenusByDiningHall?_type=json&diningHall=";
    menuList.diningHallMenuDetailsURL = "https://crossorigin.me/https://mobile.its.umich.edu/michigan/services/dining/menusByDiningHall?_type=json&diningHall=";

    menuList.foodAliases = {
        "tendies": "chicken tenders"
    };

    /**
     * 
     * @param {DiningHall} diningHall
     * @callback callback
     */
    menuList.retrieveDiningHallMenu = function (diningHall, callback) {
        menuList.httpClient.get(menuList.diningHallMenuURL + diningHall.name,
                function (response) {
                    diningHall.mealTimes = JSON.parse(response).menu;
                    if (typeof callback !== "undefined") {
                        callback(diningHall);
                    }
                });
    };

    /**
     * 
     * @param {DiningHall} diningHall
     * @param {Menu} menu
     * @callback callback
     */
    menuList.retrieveDiningHallMenuDetails = function (diningHall, menu, menuIndex, callback) {
        menuList.httpClient.get(menuList.diningHallMenuDetailsURL
                + diningHall.name
                + "&menu=" + menu.name
                + "&date=" + $filter("date")(menu.date, "dd-MM-yyyy"),
                function (response) {
                    var mealMenu = JSON.parse(response).menu[0];
                    menu.details = mealMenu;
                    if (typeof callback !== "undefined") {
                        callback(menuIndex);
                    }
                });
    };

    /**
     * 
     * @callback callback
     */
    menuList.retrieveDiningHalls = function (callback) {
        menuList.httpClient.get(menuList.diningHallListURL,
                function (response) {
                    var diningList = JSON.parse(response).diningHallGroup;
                    var diningHallList;
                    for (var i = 0; i < diningList.length; i++) {
                        if (diningList[i].name === "DINING HALLS") {
                            diningHallList = diningList[i];
                        }
                    }
                    menuList.diningHalls = [];
                    for (var i = 0; i < diningHallList.diningHall.length; i++) {
                        menuList.diningHalls.push(diningHallList.diningHall[i]);
                    }
                    if (typeof callback !== "undefined") {
                        callback();
                    }
                }
        );
    };

    function MealTime(date, formattedDate) {
        this.date = date;
        this.formattedDate = formattedDate;
        this.mealNames = [];
        this.addMealName = function (mealName) {
            if (this.mealNames.indexOf(mealName) === -1) {
                this.mealNames.push(mealName);
            }
        };
    }

    function DiningHallMatch(diningHallName) {
        this.name = diningHallName;
        this.mealTimes = {};
        this.addMealTime = function (date, formattedDate, mealName) {
            if (typeof this.mealTimes[date] === "undefined") {
                var newMealTime = new MealTime(date, formattedDate);
                newMealTime.addMealName(mealName);
                this.mealTimes[date] = newMealTime;
                this.mealTimesArray.push(newMealTime);
            } else {
                var index = this.mealTimesArray.indexOf(this.mealTimes[date]);
                this.mealTimes[date].addMealName(mealName);
                this.mealTimesArray[index] = this.mealTimes[date];
            }
        };
        this.mealTimesArray = [];
    }

    function Item(name) {
        this.name = name;
        this.diningHallMatches = {};
        this.addDiningHall = function (diningHallName, date, formattedDate, mealName) {
            if (typeof this.diningHallMatches[diningHallName] === "undefined") {
                var newMatch = new DiningHallMatch(diningHallName);
                newMatch.addMealTime(date, formattedDate, mealName);
                this.diningHallMatches[diningHallName] = newMatch;
                this.diningHallMatchesArray.push(newMatch);
            } else {
                var index = this.diningHallMatchesArray.indexOf(this.diningHallMatches[diningHallName]);
                this.diningHallMatches[diningHallName].addMealTime(date, formattedDate, mealName);
                this.diningHallMatchesArray[index] = this.diningHallMatches[diningHallName];
            }
        };
        this.diningHallMatchesArray = [];
    }

    menuList.loadFullMenu = function (parseMenuDetails) {
        menuList.retrieveDiningHalls(function () {
            var diningHall;
            for (var i = 0; i < menuList.diningHalls.length; i++) {
                diningHall = menuList.diningHalls[i];
                //Must pass dining hall since asynchronous execution means that diningHall will have changed before callback
                menuList.retrieveDiningHallMenu(diningHall, function (diningHall) {
                    for (var j = 0; j < diningHall.mealTimes.length; j++) {
                        //Must pass j since asynchronous execution means that j will have changed before callback is called
                        menuList.retrieveDiningHallMenuDetails(diningHall, diningHall.mealTimes[j], j, function (mealTimeIndex) {
                            parseMenuDetails(diningHall, mealTimeIndex);
                        });
                    }
                });
            }
        });
    };

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
        var url = "http://maps.google.com/?daddr=";
        url += encodeURIComponent(diningHallMatch.name);
        return url;
    };

    menuList.addItem = function (name, diningHallName, date, formattedDate, mealName) {
        var trimmedName = name.trim().toLowerCase();
        if (typeof menuList.items[trimmedName] === "undefined") {
            var newItem = new Item(name);
            newItem.addDiningHall(diningHallName, date, formattedDate, mealName);
            menuList.items[trimmedName] = newItem;
        } else {
            menuList.items[trimmedName].addDiningHall(diningHallName, date, formattedDate, mealName);
        }
    };

    menuList.loadItems = function () {
        menuList.loadFullMenu(function (diningHall, mealTimeIndex) {
            var mealTime = diningHall.mealTimes[mealTimeIndex];
            if (typeof mealTime.details === "undefined") {
                return;
            }
            if (mealTime.details.hasCategories) {
                var mealTime = diningHall.mealTimes[mealTimeIndex];
                var categories = mealTime.details.category;
                for (var i = 0; i < categories.length; i++) {
                    for (var j = 0; j < categories[i].menuItem.length; j++) {
                        menuList.addItem(
                                categories[i].menuItem[j].name,
                                diningHall.name,
                                new Date(mealTime.date),
                                mealTime.formattedDate,
                                mealTime.name
                                );
                    }
                }
                menuList.filterItems($scope.searchTerm);
                $scope.$apply();
            }
        });
    };

    menuList.filterItems = function (searchTerm) {
        $scope.totalDisplayed = 20;
        $scope.filteredItems = [];
        var formattedSearchTerm = searchTerm.toLowerCase();
        if (typeof menuList.foodAliases[formattedSearchTerm] !== "undefined") {
            formattedSearchTerm = menuList.foodAliases[formattedSearchTerm];
        }
        console.log(Object.keys(menuList.items).length);
        var itemNames = Object.keys(menuList.items);
        for (var i = 0; i < itemNames.length; i++) {
            if (typeof menuList.items[itemNames[i]] === "undefined")
                continue;
            if (itemNames[i].search(formattedSearchTerm) !== -1) {
                $scope.filteredItems.push(menuList.items[itemNames[i]]);
            }
        }
    };

    $scope.totalDisplayed = 20;

    $scope.loadMore = function () {
        $scope.totalDisplayed += 20;
    };

    $window.onscroll = function () {
        $scope.scrollPos = document.body.scrollTop || document.documentElement.scrollTop || 0;
        if (document.body.scrollTop >= 3*document.body.scrollHeight/4) { //at the bottom
            $scope.loadMore();
            $scope.$apply();
        }
    };

    menuList.init = function () {
        menuList.loadItems();
        var initialSearchTerm = "Tendies";
        $scope.filteredItems = [];
        $scope.searchTerm = "";
        var count = 0;
        $interval(function () {
            $scope.searchTerm += initialSearchTerm[count];
            menuList.filterItems($scope.searchTerm);
            count += 1;
        }, 200, initialSearchTerm.length);
    };
    menuList.init();
});
