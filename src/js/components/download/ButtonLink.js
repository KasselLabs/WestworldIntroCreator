import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ButtonLink = ({ children, className, to }) => (
  <Link to={to} style={{ display: 'inline-block' }}>
    <button className={className}>
      {children}
    </button>
  </Link>
);

ButtonLink.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
};

export default ButtonLink;
