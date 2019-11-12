import React, { Component } from 'react';
import moment from 'moment';
import { BrowserView, MobileView, } from "react-device-detect";
import { Row, Col, Card, Spin, Icon, DatePicker, Radio } from 'antd';
import mdiningclient from '../../api/mdiningservice';
import { DiningHallsRequest, MenuRequest, HeartsRequest } from 'mdining-proto';
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
            heartCounts: {},
        };
        this.menuCache = {};
        this.heartStream = null;
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

    getHoursOfMenu(menu) {
        const { selectedDiningHall, selectedDate, diningHalls } = this.state;
        const dayEvent = diningHalls.length === 0 ? null : diningHalls[selectedDiningHall].getDayeventsList().find((dayEvent) => moment(dayEvent.getKey()).day() === selectedDate.day());
        const hours = !dayEvent ? null : dayEvent.getCalendareventList().find((event) => event.getEventtitle().toLowerCase() === menu.getMeal().toLowerCase());
        if (!hours) return null;
        return hours;
    }

    getStartTimeOfMenu(menu) {
        const hours = this.getHoursOfMenu(menu);
        if (!hours) return null;
        return moment(hours.getEventtimestart());
    }

    getEndTimeOfMenu(menu) {
        const hours = this.getHoursOfMenu(menu);
        if (!hours) return null;
        return moment(hours.getEventtimeend());
    }

    firstMenuWithCategories(menus) {
        const { selectedDate } = this.state;
        const now = moment();
        if (selectedDate.isSame(now, 'day')) {
            const withCategories = menus
                .map((menu, idx) => { return { idx, menu }; })
                .filter((item) => item.menu.getHascategories() && this.getEndTimeOfMenu(item.menu) && this.getEndTimeOfMenu(item.menu).isSameOrAfter(now));
            if (withCategories.length === 0) return 0;
            const closestMenuInTime = withCategories.sort((a, b) => {
                const aHours = this.getHoursOfMenu(a.menu);
                const bHours = this.getHoursOfMenu(b.menu);
                if (now.isAfter(moment(aHours.getEventtimestart()))) {
                    return -1;
                } else if (now.isAfter(moment(bHours.getEventtimestart()))) {
                    return 1;
                }
                return moment(aHours.getEventtimestart()).diff(now) - moment(bHours.getEventtimestart()).diff(now);
            })[0];
            return closestMenuInTime.idx;
        }
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
            this.setMenus(menus);
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
                this.setMenus(menus);
            })
            .catch((error) => console.log(error));
    }

    fetchHeartCountsForMenus(menus) {
        const req = new HeartsRequest();
        const names = menus
            .map((menu) => menu.getCategoryList())                  // List of list of category
            .reduce((a, b) => a.concat(b), [])                            // List of category
            .map((category) => category.getMenuitemList())          // List of list of menu items
            .reduce((a, b) => a.concat(b), [])                            // List of menu items
            .map((menuItem) => menuItem.getName().toLowerCase());   // List of names
        new Set(names).forEach((name) => req.addKeys(name));
        console.log(req);
        mdiningclient.getHearts(req)
            .then((res) => this.updateHeartCounts(res))
            .catch((err) => console.log(err));
    }

    setMenus(menus) {
        this.fetchHeartCountsForMenus(menus);
        this.stopListeningHearts();
        this.startListeningHeartsForMenus(menus);
        this.setState({ menus, selectedMenu: this.firstMenuWithCategories(menus), loading: false });
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

    onHeartClick(foodName) {
        const req = new HeartsRequest();
        req.addKeys(foodName);
        mdiningclient.addHeart(req)
            .then((res) => this.updateHeartCounts(res))
            .catch((err) => console.log(err));
    }

    updateHeartCounts(heartsReply) {
        const { heartCounts } = this.state;
        const newHeartCounts = { ...heartCounts };
        heartsReply.getCountsList().forEach((count) => newHeartCounts[count.getKey()] = count.getCount());
        this.setState({ heartCounts: newHeartCounts });
    }

    startListeningHeartsForMenus(menus) {
        const req = new HeartsRequest();
        const names = menus
            .map((menu) => menu.getCategoryList())                  // List of list of category
            .reduce((a, b) => a.concat(b), [])                            // List of category
            .map((category) => category.getMenuitemList())          // List of list of menu items
            .reduce((a, b) => a.concat(b), [])                            // List of menu items
            .map((menuItem) => menuItem.getName().toLowerCase());   // List of names
        new Set(names).forEach((name) => req.addKeys(name));
        this.heartStream = mdiningclient.streamHearts(req);
        this.heartStream.on('data', (res) => this.updateHeartCounts(res));
        this.heartStream.on('status', (status) => console.log(status));
        this.heartStream.on('error', (err) => console.log(err));
        this.heartStream.on('end', () => console.log('End of stream'));
    }

    stopListeningHearts() {
        if (this.heartStream !== null) {
            this.heartStream.cancel();
        }
        this.heartStream = null;
    }

    componentWillUnmount() {
        this.stopListeningHearts();
    }

    renderCategories() {
        const { selectedMenu, menus, heartCounts } = this.state;
        if (menus.length === 0) {
            return (<b>There's no data for this date :(</b>)
        }
        const menu = menus[selectedMenu];
        if (!menu.getHascategories()) {
            return (<b>{menu.getDescription()}</b>)
        }
        return menu.getCategoryList().map((category) => (<Category key={category.getName()} category={category} heartCounts={heartCounts} onHeartClick={(foodName) => this.onHeartClick(foodName)} />));
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
        const hours = diningHalls.length === 0 || menus.length === 0 ? null : this.getHoursOfMenu(menus[selectedMenu]);
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
            .map((menu, idx) => { return { idx, meal: menu.getMeal(), startTime: this.getStartTimeOfMenu(menu) }; })
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
