import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import { defaultKey } from '../api/config';

import { season1 } from '../../json/defaultTexts.json';
import { saveOpening } from '../api/firebaseApi';
import firebaseOpeningEncode from '../api/firebaseOpeningEncode';

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
    playNewOpening: async (opening, history) => {
      const isOpeningUnchanged = isEqual(opening, this.state.opening);

      if (isOpeningUnchanged) {
        history.push(`/${this.state.key}`);
      }

      const encodedOpening = firebaseOpeningEncode(opening);

      let key;
      try {
        key = await saveOpening(encodedOpening);
      } catch (error) {
        // TODO handle error
        return;
      }

      this.setState({
        key,
      });

      history.push(`/${this.state.key}`);
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
