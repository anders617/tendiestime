import React from 'react';

import ChartGrid from '../ChartGrid/ChartGrid';
import ChartHeader from '../ChartHeader/ChartHeader';
import ChartDescription from '../ChartDescription/ChartDescription';

export default ({title, id, children, description = null}) => {
    return (
        <React.Fragment>
            <ChartHeader title={title} id={id} />
            <ChartDescription text={description} />
            <ChartGrid>
                {children}
            </ChartGrid>
        </React.Fragment>
    );
};
