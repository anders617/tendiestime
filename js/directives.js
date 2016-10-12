/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var module = angular.module("MichiganTendies.directives", []);

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
    function() {
        return {
            restrict: "E",
            scope: {
                percentage:"=percentage"
            },
            template: "<li><div class='list-food-name'>Loading Data...{{percentage}}%</div></li>"
        };
    }
]);

module.directive("mtInfiniteScroll", [
    "$window","$document",
    function ($window, $document) {
        return {
            restrict: "A",
            link: function ($scope) {
                var windowElement = angular.element($window);
                
                function getHeight () {
                    return Math.max(
                            $document[0].body.scrollHeight, $document[0].documentElement.scrollHeight,
                            $document[0].body.offsetHeight, $document[0].documentElement.offsetHeight,
                            $document[0].body.clientHeight, $document[0].documentElement.clientHeight
                            );
                };

                function amountScrolled () {
                    console.log(getHeight());
                    var winheight = windowElement.innerHeight || ($document[0].documentElement || $document[0].body).clientHeight;
                    console.log(winheight);
                    var docheight = getHeight();
                    var scrollTop = $document[0].body.scrollTop;//windowElement.pageYOffset || ($document[0].documentElement || $document[0].body.parentNode || $document[0].body).scrollTop;
                    console.log(scrollTop);
                    var trackLength = docheight - winheight;
                    var pctScrolled = Math.floor(scrollTop / trackLength * 100); // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
                    return pctScrolled;
                };

                $scope.totalDisplayed = 20;

                function loadMore () {
                    $scope.totalDisplayed += 20;
                };

                $window.ontouchmove = function () {
                    if (amountScrolled() >= Math.floor(($scope.totalDisplayed - 20)/($scope.totalDisplayed))) { //If scrolled more than 75% of page
                        loadMore();
                        $scope.$apply();
                    }
                };

                $window.onscroll = function () {
                    console.log("Here1");
                    console.log(amountScrolled());
                    console.log(Math.floor(100 * ($scope.totalDisplayed - 20)/($scope.totalDisplayed)) + " percent");
                    if (amountScrolled() >= Math.floor(100 * ($scope.totalDisplayed - 20)/($scope.totalDisplayed))) { //If scrolled more than 75% of page
                        console.log("Here");
                        loadMore();
                        $scope.$apply();
                    }
                };
            }
        };
    }]);
