import React from 'react';
import { GoMarkGithub } from "react-icons/go";

const githubUrl = 'https://github.com/anders617/tendiestime';

const Footer = (props) => {
    return (
        <div className="Footer" style={{ margin: '10px' }}>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#000000', textDecoration: 'none' }}>
                <GoMarkGithub size={32} />
                <p style={{fontSize: '8pt', fontWeight: '600', marginTop: '2px'}}>
                    View Me On Github
                </p>
            </a>
            <p style={{fontSize: '8pt', fontWeight: '600'}}>
                &copy; 2019 Anders Boberg
            </p>
        </div>
    );
}

export default Footer;
