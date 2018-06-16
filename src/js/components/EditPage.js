import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import PageContainer from './PageContainer';
import OpeningForm from './OpeningForm';
import LoadingLayer from './LoadingLayer';

import OpeningProvider from './OpeningProvider';
import connectContext from './connectContext';

class EditPage extends Component {
  state = {
    isLoading: true,
    opening: null,
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.opening) {
      return {
        isLoading: false,
        opening: nextProps.opening,
      };
    }
    return null;
  }

  componentDidMount() {
    const { match, loadOpening, opening } = this.props;
    if (!opening) {
      loadOpening(match.params.openingKey);
    }
  }

  render() {
    const { isLoading, opening } = this.state;

    return (
      <PageContainer>
        <LoadingLayer isLoading={isLoading} />

        {opening &&
          <OpeningForm
            showDownloadButton
          />
        }

      </PageContainer>
    );
  }
}

EditPage.propTypes = {
  match: PropTypes.object,
  loadOpening: PropTypes.func,
  opening: PropTypes.object,
};

const mapOpeningProviderToProps = context => ({
  loadOpening: context.loadOpening,
  opening: context.opening,
});

const connectOpeningProvider = connectContext(OpeningProvider, mapOpeningProviderToProps);

export default withRouter(connectOpeningProvider(EditPage));
