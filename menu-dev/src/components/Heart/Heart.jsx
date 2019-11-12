import React from "react";
import { Icon, Badge, Button } from "antd";

import mdiningclient from '../../api/mdiningservice';
import { HeartsRequest } from 'mdining-proto';

class Heart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    componentDidMount() {
        this.fetchHearts();
    }

    fetchHearts() {
        const { food } = this.props;
        const req = new HeartsRequest();
        req.addKeys(food);
        mdiningclient.getHearts(req)
            .then((res) => this.updateCount(res))
            .catch((err) => console.log(err));
    }

    addHeart() {
        const { food } = this.props;
        const req = new HeartsRequest();
        req.addKeys(food);
        mdiningclient.addHeart(req)
            .then((res) => this.updateCount(res))
            .catch((err) => console.log(err));
    }

    componentDidUpdate(oldProps) {
        if (this.props.food !== oldProps.food) {
            this.fetchHearts();
        }
    }

    updateCount(heartsReply) {
        const { food } = this.props;
        heartsReply.getCountsList().forEach((count) => {
            if (count.getKey() === food) {
                this.setState({ count: count.getCount() });
            }
        });
    }

    render() {
        const { count } = this.state;
        const icon = (
            <Icon
                type="heart"
                theme="filled"
                style={{
                    color: "red",
                    fontSize: "26px",
                    lineHeight: "26px",
                    paddingTop: "4px"
                }}
            />
        );
        return (
            <Badge
                count={count}
                overflowCount={99999999}
                offset={[-5 + 3.5 * Math.floor(Math.log10(count)), 5]}
            >
                <Button
                    size="large"
                    shape="circle"
                    type="danger"
                    ghost
                    style={{ padding: '0px', margin: '5px', paddingTop: '1px' }}
                    onClick={() => this.addHeart()}
                >
                    {icon}
                </Button>
            </Badge>
        );
    }
}

export default Heart;
