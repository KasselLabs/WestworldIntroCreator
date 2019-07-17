import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TermsOfServiceAcceptance from '../common/TermsOfServiceAcceptance';
import ShowRequestedEmail from './ShowRequestedEmail';
import ButtonLink from '../common/ButtonLink';

const RequestedPagesFooter = ({ openingKey }) => (
  <Fragment>
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
  </Fragment>
);

RequestedPagesFooter.propTypes = {
  openingKey: PropTypes.string,
};

export default RequestedPagesFooter;
