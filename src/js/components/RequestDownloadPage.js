import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ContactButton from './ContactButton';
import Loader from './Loader';
import TermsOfServiceAcceptance from './TermsOfServiceAcceptance';

import DownloadPageContainer from './download/DownloadPageContainer';
import DonateOrNotDonate from './download/DonateOrNotDonate';
import EmailRequestField from './download/EmailRequestField';

import calculateEta from '../api/calculateEta';
import { getLastStatus } from '../api/queueApi';


class RequestDownloadPage extends Component {
  static propTypes = {
    match: PropTypes.object,
  }

  state = {
    isLoading: true,
    status: null,
  }

  componentDidMount = async () => {
    const { match: { params } } = this.props;
    const { openingKey } = params;
    const status = await getLastStatus(openingKey);

    this.setState({ status, isLoading: false });
  }

  getQueuedText = () => {
    const { status: { status, position, queueSize } } = this.state;
    const queuePosition = position || (queueSize + 1);
    const etaText = calculateEta(queuePosition);

    const notQueuedText = 'will be';
    const qeuedText = 'is';

    const isQueued = status !== 'not_queued';
    return (
      <p>
        Your video request {isQueued ? qeuedText : notQueuedText}{' '}
        queued at position <span className="bold">{queuePosition}</span>.
        It may take up to <span className="bold">{etaText}</span> to have your video rendered.
        You can still donate to get it earlier if you want.
      </p>
    );
  }

  renderContent = () => (
    <Fragment>
      {this.getQueuedText()}

      <DonateOrNotDonate hideNoDonateOption />

      <p>
      Fill your email below and when your video is ready you will
      receive a message with the link to download it.
      We promise not to send spam!
      </p>

      <TermsOfServiceAcceptance />
      <ContactButton />
      <EmailRequestField />
    </Fragment>
  )

  render() {
    const { isLoading } = this.state;

    return (
      <DownloadPageContainer title="REQUEST DOWNLOAD">
        {isLoading && <Loader />}
        {!isLoading && this.renderContent()}
      </DownloadPageContainer>
    );
  }
}

export default RequestDownloadPage;
