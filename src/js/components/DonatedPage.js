import React from 'react';
import PropTypes from 'prop-types';

import ContactButton from './ContactButton';
import TermsOfServiceAcceptance from './TermsOfServiceAcceptance';
import ShowRequestedEmail from './download/ShowRequestedEmail';
import DownloadPageContainer from './download/DownloadPageContainer';
import ButtonLink from './download/ButtonLink';

const DonatedPage = ({ match }) => {
  const { params } = match;
  const { openingKey } = params;
  return (
    <DownloadPageContainer title="DONATE AND DOWNLOAD">
      <p>// TODO Check Donation</p>
      <p>
        Thank you so much for supporting us!
        Your video should be rendered soon when your donation is confirmed!
      </p>
      <p>
        When your donation is confirmed you should receive
        the confirmation message from us within a few minutes
        in your email.
        Don{'\''}t forget to check your spam box.
        If you don{'\''}t receive it, please check
        if the donation went successfully or contact us:{' '}
        <ContactButton customText="" />
      </p>
      <p>
        If you didn{'\''}t donate yet, click on the button below to make your donation:
      </p>
      <div className="center-content">
        <ButtonLink to={`/${openingKey}/download/donate`} className="button small-medium">
          DONATE
        </ButtonLink>
      </div>
      <ShowRequestedEmail />
      <p>
        You can add more emails to receive the video if you want.
        The link to download will also be available on this page when it{'\''}s ready.
      </p>

      <TermsOfServiceAcceptance />
      <div className="center-content horizontal">
        <ButtonLink to={`/${openingKey}/edit`} className="button small-medium">
          OK
        </ButtonLink>
        <ButtonLink to={`/${openingKey}/download/add_email`} className="button small-medium" style={{ marginLeft: '20px' }}>
          ADD ANOTHER EMAIL
        </ButtonLink>
      </div>
    </DownloadPageContainer>
  );
};

DonatedPage.propTypes = {
  match: PropTypes.object,
};

export default DonatedPage;
