/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var module = angular.module("MichiganTendies.factories", []);

module.factory("MealTime", [
    function mealTimeFactory() {
        return function MealTime(date, formattedDate) {
            this.date = date;
            this.formattedDate = formattedDate;
            this.mealNames = [];
            this.parseJsonMealTime = function(json) {
                this.date = new Date(json.date);
                this.formattedDate = formattedDate;
                this.mealNames = json.mealNames;
            },
            this.addMealName = function (mealName) {
                if (this.mealNames.indexOf(mealName) === -1) {
                    this.mealNames.push(mealName);
                }
            };
        };
    }
]);

module.factory("DiningHallMatch", [
    "MealTime",
    function diningHallMatchFactory(MealTime) {
        return function DiningHallMatch(diningHallName) {
            this.name = diningHallName;
            this.mealTimes = {};
            this.parseJsonDiningHallMatch = function(json) {
                this.name = json.name;
                for(var key in json.mealTimes) {
                    if(!json.mealTimes.hasOwnProperty(key)) {
                        continue;
                    }
                    var mealTime = new MealTime(new Date(json.mealTimes[key].date),json.mealTimes[key].formattedDate);
                    mealTime.parseJsonMealTime(json.mealTimes[key]);
                    this.mealTimes[key] = mealTime;
                    this.mealTimesArray.push(mealTime);
                }
            },
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
            this.diningHallMatchByFilteringDates = function (startDate, endDate) {
                var newDiningHallMatch = new DiningHallMatch(this.name);
                for (var i = 0; i < this.mealTimesArray.length; i++) {
                    var mealTime = this.mealTimesArray[i];
                    if (mealTime.date.getTime() + 300000 >= startDate.getTime() &&
                            mealTime.date.getTime() <= endDate.getTime()) {
                        for(var j = 0;j < mealTime.mealNames.length;j++) {
                            newDiningHallMatch.addMealTime(mealTime.date, mealTime.formattedDate, mealTime.mealNames[j]);
                        }
                        
                    }
                }
                if(newDiningHallMatch.mealTimesArray.length === 0) {
                    return null;
                }
                return newDiningHallMatch;
            };
            this.mealTimesArray = [];
        };
    }
]);

module.factory("Item", [
    "DiningHallMatch",
    function itemFactory(DiningHallMatch) {
        return function Item(menuItem) {
            this.name = menuItem.name;
            this.attributes = menuItem.attribute || [];
            this.diningHallMatches = {};
            this.diningHallMatchesArray = [];
            this.parseJsonItem = function(json) {
                this.name = json.name;
                this.attributes = json.attributes;
                for(var key in json.diningHallMatches) {
                    if(!json.diningHallMatches.hasOwnProperty(key)) {
                        continue;
                    }
                    var diningHallMatch = new DiningHallMatch(json.diningHallMatches[key].name);
                    diningHallMatch.parseJsonDiningHallMatch(json.diningHallMatches[key]);
                    this.diningHallMatches[key] = diningHallMatch;
                    this.diningHallMatchesArray.push(diningHallMatch);
                }
            },
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
            
            this.addDiningHallMatch = function (diningHallMatch) {
                this.diningHallMatches[diningHallMatch.name] = diningHallMatch;
                    this.diningHallMatchesArray.push(diningHallMatch);
            };
            
            this.itemByFilteringDatesAndDiningHalls = function (startDate, endDate, diningHalls) {
                var newItem = new Item({name: this.name, attribute: this.attributes});
                for (var i = 0; i < this.diningHallMatchesArray.length; i++) {
                    if(!diningHalls.hasOwnProperty(this.diningHallMatchesArray[i].name)) {
                        continue;
                    }
                    var filteredDiningHall = this.diningHallMatchesArray[i].diningHallMatchByFilteringDates(startDate, endDate);
                    if(filteredDiningHall === null) {
                        continue;
                    }
                    newItem.addDiningHallMatch(filteredDiningHall);
                }
                if(newItem.diningHallMatchesArray.length === 0) {
                    return null;
                }
                return newItem;
            };
            this.hasAnyAttributes = function (attributes) {
                for (var attribute in attributes) {
                    if (!attributes.hasOwnProperty(attribute)) {
                        continue;
                    }
                    if(attribute === "unmarked" && attributes[attribute] && this.attributes.length === 0) {
                        return true;
                    }
                    for (var i = 0; i < this.attributes.length; i++) {
                        if (attributes[attribute] && attribute === this.attributes[i]) {
                            return true;
                        }
                    }
                }
                return false;
            };
        };
    }
]);

module.factory("MDiningData", [
    "Item", "defaultDateRange",
    function mDiningDataFactory(Item, defaultDateRange) {
        return {
            diningHalls: {},
            items: {},
            isComplete: false,
            parseJsonMDiningData: function(json) {
                this.diningHalls = json.diningHalls;
                for(var key in json.items) {
                    if(!json.items.hasOwnProperty(key)) {
                        continue;
                    }
                    var item = new Item(json.items[key].name);
                    item.parseJsonItem(json.items[key]);
                    this.items[key] = item;
                }
            },
            addItem: function (menuItem, diningHallName, date, formattedDate, mealName) {
                var trimmedName = menuItem.name.trim().toLowerCase();
                if (typeof this.items[trimmedName] === "undefined") {
                    var newItem = new Item(menuItem);
                    newItem.addDiningHall(diningHallName, date, formattedDate, mealName);
                    this.items[trimmedName] = newItem;
                } else {
                    this.items[trimmedName].addDiningHall(diningHallName, date, formattedDate, mealName);
                }
            }
        };
    }
]);