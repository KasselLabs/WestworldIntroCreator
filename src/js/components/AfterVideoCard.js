import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AfterVideoCard extends Component {
  render() {
    return (
      <div className="after-video-card">
        <div className="box">
          After video card.
          <button onClick={this._download} className="button big">
            DOWNLOAD
          </button>
          <button onClick={this._backToEdit} className="button medium">
            BACK TO EDIT
          </button>
        </div>
      </div>
    );
  }
}

AfterVideoCard.propTypes = {

};

export default AfterVideoCard;