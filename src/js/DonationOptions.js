import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DONATION_AMOUNTS = {
  watermark: 10,
  'no-watermark': 20,
};

export default function DonationOptions({ updatePaymentAmount }) {
  const [selectedOption, setSelectedOption] = useState('no-watermark');

  const selectOption = useCallback((option) => {
    setSelectedOption(option);
    updatePaymentAmount(DONATION_AMOUNTS[option]);
  });

  return (
    <div className="donation-options">
      <button
        type="button"
        className={classnames('option', {
          '-selected': 'watermark' === selectedOption,
        })}
        onClick={() => selectOption('watermark')}
      >
        <span className="title">STANDARD</span>
        <span className="description">Full HD Quality</span>
        <span className="description">MP4 Video</span>
        <span className="description">Video will be like in the preview</span>
        <span className="description">
          Pay at least
          {' '}
          <b>$10</b>
        </span>
      </button>
      <button
        type="button"
        className={classnames('option', {
          '-selected': 'no-watermark' === selectedOption,
        })}
        onClick={() => selectOption('no-watermark')}
      >
        <span className="title">NO WATERMARK</span>
        <span className="description">Full HD Quality</span>
        <span className="description">MP4 Video</span>
        <span className="description">Video will be like in the preview</span>
        <span className="description">but without the watermark</span>
        <span className="description">
          Pay at least
          {' '}
          <b>$20</b>
        </span>
      </button>
    </div>
  );
}

DonationOptions.propTypes = {
  updatePaymentAmount: PropTypes.func.isRequired,
};
