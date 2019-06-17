import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Loader from '../Loader';

import { requestDownload } from '../../api/queueApi';

class EmailRequestField extends Component {
  static propTypes = {
    buttonlabel: PropTypes.string,
    match: PropTypes.object,
  }

  constructor() {
    super();

    this.emailField = React.createRef();
  }

  state = {
    isLoading: false,
    hasError: false,
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { openingKey } = this.props.match.params;
    const email = this.emailField.current.value;

    this.setState({
      isLoading: true,
      hasError: false,
    });
    try {
      await requestDownload(openingKey, email);
    } catch (error) {
      this.setState({
        isLoading: false,
        hasError: true,
      });
    }

    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { buttonlabel = 'SUBMIT REQUEST' } = this.props;
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
          {buttonlabel}
        </button>
      </form>
    );
  }
}

export default withRouter(EmailRequestField);
