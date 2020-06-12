import React from 'react';

const cardStyle = {
    backgroundColor: '#32deaa',
    maxWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    borderRadius: '10px'
};

export default function ({style={}, children}) {
    return (
        <div style={Object.assign({}, cardStyle, style)}>
            {children}
        </div>
    );

};
