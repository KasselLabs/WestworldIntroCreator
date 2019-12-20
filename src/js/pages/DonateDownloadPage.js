import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../download/Loader';
import { paymentPageUrl } from '../api/config';
import DownloadPageContainer from '../download/DownloadPageContainer';
import ContactButton from '../common/ContactButton';
import TermsOfServiceAcceptance from '../common/TermsOfServiceAcceptance';
import EmailRequestField from '../download/EmailRequestField';

const DonateDownloadPage = ({ match }) => {
  const { params } = match;
  const { openingKey } = params;

  return (
    <DownloadPageContainer title="DONATE AND DOWNLOAD">
      <p>
        Great choice! You can donate the amount for the following options:
        <ul>
          <li><span className="bold">10 US Dollars</span>: minimum to receive the video earlier.</li>
          <li><span className="bold">20 US Dollars</span>: receive the video without the logo watermark.</li>
        </ul>
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
      <EmailRequestField donate />
    </DownloadPageContainer>
  );
};

DonateDownloadPage.propTypes = {
  match: PropTypes.object,
};

export default DonateDownloadPage;
