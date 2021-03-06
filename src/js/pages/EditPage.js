import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import connectContext from 'react-context-connector';

import PageContainer from '../common/PageContainer';
import OpeningForm from '../OpeningForm';
import LoadingLayer from '../common/LoadingLayer';

import OpeningProvider from '../common/OpeningProvider';

class EditPage extends Component {
  static propTypes = {
    match: PropTypes.object,
    loadOpening: PropTypes.func,
    opening: PropTypes.object,
    history: PropTypes.object,
  };

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
    const {
      match,
      history,
      loadOpening,
      opening,
    } = this.props;
    if (!opening) {
      loadOpening(match.params.openingKey, history);
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

const mapOpeningProviderToProps = context => ({
  loadOpening: context.loadOpening,
  opening: context.opening,
});

const connectOpeningProvider = connectContext(OpeningProvider, mapOpeningProviderToProps);

export default withRouter(connectOpeningProvider(EditPage));
