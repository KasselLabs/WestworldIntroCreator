import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import PageContainer from './PageContainer';
import ContactButton from './ContactButton';
import TermsOfServiceAcceptance from './TermsOfServiceAcceptance';

class DonatePage extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  _backButton = () => {
    this.props.history.goBack();
  }

  render() {
    const { history } = this.props;
    const hasHistory = history.length > 1;
    return (
      <PageContainer>
        <div className="donate-page">
          <div className="box">
            <h1 className="title">DONATE</h1>
            <p>
              Thanks for your interest in supporting the service.
              You can donate via PayPal using the button below.
              Leave us a message with your donation, we will be happy to hear from you!
            </p>

            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input type="hidden" name="hosted_button_id" value="9Y4V9P7GQ6RBA" />
              <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
              <img alt="" border="0" src="https://www.paypalobjects.com/pt_BR/i/scr/pixel.gif" width="1" height="1" />
            </form>

            <div>
              <TermsOfServiceAcceptance />
              <ContactButton />
            </div>
            {hasHistory &&
              <button className="button" onClick={this._backButton}>BACK</button>
            }
          </div>
        </div>
      </PageContainer>
    );
  }
}

export default withRouter(DonatePage);
