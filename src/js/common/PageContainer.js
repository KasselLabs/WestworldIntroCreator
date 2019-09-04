import React from 'react';
import PropTypes from 'prop-types';

import NavBar from './NavBar';

const PageContainer = ({ children }) => (
  <div className="page-container">
    <div className="background-image" />
    <NavBar />
    <div className="center-content">
      <h1 className="app-title">WESTWORLD INTRO CREATOR</h1>
      <div>
        {children}
      </div>
    </div>
    <div className="share-buttons">
      <a href="http://www.facebook.com/sharer.php?u=https://westworldintrocreator.kassellabs.io/" target="_blank" rel="noopener noreferrer">
        <img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" width="40" />
      </a>
      <a href="https://twitter.com/share?url=https://westworldintrocreator.kassellabs.io/&amp;text=Check%20out%20the%20Westworld%20Intro%20Creator!%20@KasselLabs&amp;hashtags=Westworld,KasselLabs" target="_blank" rel="noopener noreferrer">
        <img src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" width="40" />
      </a>
    </div>
  </div>
);

PageContainer.propTypes = {
  children: PropTypes.node,
};

export default PageContainer;
