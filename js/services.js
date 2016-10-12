/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var module = angular.module("MichiganTendies.services", []);

module.service("GoogleMaps", [
    "googleMapsBaseURL",
    function googleMapsService(googleMapsBaseURL) {
        this.getURL = function (diningHallMatch) {
            return googleMapsBaseURL + encodeURIComponent(diningHallMatch.name);
        };
    }
]);


module.service("MDiningDataFilter", [
    "MDiningData", "foodAliases",
    function mDiningDataFilterService(MDiningData, foodAliases) {
        this.filterItemsWithKeyword = function (keyword) {
            var filteredItems = [];
            var formattedSearchTerm = keyword.toLowerCase();
            if (foodAliases.hasOwnProperty(formattedSearchTerm)) {
                formattedSearchTerm = foodAliases[formattedSearchTerm];
            }
            for (var name in MDiningData.items) {
                if (!MDiningData.items.hasOwnProperty(name) || typeof MDiningData.items[name] === "undefined") {
                    continue;
                }
                if (name.search(formattedSearchTerm) !== -1) {
                    filteredItems.push(MDiningData.items[name]);
                }
            }
            return filteredItems;
        };
    }
]);

module.service("DiningHallURL", [
    "crossOriginURL", "diningHallMenuDetailsBaseURL", "diningHallMenuBaseURL", "diningHallListURL",
    function diningHallMenuDetailsURLService(crossOriginURL, diningHallMenuDetailsBaseURL, diningHallMenuBaseURL, diningHallListURL) {
        this.getMenuDetailsURL = function (diningHallName, mealName, date) {
            return crossOriginURL + diningHallMenuDetailsBaseURL + diningHallName + "&menu=" + mealName + "&date=" + date;
        };

        this.getMenuURL = function (diningHallName) {
            return crossOriginURL + diningHallMenuBaseURL + diningHallName;
        };

        this.getDiningHallListURL = function () {
            return crossOriginURL + diningHallListURL;
        };
    }
]);

module.service("HttpClient", [
    function httpClientService() {

        /**
         * A callback used for succesful http get requests.
         *
         * @callback httpGetSuccessCallback
         * @param {string} response The contents of the response sent by the server.
         */

        /**
         * A callback for failed http get requests.
         *
         * @callback httpGetCallFailureCallback
         */

        /**
         * Sends a get request to the given url and calls handlers based on success
         * or failure.
         *
         * @param {string} aUrl The url to send the http get request to.
         * @param {httpGetSuccessCallback} onSuccess A callback which is called when
         * the request is succesful.
         * @param {httpGetFailureCallback} onFailure A callback which is called when
         * the request fails.
         */
        this.get = function (aUrl, onSuccess, onFailure) {
            var anHttpRequest = new XMLHttpRequest();
            anHttpRequest.onreadystatechange = function () {
                if (anHttpRequest.readyState === 4 && anHttpRequest.status === 200) {
                    if (typeof onSuccess !== "undefined") {
                        onSuccess(anHttpRequest.responseText);
                    }
                } else if (anHttpRequest.readyState === 4) {
                    if (typeof onFailure !== "undefined") {
                        onFailure();
                    }
                }
            };
            anHttpRequest.open("GET", aUrl, true);
            anHttpRequest.send(null);
        };
    }
]);

