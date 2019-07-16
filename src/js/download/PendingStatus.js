import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import ContactButton from '../common/ContactButton';
import TermsOfServiceAcceptance from '../common/TermsOfServiceAcceptance';
import DonateOrNotDonate from './DonateOrNotDonate';

import calculateEta from '../api/calculateEta';

const PendingStatus = ({ match, status: { status, queueSize, position } }) => {
  const { openingKey } = match.params;

  const isNotQueued = 'not_queued' === status;

  const queuePosition = isNotQueued ? (queueSize + 1) : position;
  const numberOfRequestsBefore = isNotQueued ? queueSize : position;

  const etaText = calculateEta(queuePosition);

  const statusDescription = isNotQueued ?
    (
      <p>
        You can now request a download of your creation as a video,
        which you can play anywhere, put it in a slideshow or
        edit it in a movie editor, for instance.
        The video will be rendered on our servers and when it{'\''}s ready,
        it will be sent to your email.
        We want to provide the video for free, but we have costs with the servers.
      </p>
    ) : (
      <p>
        This video is already in the queue to be rendered.
        This page will be updated when the video is ready.
        You can add more emails to receive the video,
        just follow the next page and add submit the request again with the new email.
      </p>
    );

  return (
    <Fragment>
      {statusDescription}
      <p>
        There are <span className="bold">{numberOfRequestsBefore} videos</span> in front of you
        to be rendered and may take up to <span className="bold">{etaText}</span> to send your video.
      </p>
      <p>
        Can{'\''}t wait for it? Donate at least <span className="bold">10 US Dollars</span> to support
        our service and your video will be ready in few hours (2 hours usually).
        The video is rendered in Full HD quality.
      </p>
      <p>
        You can donate via Credit Card or PayPal.
        If you don{'\''}t receive the video please contact us via email so we can check it out.
      </p>
      {isNotQueued && (
      <p>
        <span className="bold">Attention!</span>
        Before sending the download request make sure there are no typos in your text
        to grant that your video will be with the correct text.{' '}
        <Link to={`/${openingKey}/edit`}>Click here to go back and check your text.</Link>
      </p>
      )}
      <ContactButton />
      <TermsOfServiceAcceptance />
      <DonateOrNotDonate />
    </Fragment>
  );
};

PendingStatus.propTypes = {
  match: PropTypes.object,
  status: PropTypes.shape({
    queueSize: PropTypes.number,
  }),
};

export default withRouter(PendingStatus);
