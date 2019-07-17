import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import ButtonLink from '../common/ButtonLink';

const DonateOrNotDonate = ({ match, hideNoDonateOption = false }) => {
  const { params } = match;
  const { openingKey } = params;
  return (
    <Fragment>
      <p><span className="bold">Do you want to receive your video faster by donating or wait in the queue?</span></p>
      <div className="buttons">

        <ButtonLink to={`/${openingKey}/download/donate`} className="button medium">
          YES, DONATE!
        </ButtonLink>

        {!hideNoDonateOption
          && (
          <ButtonLink to={`/${openingKey}/download/request`} className="button small increase-padding">
            NO, I{'\''}LL GET IN THE QUEUE!
          </ButtonLink>
        )}
      </div>
    </Fragment>
  );
};

DonateOrNotDonate.propTypes = {
  match: PropTypes.object,
  hideNoDonateOption: PropTypes.bool,
};

export default withRouter(DonateOrNotDonate);
