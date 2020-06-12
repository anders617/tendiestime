import React from 'react';
import { GoMarkGithub } from "react-icons/go";

const githubUrl = 'https://github.com/anders617/tendiestime';
const websiteUrl = 'https://andersboberg.com';

const linkStyle = {
    color: '#000000', 
    textDecoration: 'none',
};

const Footer = (props) => {
    return (
        <div className="Footer" style={{ margin: '10px' }}>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                <GoMarkGithub size={32} />
                <p style={{fontSize: '8pt', fontWeight: '600', marginTop: '2px'}}>
                    View Me On Github
                </p>
            </a>
            <p style={{fontSize: '8pt', fontWeight: '600'}}>
                &copy; 2019-2020 <a href={websiteUrl} target="_blank" rel="noopener noreferrer" style={linkStyle} >Anders Boberg</a>
            </p>
        </div>
    );
}

export default Footer;
