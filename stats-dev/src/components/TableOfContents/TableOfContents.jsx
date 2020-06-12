import React from 'react';
import Tilt from 'react-tilt';

import Card from '../Card/Card';

const linkStyle = {
    marginBottom: '10px',
    marginLeft: '20px',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 600
};

const Link = ({ href, title, id }) => {
    return (
        <a id={id} href={href} style={linkStyle}>
            {title}
        </a>
    );
};

const tableOfContentsStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px'
};

const tiltStyle = {
    flexBasis: '300px',
};

const headerStyle = {
    marginLeft: '15px',
    marginBottom: '10px'
};

const TableOfContents = ({ hrefs, sections, title }) => {
    const links = hrefs.map((href, idx) => (<Link href={href} title={sections[idx]} key={idx} />));
    return (
        <div className="TableOfContents" style={tableOfContentsStyle}>
            <Tilt className="Tilt" options={{ max: 5, scale: 1.05 }} style={tiltStyle}>
                <Card style={{paddingBottom: '10px', maxWidth: '300px'}}>
                    <h3 style={headerStyle}>{title}</h3>
                    {links}
                </Card>
            </Tilt>
        </div>
    );
};

const withTableOfContents = (sections, title) => {
    let hrefs = [];
    let titles = [];
    sections.forEach((section) => {
        const { id, title } = section.props;
        hrefs.push(`#${id}`);
        titles.push(title);
    });
    return (
        <React.Fragment>
            <TableOfContents hrefs={hrefs} sections={titles} title={title} />
            {sections}
        </React.Fragment>
    );
};

export { withTableOfContents };
export default TableOfContents;
