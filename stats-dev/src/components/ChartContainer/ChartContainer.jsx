import React, { Component } from 'react';
import DateLineChart from '../DateLineChart/DateLineChart';

import { FoodStatsRequest, AllRequest } from '../../proto/mdining_pb';
import mDiningService from '../..//api/mdiningservice';

class ChartContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodStats: [],
            error: null,
        };
    }

    componentDidMount() {
        mDiningService.getFoodStats(new FoodStatsRequest())
            .then((res) => {
                this.setState({foodStats: res.getFoodstatsList(), error: null});
            }).catch((error) => {
                this.setState({foodStats: [], error});
            });
    }

    render() {
        const { foodStats, error } = this.state;
        if (error !== null) {
            return (
                <div className="ChartContainer" style={{color: 'white', fontSize: '36px', height: '80vh', verticalAlign: 'middle', lineHeight: '80vh'}}>
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
        const charts = attributes.map((attribute) => {
            const data = foodStats.map((stat) => {
                const attributes = stat.getAttributecountsMap();
                const totalFoodMealsServed = stat.getTotalfoodmealsserved();
                return {
                    x: new Date(stat.getDate()),
                    y: 100 * attributes.get(attribute) / totalFoodMealsServed,
                };
            });
            data.sort((a, b) => a.x - b.x);
            return (<DateLineChart key={attribute} width={'45vw'} height={'30vw'} data={data} title={`Percentage of Food Servings That Are ${attribute}`} />)
        })
        return (
           <div className="ChartContainer" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', alignContent: 'space-around', width: '100vw'}}>
               {charts}
           </div>
        );
    }
}

export default ChartContainer;
