import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import OpeningProvider from './OpeningProvider';
import connectContext from './connectContext';

class AfterVideoCard extends Component {

  _download = () => {
    const { openingKey, history } = this.props;
    history.push(`/${openingKey}/download`);
  }

  _backToEdit = () => {
    const { openingKey, history } = this.props;
    history.push(`/${openingKey}/edit`);
  }

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
  history: PropTypes.object,
  openingKey: PropTypes.string,
};

const mapOpeningProviderToProps = context => ({
  openingKey: context.key,
});

const connectOpeningProvider = connectContext(OpeningProvider, mapOpeningProviderToProps);

export default withRouter(connectOpeningProvider(AfterVideoCard));
