import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import ContactButton from '../common/ContactButton';
import TermsOfServiceAcceptance from '../common/TermsOfServiceAcceptance';
import ButtonLink from '../common/ButtonLink';

const AfterVideoCard = ({ match }) => {
  const { openingKey } = match.params;
  return (
    <div className="after-video-card">
      <div className="box">
        <div>
          <p>
            Great! You made your own custom Westworld opening!
          </p>
          <p>
            If the video did not play smoothly and paused for loading,
            it may have caused desynchronization with the text.<br />
            Try to play it again.
            As the video already been loaded the next reproduction should be better.
          </p>
          <p>
            You can now request to download your creation as a video.
          </p>
          <div className="buttons">
            <ButtonLink to={`/${openingKey}/download`} className="button big">
              DOWNLOAD
            </ButtonLink>
            <ButtonLink to={`/${openingKey}/edit`} className="button medium">
              BACK TO EDIT
            </ButtonLink>
          </div>
          <p>
            You can also share your creation by copying the URL link
            in your browser and send to your friends.
          </p>

          <ContactButton />
          <TermsOfServiceAcceptance />
        </div>
      </div>
    </div>
  );
};

AfterVideoCard.propTypes = {
  match: PropTypes.object,
};

export default withRouter(AfterVideoCard);
