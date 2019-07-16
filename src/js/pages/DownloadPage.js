import React, { Component } from 'react';

import Loader from '../download/Loader';
import { fetchStatus } from '../api/queueApi';
import PendingStatus from '../download/PendingStatus';
import RenderingOrBumpedStatus from '../download/RenderingOrBumpedStatus';
import RenderedStatus from '../download/RenderedStatus';
import DownloadPageContainer from '../download/DownloadPageContainer';

class DownloadPage extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      error: null,
    };
  }

  componentDidMount = async () => {
    const { match: { params } } = this.props;
    const { openingKey } = params;

    try {
      const status = await fetchStatus(openingKey);
      this.setState({ isLoading: false, status });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { isLoading, status = {}, error } = this.state;

    const isNotQueued = 'not_queued' === status.status;
    const isQueued = 'queued' === status.status;
    const isPending = isQueued || isNotQueued;

    const isBumped = 'bumped' === status.status;
    const isRendering = 'rendering' === status.status;
    const isRenderingOrBumped = isRendering || isBumped;

    const isRendered = 'rendered' === status.status;

    if (error) {
      throw error;
    }

    return (
      <DownloadPageContainer>
        {isLoading && (<div className="center-content"><Loader /></div>)}
        {isPending && <PendingStatus status={status} />}
        {isRenderingOrBumped && <RenderingOrBumpedStatus status={status} />}
        {isRendered && <RenderedStatus status={status} />}
      </DownloadPageContainer>

    );
  }
}

export default DownloadPage;