module.service("MDiningAPI", [
    "$filter", "HttpClient", "DiningHallURL", "diningHallGroupName", "MDiningData", "foodAliases",
    function mDiningAPIService($filter, HttpClient, DiningHallURL, diningHallGroupName, MDiningData, foodAliases) {
        var _MDiningAPI = this;

        /**
         * Callback for requesting dining halls successfully.
         *
         * @callback diningHallListSuccessCallback
         *  @param {Object[]} diningHallList Array of objects containing dining hall information.
         */

        /**
         * 
         * @callback diningHallListFailureCallback
         */

        /**
         * Requests a list of diningHall objects from the MDiningAPI.
         *
         * @param {diningHallListSuccessCallback} onSuccess executed if dininghall list is executed succesfully.
         * @param {diningHallListFailureCallback
         */
        this.requestDiningHallList = function (onSuccess, onFailure) {
            HttpClient.get(DiningHallURL.getDiningHallListURL(),
                    function (response) {
                        var diningHallList = JSON.parse(response)
                                .diningHallGroup
                                .filter(function (element, index, array) {
                                    return element.name === diningHallGroupName;
                                })[0]; //Assuming it contains diningHalllGroup matching diningHallGroupName
                        if (typeof onSuccess !== "undefined") {
                            onSuccess(diningHallList.diningHall);
                        }
                    },
                    function () {
                        if (typeof onFailure !== "undefined") {
                            onFailure();
                        }
                    });
        };

        /**
         * Callback for requesting dining hall menu.
         *
         * @callback diningHallMenuSuccessCallback
         * @param {string} diningHallName Name of the diningHall
         * @param {Object} menu Menu object returned by MDiningAPI
         */

        /**
         * 
         * @callback diningHallMenuFailureCallback
         * @param {string} diningHallName Name of the dining hall.
         */

        /**
         * Requests a menu for the given dining hall from the MDiningAPI.
         *
         * @param {string} diningHallName
         * @param {diningHallMenuSuccessCallback} onSuccess
         * @param {diningHallMenuFailureCallback} onFailure
         */
        this.requestDiningHallMenu = function (diningHallName, onSuccess, onFailure) {
            HttpClient.get(DiningHallURL.getMenuURL(diningHallName), function (response) {
                if (typeof onSuccess !== "undefined") {
                    //Assuming that reponse contains menu
                    onSuccess(diningHallName, JSON.parse(response).menu);
                }
            },
                    function () {
                        if (typeof onFailure !== "undefined") {
                            onFailure(diningHallName);
                        }
                    });
        };

        /**
         * Callback for requesting diningHallMenuDetails.
         *
         * @callback diningHallMenuDetailsSuccessCallback
         * @param {string} diningHallName Name of the dining hall.
         * @param {string} mealName Name of the meal.
         * @param {string} date Date of the meal.
         * @param {Object} details The menu details requested from the server.
         */

        /**
         * 
         * @callback diningHallMenuDetailsFailureCallback
         * @param {string} diningHallName Name of the dining hall.
         * @param {string} mealName Name of the meal.
         * @param {string} date Date of the meal.
         */

        /**
         * Requests the menu details for the given dining hall and meal from the
         * MDiningAPI.
         *
         * @param {type} diningHallName
         * @param {Object} menu
         * @param {diningHallMenuDetailsSuccessCallback} onSuccess
         * @param {diningHallMenuDetailsFailureCallback} onFailure
         */
        this.requestDiningHallMenuDetails = function (diningHallName, mealName, date, onSuccess, onFailure) {
            HttpClient.get(DiningHallURL.getMenuDetailsURL(diningHallName, mealName, $filter("date")(date, "dd-MM-yyyy")),
                    function (response) {
                        if (typeof onSuccess !== "undefined") {
                            onSuccess(diningHallName, mealName, date, JSON.parse(response).menu[0]);
                        }
                    },
                    function () {
                        if (typeof onFailure !== "undefined") {
                            onFailure(diningHallName, mealName, date);
                        }
                    });
        };

        function isComplete(completionStatus) {
            var total = 0, complete = 0;
            for (var diningHall in completionStatus) {
                if (!completionStatus.hasOwnProperty(diningHall)) {
                    continue;
                }
                for (var date in completionStatus[diningHall]) {
                    if (!completionStatus[diningHall].hasOwnProperty(date)) {
                        continue;
                    }
                    for (var name in completionStatus[diningHall][date]) {
                        if (!completionStatus[diningHall][date].hasOwnProperty(name)) {
                            continue;
                        }
                        total += 1;
                        if (completionStatus[diningHall][date][name] === true) {
                            complete += 1;
                        }
                    }
                }
            }
            diningDataStatusCallback(complete / total);
            return complete === total;
        }

        var completionStatus;
        var diningDataCallback;
        var diningDataStatusCallback;

        function handleDiningHallsList(diningHalls) {
            completionStatus = {};
            diningHalls.forEach(function (diningHall) {
                MDiningData.diningHalls[diningHall.name] = diningHall;
                completionStatus[diningHall.name] = [];
            });
            diningHalls.forEach(function (diningHall) {
                _MDiningAPI.requestDiningHallMenu(diningHall.name, handleDiningHallMenu);
            });
        }

        function handleDiningHallMenu(diningHallName, menu) {
            menu.forEach(function (meal) {
                if (typeof completionStatus[diningHallName][meal.date] === "undefined") {
                    completionStatus[diningHallName][meal.date] = {};
                }
                completionStatus[diningHallName][meal.date][meal.name] = false;
            });
            menu.forEach(function (meal) {
                _MDiningAPI.requestDiningHallMenuDetails(diningHallName, meal.name, meal.date, handleMenuDetails,
                        function (diningHallName, mealName, date) {
                            completionStatus[diningHallName][date][mealName] = true;
                            if (isComplete(completionStatus)) {
                                diningDataCallback();
                            }
                        });
            });
        }

        function handleMenuDetails(diningHallName, mealName, date, details) {
            console.log(details);
            if (typeof details !== "undefined" && details.hasCategories) {
                MDiningData.diningHalls[diningHallName].details = details;
                details.category.forEach(function (category) {
                    category.menuItem.forEach(function (menuItem) {
                        MDiningData.addItem(
                                menuItem.name,
                                diningHallName,
                                new Date(details.date),
                                details.formattedDate,
                                details.name
                                );
                    });
                });
            }
            completionStatus[diningHallName][date][mealName] = true;
            if (isComplete(completionStatus)) {
                diningDataCallback();
            }
        }

        /**
         * Called when all dining data is loaded.
         *
         * @callback detailedDiningHallListCallback
         */
        
        /**
         * Called when the proportion of requests completed is updated.
         * 
         * @callback detailedDiningHallListStatusCallback
         * @param {number} status A proportion of requests which have been made.
         */

        /**
         * Requests a list of dining halls and fills in menus and menu details.
         *
         * @param {detailedDiningHallListStatusCallback} onUpdateStatus
         * @param {detailedDiningHallListCallback} onCompletion
         */
        this.requestDiningData = function (onUpdateStatus, onCompletion) {
            diningDataCallback = onCompletion;
            diningDataStatusCallback = onUpdateStatus;
            _MDiningAPI.requestDiningHallList(handleDiningHallsList);
        };
    }
]);
