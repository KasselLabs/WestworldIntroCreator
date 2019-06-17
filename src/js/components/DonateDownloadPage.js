import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loader from './Loader';
import { paymentPageUrl } from '../api/config';
import DownloadPageContainer from './download/DownloadPageContainer';
import ContactButton from './ContactButton';
import TermsOfServiceAcceptance from './TermsOfServiceAcceptance';
import EmailRequestField from './download/EmailRequestField';

// eslint-disable-next-line react/prefer-stateless-function
class DonateDownloadPage extends Component {
  render() {
    const { match: { params } } = this.props;
    const { openingKey } = params;

    return (
      <DownloadPageContainer title="DONATE AND DOWNLOAD">
        <p>
          Great choice! You can donate how much you want but there
          is the minimum of <span className="bold">10 US Dollars</span> to receive the video.
        </p>
        <div className="compose-iframe">
          <div className="center center-content">
            <Loader />
          </div>
          <iframe
            className="stripe"
            id="stripeDonateIframe"
            title="Stripe Payment Form"
            src={`${paymentPageUrl}?embed=true&app=westworld&code=${openingKey}`}
            allowpaymentrequest="true"
          />
        </div>
        <p>
          You will receive the confirmation and the video
          on the email you put in the form above.
          Please, confirm your email below.
        </p>
        <ContactButton />
        <TermsOfServiceAcceptance />
        <EmailRequestField />
      </DownloadPageContainer>
    );
  }
}

DonateDownloadPage.propTypes = {
  match: PropTypes.object,
};

export default DonateDownloadPage;
