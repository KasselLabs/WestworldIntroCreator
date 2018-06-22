import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.any,
  }
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Raven.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.error) {
      // render fallback UI
      return (
        <div className="box-page">
          <div className="box" >
            <h1 className="title">ERROR</h1>
            <p>We&apos;re sorry — something&apos;s gone wrong.</p>
            <p>Our team has been notified, but you can click on the button below to fill out a report with more information.</p>
            <p>Please try to reload the page.</p>
            <button className="button" onClick={() => Raven.lastEventId() && Raven.showReportDialog()}>REPORT</button>
          </div>
        </div>
      );
    }
    // when there's not an error, render children untouched
    return this.props.children;
  }
}

export default ErrorBoundary;
