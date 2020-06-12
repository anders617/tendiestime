const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const getFoodsByDayFiltered = (summaryStats) => {
    const weekdayFoodCounts = summaryStats.getLatestweekdayfoodcountsMap();
    const sortedFilteredEntriesByDay = {};
    const getSortedFilteredEntries = (day) => weekdayFoodCounts.get(day).getDataMap().getEntryList()
        .sort((a, b) => a[1] - b[1])
        .filter((v) => !v[0].includes('no service at this time'))
    const foods = []
    weekdays.forEach((day) => getSortedFilteredEntries(day).forEach((entry) => foods.push(entry[0])));
    const foodTotals = foods.map((food) => {
        return weekdays.map((day) => {
            const countsForDay = weekdayFoodCounts.get(day).getDataMap();
            return countsForDay.has(food) ? countsForDay.get(food) : 0;
        }).reduce((a, b) => a + b, 0);
    });
    const numberOfDaysServedOn = foods.map((food) => {
        return weekdays.map((day) => {
            const countsForDay = weekdayFoodCounts.get(day).getDataMap();
            if (!countsForDay.has(food)) return 0;
            return countsForDay.get(food) > 0 ? 1 : 0;
        }).reduce((a, b) => a + b, 0);
    });
    weekdays.forEach((day) => {
        sortedFilteredEntriesByDay[day] = getSortedFilteredEntries(day)
            .map((entry) => ({ entry: entry, foodIndex: foods.indexOf(entry[0]) }))
            .filter((v) => numberOfDaysServedOn[v.foodIndex] > 4)
            .filter((v) => foodTotals[v.foodIndex] > 100)
            .map((v) => v.entry);
    })
    return sortedFilteredEntriesByDay;
}

const calculateTimesServedMoreThanAverage = (summaryStats) => {
    const weekdayFoodCounts = summaryStats.getLatestweekdayfoodcountsMap();
    const sortedFilteredEntriesByDay = getFoodsByDayFiltered(summaryStats);
    const foods = []
    weekdays.forEach((day) => sortedFilteredEntriesByDay[day].forEach((entry) => foods.push(entry[0])));
    // Average times served per day
    const averages = foods.map((food) => {
        return weekdays.map((day) => {
            const countsForDay = weekdayFoodCounts.get(day).getDataMap();
            return (countsForDay.has(food) ? countsForDay.get(food) : 0);
        }).reduce((a, b) => a + b, 0) / weekdays.length;
    });
    return weekdays.map((day) => {
        return sortedFilteredEntriesByDay[day]
            .map((entry) => {
                const average = averages[foods.indexOf(entry[0])];
                return [entry[0], (average === 0 ? 0 : entry[1]) / average]
            });
    });
}

const calculateBottomNFoodsByWeekday = (summaryStats, n = 5) => {
    const timesServedMoreThanAverage = calculateTimesServedMoreThanAverage(summaryStats);
    const topFiveFoods = weekdays.map((_day, idx) => {
        return timesServedMoreThanAverage[idx]
            .filter((entry) => entry[1] < 1)
            .sort((a, b) => b[1] - a[1])
            .slice(-n)
            .map((entry) => [entry[0], 1 / entry[1]])
            .reverse();
    }).map((topFive) => ({ names: topFive.map((e) => e[0]), counts: topFive.map((e) => e[1]) }));
    const map = {};
    weekdays.forEach((day, idx) => {
        const topFive = topFiveFoods[idx];
        map[day] = { names: topFive.names, counts: topFive.counts };
    });
    return map;
};

/// Returns object of form  {'Monday': {name: 'Orange', count: 3}}
const calculateTopNFoodsByWeekday = (summaryStats, n = 5) => {
    const timesServedMoreThanAverage = calculateTimesServedMoreThanAverage(summaryStats);
    const topFiveFoods = weekdays.map((_day, idx) => {
        return timesServedMoreThanAverage[idx]
            .filter((entry) => entry[1] > 1)
            .sort((a, b) => a[1] - b[1])
            .slice(-n)
            .reverse();
    }).map((topFive) => ({ names: topFive.map((e) => e[0]), counts: topFive.map((e) => e[1]) }));
    const map = {};
    weekdays.forEach((day, idx) => {
        const topFive = topFiveFoods[idx];
        map[day] = { names: topFive.names, counts: topFive.counts };
    });
    return map;
};

