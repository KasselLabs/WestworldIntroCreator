import React from 'react';
import PropTypes from 'prop-types';

import kasselLogo from '../../assets/img/KasselLabsLogo.png';

const PageContainer = ({ children }) => (
  <div className="page-container">
    <div className="background-image" />
    <div className="kasselLogo">
      <a href="https://kassellabs.io" target="_blank" rel="noopener noreferrer">
        <img src={kasselLogo} alt="Kassel Labs" height="20" />
      </a>
    </div>
    <div className="center-content">
      <h1 className="app-title">WESTWORLD<br />INTRO CREATOR</h1>
      <div>
        {children}
      </div>
    </div>
  </div>
);

PageContainer.propTypes = {
  children: PropTypes.node,
};

export default PageContainer;
