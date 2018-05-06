import React from 'react';
import PropTypes from 'prop-types';

const PageContainer = ({ children }) => (
  <div className="page-container">
    <div className="background-image" />
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
