import React from 'react';
import PropTypes from 'prop-types';

import ContactButton from '../common/ContactButton';
import DownloadPageContainer from '../download/DownloadPageContainer';
import RequestedPagesFooter from '../download/RequestedPagesFooter';
import ButtonLink from '../common/ButtonLink';
import CheckForDonation from '../download/CheckForDonation';

const DonatedPage = ({ match }) => {
  const { params } = match;
  const { openingKey } = params;
  return (
    <DownloadPageContainer title="DONATE AND DOWNLOAD">
      <CheckForDonation openingKey={openingKey} />
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

      <RequestedPagesFooter openingKey={openingKey} />

    </DownloadPageContainer>
  );
};

DonatedPage.propTypes = {
  match: PropTypes.object,
};

export default DonatedPage;
