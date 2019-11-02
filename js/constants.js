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

module.constant("MichiganTendiesAPIURL", "https://michigan-dining-api.herokuapp.com/v1/all");

module.constant(
        "foodAliases",
        {
            "tendies": "chicken tenders"
        }
);

module.constant(
        "defaultAttributes",
        {
            unmarked: true,
            featured: true,
            glutenfree: true,
            halal: true,
            mhealthy: true,
            vegan: true,
            vegetarian: true,
            spicy: true
        }
);

module.constant(
        "defaultDateRange",
        {
            start: new Date(), //today
            end: new Date(Date.now() + 604800000)//7 days later
        }
);

module.constant("googleMapsBaseURL", "https://www.google.com/maps/place/");
