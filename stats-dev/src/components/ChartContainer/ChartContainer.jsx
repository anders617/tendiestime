import React, { Component } from 'react';
import Tilt from 'react-tilt';
import { FoodStatsRequest } from 'mdining-proto';

import DateLineChart from '../DateLineChart/DateLineChart';
import mDiningClient from '../../api/mdiningservice';

class ChartContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodStats: [],
            error: null,
        };
    }

    componentDidMount() {
        mDiningClient.getFoodStats(new FoodStatsRequest())
            .then((res) => {
                this.setState({ foodStats: res.getFoodstatsList(), error: null });
            }).catch((error) => {
                this.setState({ foodStats: [], error });
            });
    }

    render() {
        const { foodStats, error } = this.state;
        if (error !== null) {
            return (
                <div className="ChartContainer" style={{ color: 'white', fontSize: '36px', height: '80vh', verticalAlign: 'middle', lineHeight: '80vh' }}>
                    {"Something went wrong :("}
                </div>
            );
        }
        const attributes = [];
        if (foodStats.length > 0) {
            foodStats[0].getAttributecountsMap().forEach((count, attr) => {
                attributes.push(attr);
            });
        }
        const attributeCharts = attributes.map((attribute) => {
            const data = foodStats.map((stat) => {
                const attributes = stat.getAttributecountsMap();
                const totalFoodMealsServed = stat.getTotalfoodmealsserved();
                let attributeCount = attributes.get(attribute)
                if (isNaN(attributeCount)) {
                    attributeCount = 0;
                }
                return {
                    x: new Date(stat.getDate()),
                    y: 100 * attributeCount / totalFoodMealsServed,
                };
            });
            data.sort((a, b) => a.x - b.x);
            return (<DateLineChart key={attribute} width={'45vw'} height={'260px'} data={data} title={`Percentage of Food Servings That Are ${attribute}`} />)
        });
        const allergens = [];
        if (foodStats.length > 0) {
            foodStats[0].getAllergencountsMap().forEach((count, allergen) => {
                allergens.push(allergen);
            });
        }
        const allergenCharts = allergens.map((allergen) => {
            const data = foodStats.map((stat) => {
                const allergensMap = stat.getAllergencountsMap();
                const totalFoodMealsServed = stat.getTotalfoodmealsserved();
                let allergenCount = allergensMap.get(allergen);
                if (isNaN(allergenCount)) {
                    // If NaN then it isn't in the map which means there were no instances of it.
                    allergenCount = 0;
                }
                return {
                    x: new Date(stat.getDate()),
                    y: 100 * allergenCount / totalFoodMealsServed,
                };
            });
            data.sort((a, b) => a.x - b.x);
            return (<DateLineChart key={allergen} width={'45vw'} height={'260px'} data={data} title={`Percentage of Food Servings That Contain ${allergen}`} />)
        });
        return (
            <React.Fragment>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'}}>
                    <Tilt className="Tilt" options={{ max: 5, scale: 1.05 }} style={{ flexBasis: '200px'}}>
                        <div style={{ backgroundColor: '#32deaa', maxWidth: '200px', display: 'flex', flexDirection: 'column', alignItems: 'start', borderRadius: '10px' }}>
                            <h3 style={{ marginLeft: '15px', marginBottom: '10px' }}>Sections</h3>
                            <a href="#Attributes" style={{ marginBottom: '10px', marginLeft: '20px', color: 'white', textDecoration: 'none', fontWeight: 600 }}>Attributes</a>
                            <a href="#Allergens" style={{ marginBottom: '20px', marginLeft: '20px', color: 'white', textDecoration: 'none', fontWeight: 600 }}>Allergens</a>
                        </div>
                    </Tilt>
                </div>
                <header className="AttributeChartsHeader" id="Attributes" style={{ fontSize: '20pt', fontWeight: '600' }}>Attribute Metrics</header>
                <div className="AttributeChartContainer" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', alignContent: 'space-around', width: '100vw' }}>
                    {attributeCharts}
                </div>
                <header className="AllergenChartsHeader" id="Allergens" style={{ fontSize: '20pt', fontWeight: '600' }}>Allergen Metrics</header>
                <div className="AllergenChartContainer" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', alignContent: 'space-around', width: '100vw' }}>
                    {allergenCharts}
                </div>
            </React.Fragment>
        );
    }
}

export default ChartContainer;
