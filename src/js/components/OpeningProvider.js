import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import { defaultKey } from '../api/config';

import { season1 } from '../../json/defaultTexts.json';

const OpeningContext = React.createContext();

class OpeningProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  state = {
    opening: {
      texts: season1,
    },
    key: defaultKey,
    playNewOpening: (opening, history) => {
      const isOpeningUnchanged = isEqual(opening, this.state.opening);

      if (isOpeningUnchanged) {
        // TODO call api

        history.push(`/${this.state.key}`);
      }
    },
  }

  render() {
    return (
      <OpeningContext.Provider value={this.state}>
        {this.props.children}
      </OpeningContext.Provider>
    );
  }
}

OpeningProvider.Consumer = OpeningContext.Consumer;

export default OpeningProvider;
