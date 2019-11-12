import React from "react";
import { Icon, Badge, Button } from "antd";

const Heart = ({ count, onClick }) => {
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
                onClick={() => onClick()}
            >
                {icon}
            </Button>
        </Badge>
    );
};

export default Heart;
