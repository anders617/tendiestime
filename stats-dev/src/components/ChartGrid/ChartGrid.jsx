import React from 'react';

const gridStyle = { 
    display: 'flex', 
    flexWrap: 'wrap', 
    justifyContent: 'space-evenly', 
    alignContent: 'space-around', 
    width: '100vw' 
};

export default function({children, style={}}) {
    return (
        <div className="ChartGrid" style={Object.assign({}, gridStyle, style)}>
            {children}
        </div>
    );
};
