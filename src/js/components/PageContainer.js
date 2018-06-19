import React from 'react';
import PropTypes from 'prop-types';

import NavBar from './NavBar';
import stic from '../../assets/img/stic.jpg';
import swic from '../../assets/img/swic.jpg';

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
  </div>
);

PageContainer.propTypes = {
  children: PropTypes.node,
};

export default PageContainer;
