import React, { Component } from 'react';

import Loader from './Loader';
import { fetchStatus } from '../api/queueApi';
import NotQueuedStatus from './download/NotQueuedStatus';
import DownloadPageContainer from './download/DownloadPageContainer';

class DownloadPage extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = async () => {
    const { match: { params } } = this.props;
    const { openingKey } = params;

    const status = await fetchStatus(openingKey);
    this.setState({ isLoading: false, status });
  }

  render() {
    const { isLoading, status = {} } = this.state;

    return (
      <DownloadPageContainer>
        {isLoading && (<Loader />)}
        {'not_queued' === status.status && <NotQueuedStatus status={status} />}
        {/* TODO handle other status */}
      </DownloadPageContainer>

    );
  }
}

export default DownloadPage;
