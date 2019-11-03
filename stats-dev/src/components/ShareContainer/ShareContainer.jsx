import React, { Component } from 'react';
import {
    // Buttons
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    RedditShareButton,
    TumblrShareButton,
    EmailShareButton,
    // Icons
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    TelegramIcon,
    WhatsappIcon,
    RedditIcon,
    TumblrIcon,
    EmailIcon,
} from 'react-share';

const buttonStyle = {
    margin: '3px',
    cursor: 'pointer',
};

const ShareContainer = ({ url, size = 32, round = true, title = '', body = '' }) => {
    return (
        <div className="ShareContainer" style={{display: 'flex', justifyContent: 'center'}}>
            <FacebookShareButton 
                url={url} 
                quote={title}
                style={buttonStyle}
            >
                <FacebookIcon size={size} round={round} />
            </FacebookShareButton>
            <LinkedinShareButton 
                url={url} 
                windowWidth={750}
                windowHeight={600}
                style={buttonStyle}
            >
                <LinkedinIcon size={size} round={round} />
            </LinkedinShareButton>
            <TwitterShareButton 
                url={url} 
                title={title}
                style={buttonStyle}
            >
                <TwitterIcon size={size} round={round} />
            </TwitterShareButton>
            <TelegramShareButton 
                url={url} 
                title={title}
                style={buttonStyle}
            >
                <TelegramIcon size={size} round={round} />
            </TelegramShareButton>
            <WhatsappShareButton 
                url={url} 
                title={title}
                separator={':: '}
                style={buttonStyle}
            >
                <WhatsappIcon size={size} round={round} />
            </WhatsappShareButton>
            <RedditShareButton 
                url={url} 
                title={title}
                windowWidth={660}
                windowHeight={460}
                style={buttonStyle}
            >
                <RedditIcon size={size} round={round} />
            </RedditShareButton>
            <TumblrShareButton 
                url={url} 
                title={title}
                windowWidth={660}
                windowHeight={460}
                style={buttonStyle}
            >
                <TumblrIcon size={size} round={round} />
            </TumblrShareButton>
            <EmailShareButton 
                url={url} 
                subject={title}
                body={body}
                style={buttonStyle}
            >
                <EmailIcon size={size} round={round} />
            </EmailShareButton>
        </div>
    )
}

export default ShareContainer;
