import React, { Component } from 'react';
import { SummaryStatsRequest } from 'mdining-proto';

import DateLineChart from '../DateLineChart/DateLineChart';
import TwoColumnList from '../TwoColumnList/TwoColumnList';
import Section from '../Section/Section';
import { withTableOfContents } from '../TableOfContents/TableOfContents';
import mDiningClient from '../../api/mdiningservice';
import {
    calculateTopNFoodsByWeekday,
    calculateBottomNFoodsByWeekday,
    calculateAllergenProportions,
    calculateAttributeProportions,
    caluclateNumUniqueFoods,
    calculateTotalMealsServed,
    calculateMenuItemsPerUniqueFood
} from '../../api/calculations';

class ChartContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodStats: [],
            summaryStats: null,
            error: null,
        };
    }

    componentDidMount() {
        mDiningClient.getSummaryStats(new SummaryStatsRequest())
            .then((res) => {
                this.setState({ summaryStats: res.getStats(), error: null });
            }).catch((error) => {
                if (error.code === 14) {
                    this.setState({ summaryStats: null, error: 'Server is processing data. Please retry in a few moments.' });
                    return;
                }
                this.setState({ summaryStats: null, error });
            });
    }

    renderChart({ key, data, title, yLabel }) {
        return (
            <DateLineChart
                key={key}
                width={'45vw'}
                height={'260px'}
                data={data}
                title={title}
                yLabel={yLabel}
            />
        );
    }

    renderAllergenCharts() {
        const { summaryStats } = this.state;
        return Object.entries(calculateAllergenProportions(summaryStats)).map((entry) => {
            return this.renderChart({
                key: entry[0],
                data: entry[1],
                title: `Percentage of Food Servings That Contain ${entry[0]}`,
                yLabel: 'Percent'
            });
        });
    }

    renderAttributeCharts() {
        const { summaryStats } = this.state;
        return Object.entries(calculateAttributeProportions(summaryStats)).map((entry) => {
            return this.renderChart({
                key: entry[0],
                data: entry[1],
                title: `Percentage of Food Servings That Are ${entry[0]}`,
                yLabel: 'Percent',
            });
        });
    }

    renderUniqueFoodChart() {
        const { summaryStats } = this.state;
        return this.renderChart({
            key: 'UniqueFood',
            data: caluclateNumUniqueFoods(summaryStats),
            title: `Number Of Unique Foods Per Day`,
            yLabel: 'Count',
        });
    }

    renderTotalFoodServingsChart() {
        const { summaryStats } = this.state;
        return this.renderChart({
            key: 'TotalFoodServings',
            data: calculateTotalMealsServed(summaryStats),
            title: `Total Menu Items Per Day`,
            yLabel: 'Count',
        });
    }

    renderTotalFoodServingsPerUniqueFoodChart() {
        const { summaryStats } = this.state;
        return this.renderChart({
            key: 'TotalFoodServingsPerUniqueFood',
            data: calculateMenuItemsPerUniqueFood(summaryStats),
            title: `Average Number Of Times A Food Appears Per Day`,
            yLabel: 'Count',
        });
    }

    renderTopFiveFoodsCharts() {
        const { summaryStats } = this.state;
        return Object.entries(calculateTopNFoodsByWeekday(summaryStats, 10)).map((entry) => {
            return (
                <TwoColumnList
                    title={entry[0]}
                    leftItems={entry[1].names}
                    rightItems={entry[1].counts.map((v) => !isFinite(v) ? 'never' : v.toFixed(2) + 'x')}
                    key={entry[0]}
                />
            );
        });
    }

    renderBottomFiveFoodsCharts() {
        const { summaryStats } = this.state;
        return Object.entries(calculateBottomNFoodsByWeekday(summaryStats, 10)).map((entry) => {
            return (
                <TwoColumnList
                    title={entry[0]}
                    leftItems={entry[1].names}
                    rightItems={entry[1].counts.map((v) => !isFinite(v) ? 'never' : v.toFixed(2) + 'x')}
                    key={entry[0]}
                />
            );
        });
    }

    renderError() {
        const { error } = this.state;
        return (
            <div className="ChartContainer" style={{ color: 'black', fontSize: '18px', height: '80vh', verticalAlign: 'middle', lineHeight: '80vh' }}>
                {typeof (error) === 'string' ? error : "Something went wrong :("}
            </div>
        );
    }

    render() {
        const { summaryStats, error } = this.state;
        if (error !== null) {
            return this.renderError();
        }
        if (!summaryStats) {
            return (<div>Loading...</div>);
        }
        const weekdaysTopFiveFoods = this.renderTopFiveFoodsCharts();
        const weekdaysBottomFiveFoods = this.renderBottomFiveFoodsCharts();
        const attributeCharts = this.renderAttributeCharts();
        const allergenCharts = this.renderAllergenCharts();
        const uniqueFoodsChart = this.renderUniqueFoodChart();
        const totalFoodServingsChart = this.renderTotalFoodServingsChart();
        const totalMenuItemsPerUniqueFoodChart = this.renderTotalFoodServingsPerUniqueFoodChart();
        const overallCharts = [uniqueFoodsChart, totalFoodServingsChart, totalMenuItemsPerUniqueFoodChart];
        const overallDesc = (<p>A "menu item" is one listing of a food on a menu<br />Foods can be listed mutliple times per day(and meal)</p>)
        const mostServedDesc = (<p>How many times more than average is a food served on a certain day of the week?<br />Notice taco Tuesday and that each day has a special soup</p>);
        const leastServedDesc = (<p>How many times less than average is a food served on a certain day of the week?<br />"never" means the item has never been served on that day<br />Notice meatless(beefless?) Mondays and healthy(?) breakfasts on Tuesday</p>);
        const attributeDesc = (<p>Strange looking areas are usually due to the dinings halls being closed</p>)
        return withTableOfContents([
            (<Section title={'Overall Counts'} id={'OverallCounts'} description={overallDesc} key={1}>{overallCharts}</Section>),
            (<Section title={'Most Served By Day Of The Week'} id={'TopByDay'} description={mostServedDesc} key={4}>{weekdaysTopFiveFoods}</Section>),
            (<Section title={'Least Served By Day Of The Week'} id={'BottomByDay'} description={leastServedDesc} key={5}>{weekdaysBottomFiveFoods}</Section>),
            (<Section title={'Attribute Metrics'} id={'Attributes'} description={attributeDesc} key={2}>{attributeCharts}</Section>),
            (<Section title={'Allergen Metrics'} id={'Allergens'} key={3}>{allergenCharts}</Section>),
        ], 'Sections');
    }
}

export default ChartContainer;
