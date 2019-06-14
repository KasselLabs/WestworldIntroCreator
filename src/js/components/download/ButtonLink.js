import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class ButtonLink extends Component {
  static propTypes = {
    history: PropTypes.object,
    to: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any,
  }

  handleClick = () => {
    const { history, to } = this.props;
    history.push(to);
  }
  render() {
    const { children, className } = this.props;
    return (
      <button onClick={this.handleClick} className={className}>
        {children}
      </button>
    );
  }
}

export default withRouter(ButtonLink);
