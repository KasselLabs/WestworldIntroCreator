import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import ButtonLink from './ButtonLink';

const DonateOrNotDonate = ({ openingKey, hideNoDonateOption = false }) => (
  <Fragment>
    <p><span className="bold">Do you want to receive your video faster by donating or wait in the queue?</span></p>
    <ButtonLink to={`/${openingKey}/download/donate`} className="button medium">YES, DONATE!</ButtonLink>
    {!hideNoDonateOption
        && (
          <Link to={`/${openingKey}/download/request`}>
            <button className="button small increase-padding">
              NO, I{'\''}LL GET IN THE QUEUE!
            </button>
          </Link>
        )}
  </Fragment>
);

DonateOrNotDonate.propTypes = {
  openingKey: PropTypes.string,
  hideNoDonateOption: PropTypes.bool,
};

export default withRouter(DonateOrNotDonate);
