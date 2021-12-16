import React, { useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import Loader from '../download/Loader';
import { paymentPageUrl } from '../api/config';
import DownloadPageContainer from '../download/DownloadPageContainer';
import ContactButton from '../common/ContactButton';
import TermsOfServiceAcceptance from '../common/TermsOfServiceAcceptance';
import EmailRequestField from '../download/EmailRequestField';
import DonationOptions from '../DonationOptions';

const DonateDownloadPage = ({ match }) => {
  const { params } = match;
  const { openingKey } = params;
  const iframeRef = useRef(null);

  const updatePaymentAmount = useCallback((amount) => {
    if (!iframeRef.current) {
      return;
    }

    iframeRef.current.contentWindow.postMessage({ action: 'setAmount', payload: amount }, '*');
  }, []);

  useEffect(() => {
    const handleTrackPaymentsEventCallback = (event) => {
      if (!event.origin.match(/https:\/\/payment\.kassellabs\.io$/)) {
        return;
      }

      const { data } = event;
      const isPaymentSuccess = data && 'success' === data.action && 'payment' === data.type;
      if (isPaymentSuccess && window.dataLayer) {
        window.dataLayer.push({
          event: 'purchase',
          value: data.payload.finalAmount,
          currency: data.payload.currency,
        });
      }
    };

    window.addEventListener('message', handleTrackPaymentsEventCallback);
    return () => {
      window.removeEventListener('message', handleTrackPaymentsEventCallback);
    };
  }, []);

  return (
    <DownloadPageContainer title="DONATE AND DOWNLOAD">
      <p>
        Great choice! You can donate the amount for the following options:
        <DonationOptions
          updatePaymentAmount={updatePaymentAmount}
        />
      </p>
      <div className="compose-iframe">
        <div className="center center-content">
          <Loader />
        </div>
        <iframe
          ref={iframeRef}
          className="stripe"
          id="stripeDonateIframe"
          title="Stripe Payment Form"
          src={`${paymentPageUrl}?embed=true&app=westworld&code=${openingKey}&amount=2000`}
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
