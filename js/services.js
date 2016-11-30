/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var module = angular.module("MichiganTendies.services", []);

module.service("GoogleMaps", [
    "googleMapsBaseURL", "MDiningData",
    function googleMapsService(googleMapsBaseURL, MDiningData) {
        this.getURL = function (diningHallMatch) {
            var address = MDiningData.diningHalls[diningHallMatch.name].building.address;
            if (typeof address === "undefined") {
                return googleMapsBaseURL + encodeURIComponent(diningHallMatch.name);
            } else {
                return googleMapsBaseURL + encodeURIComponent(
                        address.street1 + (address.street1 === null || address.streetq === "" ? "" : ",") +
                        address.street2 + (address.street2 === null || address.street2 === "" ? "" : ",") +
                        address.city + (address.city === null || address.city === "" ? "" : ",") +
                        address.state + (address.state === null || address.state === "" ? "" : ",") +
                        address.postalCode
                        );
            }
        };
    }
]);


module.service("MDiningDataFilter", [
    "MDiningData", "foodAliases", "defaultAttributes", "defaultDateRange",
    function mDiningDataFilterService(MDiningData, foodAliases, defaultAttributes, defaultDateRange) {
        this.filterItemsWithKeyword = function (keyword) {
            return this.filterItems(keyword, this.attributes, this.startDate, this.endDate, this.diningHalls);
        };

        this.filterItems = function (keyword, attributes, startDate, endDate, diningHalls) {
            if(typeof attributes === "undefined") {
                this.attributes = defaultAttributes;
            } else {
            this.attributes = attributes;
            }
            if(typeof this.startDate === "undefined") {
                this.startDate = defaultDateRange.start;
            } else {
            this.startDate = startDate;
            }
            if(typeof this.endDate === "undefined") {
                this.endDate = defaultDateRange.end;
            } else {
                this.endDate = endDate;
            }
            if(typeof this.diningHalls === "undefined") {
                this.diningHalls = MDiningData.diningHalls;
            } else {
                this.diningHalls = diningHalls;
            }
            this.startDate.setHours(0);
            this.startDate.setMinutes(0);
            this.startDate.setMilliseconds(0);
            this.endDate.setHours(23);
            this.endDate.setMinutes(59);
            this.endDate.setMilliseconds(59);
            var filteredItems = [];
            var formattedSearchTerm = keyword.toLowerCase();
            if (foodAliases.hasOwnProperty(formattedSearchTerm)) {
                formattedSearchTerm = foodAliases[formattedSearchTerm];
            }
            for (var name in MDiningData.items) {
                if (!MDiningData.items.hasOwnProperty(name) || typeof MDiningData.items[name] === "undefined") {
                    continue;
                }
                if (name.search(formattedSearchTerm) !== -1 && MDiningData.items[name].hasAnyAttributes(attributes)) {
                    var item = MDiningData.items[name].itemByFilteringDatesAndDiningHalls(this.startDate, this.endDate, diningHalls);
                    if (item === null) {
                        continue;
                    }
                    filteredItems.push(item);
                }
            }
            return filteredItems;
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
          * A callback when progress is made
          *
          * @callback httpGetProgressCallback
          * @param {number} completion Percentage of download completed 
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
         * @param {httpGetProgressCallback} onProgress A callback which is called when
         * the request fails.
         */
        this.get = function (aUrl, onSuccess, onFailure, onProgress) {
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
            anHttpRequest.onprogress = function(pe) {
                if(pe.lengthComputable) {
                    onProgress(pe.loaded / pe.total);
                }
            };
            anHttpRequest.open("GET", aUrl, true);
            anHttpRequest.send(null);
        };
    }
]);

module.service("MDiningAPI", [
    "HttpClient", "MDiningData", "MichiganTendiesAPIURL",
    function mDiningAPIService(HttpClient, MDiningData, MichiganTendiesAPIURL) {

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
            HttpClient.get(MichiganTendiesAPIURL, function(response) {
                var data = JSON.parse(response);
                MDiningData.parseJsonMDiningData(data);
                onUpdateStatus(1);
                onCompletion();
            }, function() {
                console.log("Error in requestDiningData");
            }, function(completion) {
                onUpdateStatus(completion);
            });
        };
    }
]);