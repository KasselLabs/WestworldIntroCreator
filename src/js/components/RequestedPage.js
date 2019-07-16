import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import Loader from './Loader';
import DownloadPageContainer from './download/DownloadPageContainer';
import RequestedPagesFooter from './download/RequestedPagesFooter';

import calculateEta from '../api/calculateEta';
import { getLastStatus } from '../api/queueApi';

class RequestedPage extends Component {
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
    try {
      const status = await getLastStatus(openingKey);
      this.setState({ status, isLoading: false });
    } catch (error) {
      this.setState({ error });
    }
  }

  renderContent = () => {
    const { match: { params: { openingKey } } } = this.props;

    const { status: { position } } = this.state;
    const etaText = calculateEta(position);


    return (
      <Fragment>
        <p>
          Your video request has been queued!
          Your current position on the queue is <span className="bold">{position}</span>,
          and may take up to <span className="bold">{etaText}</span> to send your video.
        </p>
        <RequestedPagesFooter openingKey={openingKey} />
      </Fragment>
    );
  }

  render() {
    const { isLoading, error } = this.state;

    if (error) {
      throw error;
    }

    return (
      <DownloadPageContainer title="REQUEST AND DOWNLOAD">
        {isLoading && <Loader />}
        {!isLoading && this.renderContent()}

      </DownloadPageContainer>
    );
  }
}


export default RequestedPage;
