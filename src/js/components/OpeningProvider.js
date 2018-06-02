import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import { defaultKey } from '../api/config';

import { saveOpening, fetchKey } from '../api/firebaseApi';

const OpeningContext = React.createContext();

class OpeningProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  state = {
    opening: null,

    key: null,

    setDefaultOpening: (opening) => {
      this.setState({
        opening,
        key: defaultKey,
      });
    },

    playNewOpening: async (opening, history) => {
      const isOpeningUnchanged = isEqual(opening, this.state.opening);

      if (isOpeningUnchanged) {
        history.push(`/${this.state.key}`);
        return;
      }

      let key;
      try {
        key = await saveOpening(opening);
      } catch (error) {
        // TODO handle error
        return;
      }

      history.push(`/${key}`);
    },

    loadOpening: async (openingKey) => {
      let opening;
      try {
        opening = await fetchKey(openingKey);
      } catch (error) {
        // apiError(`We could not load the introduction "${key}"`, true);
        return;
      }

      if (!opening) {
        console.log('not found');
        // setCreateMode();
        // swal('ops...', `The introduction with the key "${key}" was not found.`, 'error');
        return;
      }

      this.setState({
        opening,
        key: openingKey,
      });
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
