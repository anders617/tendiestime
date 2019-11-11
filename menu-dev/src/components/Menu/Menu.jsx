import React, { Component } from 'react';
import moment from 'moment';
import { BrowserView, MobileView, } from "react-device-detect";
import { Row, Col, Card, Spin, Icon, DatePicker, Radio } from 'antd';
import mdiningclient from '../../api/mdiningservice';
import { DiningHallsRequest, MenuRequest } from 'mdining-proto';
import Category from './Category';

const dateFormat = 'YYYY-MM-DD';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diningHalls: [],
            menus: [],
            selectedCampus: 'DINING HALLS',
            selectedDiningHall: 0,
            selectedDate: moment(),
            selectedMenu: 0,
            loading: true,
        };
        this.menuCache = {};
    }

    componentDidMount() {
        mdiningclient.getDiningHalls(new DiningHallsRequest())
            .then((diningHalls) => {
                const diningHallList = diningHalls.getDininghallsList();
                const bursleyIdx = diningHallList.findIndex((diningHall) => diningHall.getName() === 'Bursley Dining Hall');
                this.setState({ diningHalls: diningHallList, selectedDiningHall: bursleyIdx }, () => this.fetchMenu());
            })
            .catch((error) => console.log(error));
    }

    getStartTimeOfMeal(meal) {
        const { selectedDiningHall, selectedDate, diningHalls, menus } = this.state;
        const dayEvent = diningHalls.length === 0 || menus.length === 0 ? null : diningHalls[selectedDiningHall].getDayeventsList().find((dayEvent) => moment(dayEvent.getKey()).day() === selectedDate.day());
        const hours =  !dayEvent ? null : dayEvent.getCalendareventList().find((event) => event.getEventtitle().toLowerCase() === meal.toLowerCase());
        if (!hours) return null;
        return moment(hours.getEventtimestart());
    }

    firstMenuWithCategories(menus) {
        const idx = menus.findIndex((menu) => menu.getHascategories());
        if (idx === -1) return 0;
        return idx;
    }

    fetchMenu() {
        const { diningHalls, selectedCampus, selectedDiningHall, selectedDate } = this.state;
        if (diningHalls.length === 0) return;
        const cacheKey = selectedCampus + selectedDiningHall + selectedDate.format(dateFormat);
        if (this.menuCache.hasOwnProperty(cacheKey)) {
            const menus = this.menuCache[cacheKey];
            this.setState({ menus, selectedMenu: this.firstMenuWithCategories(menus) });
            return;
        }
        const req = new MenuRequest();
        req.setDate(selectedDate.format(dateFormat));
        req.setDininghall(diningHalls[selectedDiningHall].getName());
        req.setMeal(null);
        this.setState({ loading: true });
        mdiningclient.getMenu(req)
            .then((menu) => {
                const menus = menu.getMenusList()
                this.menuCache[cacheKey] = menus;
                this.setState({ menus, selectedMenu: this.firstMenuWithCategories(menus), loading: false });
            })
            .catch((error) => console.log(error));
    }

    onChangeDate(selectedDate) {
        this.setState({ selectedDate }, () => this.fetchMenu());
    }

    onChangeDiningHall(selectedDiningHall) {
        this.setState({ selectedDiningHall }, () => this.fetchMenu());
    }

    onChangeCampus(selectedCampus) {
        const { diningHalls } = this.state;
        const diningHallIndex = diningHalls.findIndex((diningHall) => diningHall.getCampus() === selectedCampus);
        this.setState({ selectedCampus, selectedDiningHall: diningHallIndex }, () => this.fetchMenu());
    }

    renderCategories() {
        const { selectedMenu, menus } = this.state;
        if (menus.length === 0) {
            return (<b>There's no data for this date :(</b>)
        }
        const menu = menus[selectedMenu];
        if (!menu.getHascategories()) {
            return (<b>{menu.getDescription()}</b>)
        }
        return menu.getCategoryList().map((category) => (<Category key={category.getName()} category={category} />));
    }

    render() {
        const { style } = this.props;
        const { selectedCampus, selectedDiningHall, selectedDate, selectedMenu, diningHalls, menus, loading } = this.state;
        const campusOptions = Array.from(new Set(diningHalls.map((diningHall) => diningHall.getCampus())))
            .sort((a, b) => a.localeCompare(b))
            .map((campus) => {
                return (<Radio.Button key={campus} value={campus}>{campus}</Radio.Button>)
            });
        const options = diningHalls
            .map((diningHall, idx) => { return { idx, diningHall }; })
            .sort((a, b) => a.diningHall.getName().localeCompare(b.diningHall.getName()))
            .filter((entry) => entry.diningHall.getCampus() === selectedCampus)
            .map((entry) => {
                return (
                    <Radio.Button style={{ minWidth: 205 }} key={entry.idx} value={entry.idx}>{entry.diningHall.getName()}</Radio.Button>
                );
            });
        const dayEvent = diningHalls.length === 0 || menus.length === 0 ? null : diningHalls[selectedDiningHall].getDayeventsList().find((dayEvent) => moment(dayEvent.getKey()).day() === selectedDate.day());
        const hours =  !dayEvent ? null : dayEvent.getCalendareventList().find((event) => event.getEventtitle().toLowerCase() === menus[selectedMenu].getMeal().toLowerCase() || (event.getEventtitle().toLowerCase() === 'open'));

        const startTime = hours ? moment(hours.getEventtimestart()) : moment();
        const endTime = hours ? moment(hours.getEventtimeend()) : moment();

        let timeDescriptionRelative = null;
        const startTimeDescription = startTime.format('h:mma');
        const endTimeDescription = endTime.format('h:mma');
        if (moment().isBetween(startTime.clone().subtract(24, 'hours'), endTime.clone().add(24, 'hours'))) {
            if (moment().isBefore(startTime)) {
                timeDescriptionRelative = 'Opens ' + startTime.fromNow();
            } else if (moment().isBefore(endTime)) {
                timeDescriptionRelative = 'Closes ' + endTime.fromNow();
            } else {
                timeDescriptionRelative = 'Closed ' + endTime.fromNow() + ' :(';
            }
        }
        const mealOptions = menus
            .map((menu, idx) => { return { idx, meal: menu.getMeal(), startTime: this.getStartTimeOfMeal(menu.getMeal()) }; })
            .sort((a, b) => {
                if (a.startTime && b.startTime) {
                    return a.startTime.isBefore(b.startTime) ? -1 : a.meal.localeCompare(b.meal);
                }
                if (a.startTime) {
                    return -1;
                }
                if (b.startTime) {
                    return 1;
                }
                return a.meal.localeCompare(b.meal);
            })
            .map((entry) => (<Radio.Button style={{ minWidth: 125 }} key={entry.idx} value={entry.idx}>{entry.meal}</Radio.Button>));
        return (
            <div className="Menu" style={style}>
                <Row type="flex" justify="center">
                    <Col span={23}>
                        <Card
                            style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.1)', borderRadius: '5px', padding: '0px' }}
                            bodyStyle={{ padding: '10px' }}
                        >
                            <Radio.Group
                                style={{ maxWidth: 800, margin: '5px' }}
                                value={selectedCampus}
                                buttonStyle="solid"
                                onChange={(e) => this.onChangeCampus(e.target.value)}
                            >
                                {campusOptions}
                            </Radio.Group>
                            <MobileView>
                                <input
                                    style={{ margin: '5px', fontSize: '16px' }}
                                    type="date"
                                    value={selectedDate.format(dateFormat)}
                                    onChange={(e) => this.onChangeDate(moment(e.target.value))}
                                />
                            </MobileView>
                            <BrowserView style={{ display: 'inline-block' }}>
                                <DatePicker
                                    style={{ margin: '5px' }}
                                    value={selectedDate}
                                    onChange={(selectedDate) => this.onChangeDate(selectedDate)}
                                    allowClear={false}
                                />
                            </BrowserView>
                            <Radio.Group
                                style={{ maxWidth: 800, margin: '5px' }}
                                value={selectedDiningHall}
                                buttonStyle="solid"
                                onChange={(e) => this.onChangeDiningHall(e.target.value)}
                            >
                                {options}
                            </Radio.Group>
                            <br />
                            <Radio.Group
                                style={{ maxWidth: 400, margin: '5px' }}
                                value={selectedMenu}
                                buttonStyle="solid"
                                onChange={(e) => this.setState({ selectedMenu: e.target.value })}
                            >
                                {mealOptions}
                            </Radio.Group>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Spin indicator={(<Icon type="loading" style={{ fontSize: 24 }} spin />)} spinning={loading}>
                    <Row type="flex" justify="center">
                        <Col span={23}>
                            <Card
                                style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.1)', borderRadius: '5px', padding: '0px' }}
                                bodyStyle={{ padding: '10px' }}
                            >
                                {hours ?
                                    (<p>
                                        {timeDescriptionRelative}
                                        <br />
                                        <i>Hours: {startTimeDescription} - {endTimeDescription}</i>
                                    </p>)
                                    : null}
                                {this.renderCategories()}
                            </Card>
                        </Col>
                    </Row>
                </Spin>
            </div>
        )
    }
}

export default Menu;
