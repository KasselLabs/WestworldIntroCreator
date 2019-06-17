import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ButtonLink = ({
  children,
  className,
  to,
  style,
}) => (
  <Link to={to} style={{ display: 'inline-block' }}>
    <button className={className} style={style}>
      {children}
    </button>
  </Link>
);

ButtonLink.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.object,
};

export default ButtonLink;
