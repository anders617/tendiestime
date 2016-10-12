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
        };
    }
]);

module.factory("Item", [
    "DiningHallMatch",
    function itemFactory(DiningHallMatch) {
        return function Item(name) {
            this.name = name;
            this.diningHallMatches = {};
            this.diningHallMatchesArray = [];
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
        };
    }
]);

module.factory("MDiningData", [
    "Item",
    function mDiningDataFactory(Item) {
        return {
            "diningHalls": {},
            "items": {},
            "isComplete": false,
            "addItem": function (name, diningHallName, date, formattedDate, mealName) {
                var trimmedName = name.trim().toLowerCase();
                if (typeof this.items[trimmedName] === "undefined") {
                    var newItem = new Item(name);
                    newItem.addDiningHall(diningHallName, date, formattedDate, mealName);
                    this.items[trimmedName] = newItem;
                } else {
                    this.items[trimmedName].addDiningHall(diningHallName, date, formattedDate, mealName);
                }
            }
        };
    }
]);