import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connectContext from 'react-context-connector';

import PageContainer from '../common/PageContainer';
import OpeningForm from '../OpeningForm';
import OpeningProvider from '../common/OpeningProvider';

class CreatePage extends Component {
  static propTypes = {
    clearOpening: PropTypes.func,
  }

  componentWillMount() {
    this.props.clearOpening();
  }

  render() {
    return (
      <PageContainer>
        <OpeningForm />
      </PageContainer>
    );
  }
}

const mapOpeningProviderToProps = context => ({
  clearOpening: context.clearOpening,
});

const connectOpeningProvider = connectContext(OpeningProvider, mapOpeningProviderToProps);

export default connectOpeningProvider(CreatePage);
