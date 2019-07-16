import React, { Component } from 'react';

import { fetchStatus } from '../api/queueApi';
import Loader from './Loader';

const PENDING = 0;
const CONFIRMED = 1;
const NOT_FOUND = 2;

class CheckForDonation extends Component {
  constructor() {
    super();

    this.state = {
      status: PENDING,
      startTime: Date.now(),
    };
  }

  componentDidMount() {
    this._fetchDownloadStatus();
  }

  _fetchDownloadStatus = async () => {
    const { openingKey } = this.props;
    let catchError = null;
    try {
      const response = await fetchStatus(openingKey);

      const isBumped = 'bumped' === response.status;
      const isRenderingViaBump = 'rendering' === response.status && response.bumpedOn;

      if (isBumped || isRenderingViaBump) {
        this.setState({
          status: CONFIRMED,
        });
        return;
      }
    } catch (error) {
      catchError = error;
    }

    const now = Date.now();
    const elapsed = now - this.state.startTime;
    const oneMinute = 60000;

    if (elapsed > oneMinute) {
      if (catchError) {
        this.setState({ error: catchError });
        return;
      }

      this.setState({
        status: NOT_FOUND,
      });
      return;
    }

    setTimeout(this._fetchDownloadStatus, 3000);
  }

  render() {
    const { status, error } = this.state;

    if (error) {
      throw error;
    }

    const donationPending = (
      <div className="check-for-donation__card">
        <Loader />
        <span className="bold">Checking for donation...</span>
      </div>
    );

    const donationConfirmed = (
      <div className="check-for-donation__card check-for-donation__card--verified">
        <div className="check-for-donation__icon check">&#10003;</div>
        <span className="bold">Donation confimed!</span>
      </div>
    );

    const donationNotFound = (
      <div className="check-for-donation__card check-for-donation__card--not-found">
        <div className="check-for-donation__icon">X</div>
        <span className="bold">Donation not found! <br />
          Please, check if your payment was made successfully or try to donate again.
        </span>
      </div>
    );

    return (
      <div className="check-for-donation">
        {status === PENDING && donationPending}
        {status === CONFIRMED && donationConfirmed}
        {status === NOT_FOUND && donationNotFound}
      </div>
    );
  }
}

export default CheckForDonation;