// Returns map from allergen to an array of data of form {x: Date, y: Number}
const calculateAllergenProportions = (summaryStats) => {
    const dates = summaryStats.getDatesList();
    const totalFoodMealsServed = summaryStats.getTotalfoodmealsservedList();
    const allergenCountsMap = summaryStats.getAllergencountsMap();
    const allergens = [];
    if (dates.length > 0) {
        allergenCountsMap.forEach((_count, allergen) => {
            allergens.push(allergen);
        });
    }
    const allergenData = allergens.map((allergen) => {
        const data = allergenCountsMap.get(allergen).getCountsList().map((count, idx) => {
            const cleanCount = isNaN(count) ? -1 : count;
            return { x: new Date(dates[idx]), y: 100 * cleanCount / totalFoodMealsServed[idx] };
        }).filter((d) => d.y >= 0);
        data.sort((a, b) => a.x - b.x);
        return data;
    });
    const map = {};
    allergens.forEach((allergen, idx) => map[allergen] = allergenData[idx]);
    return map;
};

// Returns map from attribute to an array of data of form {x: Date, y: Number}
const calculateAttributeProportions = (summaryStats) => {
    const dates = summaryStats.getDatesList();
    const totalFoodMealsServed = summaryStats.getTotalfoodmealsservedList();
    const attributeCountsMap = summaryStats.getAttributecountsMap();
    const attributes = [];
    if (dates.length > 0) {
        attributeCountsMap.forEach((_count, attr) => {
            attributes.push(attr);
        });
    }
    const attributeData = attributes.map((attribute) => {
        const data = attributeCountsMap.get(attribute).getCountsList().map((count, idx) => {
            const cleanCount = isNaN(count) ? 0 : count;
            return { x: new Date(dates[idx]), y: 100 * cleanCount / totalFoodMealsServed[idx] };
        }).filter((d) => d.y >= 0);;
        data.sort((a, b) => a.x - b.x);
        return data;
    });
    const map = {};
    attributes.forEach((attribute, idx) => map[attribute] = attributeData[idx]);
    return map;
};

// Returns an array of entries of form {x: Date, y: Number}
const caluclateNumUniqueFoods = (summaryStats) => {
    const dates = summaryStats.getDatesList();
    const numUniqueFoods = summaryStats.getNumuniquefoodsList();
    const uniqueFoodsData = numUniqueFoods.map((count, idx) => ({ x: new Date(dates[idx]), y: count }));
    uniqueFoodsData.sort((a, b) => a.x - b.x);
    return uniqueFoodsData;
};

// returns an array with entries of form {x: Date, y: Number}
const calculateTotalMealsServed = (summaryStats) => {
    const dates = summaryStats.getDatesList();
    const totalFoodMealsServed = summaryStats.getTotalfoodmealsservedList();
    const totalFoodMealsServedData = totalFoodMealsServed.map((count, idx) => ({ x: new Date(dates[idx]), y: count }));
    totalFoodMealsServedData.sort((a, b) => a.x - b.x);
    return totalFoodMealsServedData;
};

// returns an array with entries of form {x: Date, y: Number}
const calculateMenuItemsPerUniqueFood = (summaryStats) => {
    const uniqueFoodsData = caluclateNumUniqueFoods(summaryStats);
    const totalMenuItemsPerUniqueFoodData = calculateTotalMealsServed(summaryStats).map((data, idx) => {
        if (uniqueFoodsData[idx].y === 0) {
            return { x: data.x, y: 0 };
        }
        return { x: data.x, y: data.y / uniqueFoodsData[idx].y };
    });
    totalMenuItemsPerUniqueFoodData.sort((a, b) => a.x - b.x);
    return totalMenuItemsPerUniqueFoodData;
};

const calculateFoodFrequencyByWeekday = (summaryStats, food) => {
    const weekdayFoodCounts = summaryStats.getLatestweekdayfoodcountsMap();
    return weekdays.map((day) => weekdayFoodCounts.get(day).getDataMap().get(food)).map((count, idx) => ({ x: weekdays[idx], y: count }));
};

export {
    calculateTopNFoodsByWeekday,
    calculateBottomNFoodsByWeekday,
    calculateAllergenProportions,
    calculateAttributeProportions,
    caluclateNumUniqueFoods,
    calculateTotalMealsServed,
    calculateMenuItemsPerUniqueFood,
    calculateFoodFrequencyByWeekday
};
