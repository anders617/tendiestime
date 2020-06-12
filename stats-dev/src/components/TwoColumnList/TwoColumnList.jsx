import React from 'react';

import Card from '../Card/Card';

const ListEntry = ({ leftText, rightText, key }) => {
    return (
        <li key={key} style={{ display: 'list-item', padding: 0, margin: 0, width: '100%' }}>
            <div style={{ margin: 0, padding: 0, float: 'left' }}>
                {leftText}
            </div>
            <div style={{ margin: 0, padding: 0, marginLeft: '10px', float: 'right' }}>
                {rightText}
            </div>
        </li>
    );
}

const titleStyle = {
    fontSize: '18pt',
    fontWeight: '600',
    textAlign: 'center',
};

const listStyle = {
    listStyleType: 'decimal',
    textAlign: 'left',
    padding: 0,
    margin: 0,
    marginLeft: '20px',
    marginTop: '5px',
};

const cardStyle = {
    maxWidth: '360px',
    padding: '15px',
    margin: '10px',
    borderRadius: '10px',
    color: 'white',
};

export default function ({ key = null, leftItems, rightItems, title, style={} }) {
    const items = leftItems.map((leftItem, idx) => (<ListEntry key={idx} leftText={leftItem} rightText={rightItems[idx]} />));
    return (
        <Card style={Object.assign({}, cardStyle, style)}>
            <span style={titleStyle}>{title}</span>
            <ol style={listStyle}>
                {items}
            </ol>
        </Card>
    );
};
