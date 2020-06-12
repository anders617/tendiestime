import React from 'react';

const headerStyle = { 
    fontSize: '20pt', 
    fontWeight: '600' 
};

export default function({id, style={}, title}) {
    return (
        <header className="ChartHeader" id={id} style={Object.assign({}, headerStyle, style)}>
            {title}
        </header>
    );
};
