import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageContainer from './PageContainer';

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
      return (
        <PageContainer>
          <div className="box-page">
            <div className="box" >
              <h1 className="title">ERROR</h1>
              <p>We&apos;re sorry — something&apos;s gone wrong.</p>
              <p>
                We have been notified,
                but you can click on the button below to fill out a report with more information.
              </p>
              <p>Please try to reload the page.</p>
              <button className="button" onClick={() => Raven.lastEventId() && Raven.showReportDialog()}>REPORT</button>
            </div>
          </div>
        </PageContainer>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
