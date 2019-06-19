import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loader from './Loader';
import { fetchStatus } from '../api/queueApi';
import PendingStatus from './download/PendingStatus';
import DownloadPageContainer from './download/DownloadPageContainer';

class DownloadPage extends Component {
  static propTypes = {
    match: PropTypes.object,
  }

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

    const isNotQueued = 'not_queued' === status.status;
    const isQueued = 'queued' === status.status;
    const isPending = isQueued || isNotQueued;

    return (
      <DownloadPageContainer>
        {isLoading && (<div className="center-content"><Loader /></div>)}
        {isPending && <PendingStatus status={status} />}
        {/* TODO handle other status */}
      </DownloadPageContainer>

    );
  }
}

export default DownloadPage;
