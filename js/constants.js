/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var module = angular.module("MichiganTendies.constants", []);

/**
 * Cross origin proxy necessary in order to access michigan dining endpoints
 * from browsers which block cross origin calls without an Access-Control-Allow-Origin
 * header.
 */
module.constant("crossOriginURL", "https://crossorigin.me/");//"http://cors-anywhere.herokuapp.com/");//"http://cors.io/?");

module.constant(
        "diningHallMenuDetailsBaseURL",
        "https://mobile.its.umich.edu/michigan/services/dining/menusByDiningHall?_type=json&diningHall="
        );

module.constant(
        "diningHallMenuBaseURL",
        "https://mobile.its.umich.edu/michigan/services/dining/shallowMenusByDiningHall?_type=json&diningHall="
        );

module.constant(
        "diningHallListURL",
        "https://mobile.its.umich.edu/michigan/services/dining/shallowDiningHallGroups?_type=json"
        );

module.constant("diningHallGroupName", "DINING HALLS");

module.constant(
        "foodAliases",
        {
            "tendies": "chicken tenders"
        }
);

module.constant("googleMapsBaseURL", "http://maps.google.com/?daddr=");
