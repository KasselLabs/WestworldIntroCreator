import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Loader from './Loader';

import { requestDownload } from '../api/queueApi';

class EmailRequestField extends Component {
  static propTypes = {
    buttonLabel: PropTypes.string,
    match: PropTypes.object,
    history: PropTypes.object,
    donate: PropTypes.bool,
  }

  constructor() {
    super();

    this.emailField = React.createRef();
  }

  state = {
    isLoading: false,
    hasError: false,
  }

  goToNextPage = () => {
    const { match, history, donate } = this.props;
    const { openingKey } = match.params;

    if (donate) {
      history.push(`/${openingKey}/download/paid`);
      return;
    }

    history.push(`/${openingKey}/download/requested`);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { match } = this.props;
    const { openingKey } = match.params;
    const email = this.emailField.current.value;

    this.setState({
      isLoading: true,
      hasError: false,
    });

    try {
      await requestDownload(openingKey, email);
      this.goToNextPage();
    } catch (error) {
      this.setState({
        isLoading: false,
        hasError: true,
      });
    }
  }

  render() {
    const { buttonLabel = 'SUBMIT REQUEST' } = this.props;
    const { isLoading, hasError } = this.state;

    const classnames = `button medium has-loader ${isLoading ? 'loading' : ''}`;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="email"
          type="email"
          name="email"
          id="email"
          placeholder="Insert your email here..."
          ref={this.emailField}
          required
        />
        {hasError && <p style={{ marginBottom: 0 }}>Error has occured, please try again!</p>}
        <button className={classnames} style={{ marginTop: '20px' }}>
          <Loader />
          {buttonLabel}
        </button>
      </form>
    );
  }
}

export default withRouter(EmailRequestField);
