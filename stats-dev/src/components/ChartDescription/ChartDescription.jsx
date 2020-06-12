import React from 'react';

const headerStyle = { 
    fontSize: '12pt', 
    fontWeight: '400',
    color: 'gray'
};

export default function({style={}, text = null}) {
    if (!text) return ('')
    return (
        <header className="ChartDescription" style={Object.assign({}, headerStyle, style)}>
            {text}
        </header>
    );
};
