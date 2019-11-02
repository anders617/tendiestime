/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var module = angular.module("MichiganTendies.directives", []);

module.directive("mtFilters", [
    "defaultDateRange",
    function (defaultDateRange) {
        return {
            restrict: "E",
            scope: {
                attributes: "=attributes",
                diningHalls: "=diningHalls",
                onFilterChange: "=onFilterChange"
            },
            templateUrl: "/templates/mt-filters.html",
            link: function (scope) {
                scope.switchedAttribute = function (attributeName) {
                    scope.attributes[attributeName] = !scope.attributes[attributeName];
                    scope.attributeOpacities[attributeName] = scope.attributes[attributeName] ? {opacity: 1} : {opacity: 0.3};
                    scope.onFilterChange(scope.attributes, scope.start, scope.end, scope.diningHalls);
                };

                scope.attributeOpacities = {};
                function init() {
                    for (var attribute in scope.attributes) {
                        scope.attributeOpacities[attribute] = scope.attributes[attribute] ? {opacity: 1} : {opacity: 0.3};
                    }
                    scope.start = new Date(defaultDateRange.start.getTime());
                    scope.startDate = defaultDateRange.start;
                    scope.end = new Date(defaultDateRange.end.getTime());
                    scope.endDate = defaultDateRange.end;
                    scope.$watch("start", function() {
                        scope.onFilterChange(scope.attributes, scope.start, scope.end, scope.diningHalls);
                    });
                    scope.$watch("end", function() {
                        scope.onFilterChange(scope.attributes, scope.start, scope.end, scope.diningHalls);
                    });
                }
                ;
                init();
            }
        };
    }]);

module.directive("mtItemList", function () {
    return {
        restrict: "E",
        scope: {
            items: "=items",
            controller: "=controller",
            limit: "=limit"
        },
        templateUrl: "/templates/mt-item-list.html"
    };
});

module.directive("mtLoading", [
    function () {
        return {
            restrict: "E",
            scope: {
                percentage: "=percentage"
            },
            template: "<li><div class='list-food-name'>Loading Data...{{percentage}}%</div></li>"
        };
    }
]);

module.directive("mtInfiniteScroll", [
    "$window", "$document",
    function ($window, $document) {
        return {
            restrict: "A",
            link: function ($scope) {
                var windowElement = angular.element($window);

                function getHeight() {
                    return Math.max(
                            $document[0].body.scrollHeight, $document[0].documentElement.scrollHeight,
                            $document[0].body.offsetHeight, $document[0].documentElement.offsetHeight,
                            $document[0].body.clientHeight, $document[0].documentElement.clientHeight
                            );
                }
                ;

                function amountScrolled() {
                    var winheight = windowElement.innerHeight || ($document[0].documentElement || $document[0].body).clientHeight;
                    var docheight = getHeight();
                    var scrollTop = window.pageYOffset;
                    var trackLength = docheight - winheight;
                    var pctScrolled = Math.floor(scrollTop / trackLength * 100); // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
                    return pctScrolled;
                }
                ;

                $scope.totalDisplayed = 20;

                function loadMore() {
                    $scope.totalDisplayed += 20;
                }
                ;

                $window.ontouchmove = function () {
                    if (amountScrolled() >= Math.floor(100 * ($scope.totalDisplayed - 20) / ($scope.totalDisplayed))) { //If scrolled more than 75% of page
                        loadMore();
                        $scope.$apply();
                    }
                };

                $window.onscroll = function () {
                    if (amountScrolled() >= Math.floor(100 * ($scope.totalDisplayed - 20) / ($scope.totalDisplayed))) { //If scrolled more than 75% of page
                        loadMore();
                        $scope.$apply();
                    }
                };
            }
        };
    }]);
