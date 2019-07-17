import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import showErrorAlert from '../extras/showErrorAlert';
import { defaultKey } from '../api/config';

import { saveOpening, fetchKey } from '../api/firebaseApi';
import firebaseOpeningEncode from '../api/firebaseOpeningEncode';
import { season1 } from '../animationData/defaultTexts.json';

const OpeningContext = React.createContext();

class OpeningProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  state = {
    opening: null,
    key: null,

    playNewOpening: async (opening, history) => {
      let openingBefore = this.state.opening;
      if (!this.state.opening) {
        const defaultOpening = {
          texts: season1,
        };

        openingBefore = firebaseOpeningEncode(defaultOpening);
      }
      const isOpeningUnchanged = isEqual(opening, openingBefore);

      if (isOpeningUnchanged) {
        const key = this.state.key || defaultKey;
        history.push(`/${key}`);
        return;
      }

      let key;
      try {
        key = await saveOpening(opening);
      } catch (error) {
        showErrorAlert({ text: 'There was an error saving your intro.' });
        return;
      }

      history.push(`/${key}`);
    },

    loadOpening: async (openingKey, history) => {
      let opening;
      try {
        opening = await fetchKey(openingKey);
      } catch (error) {
        showErrorAlert({ text: `We could not load the introduction "${openingKey}".`, cancelButtonText: 'RELOAD PAGE' })
          .then((result) => {
            if (!result.value) {
              window.location.reload();
            }
          });
        return;
      }

      if (!opening) {
        showErrorAlert({ text: `The introduction with the key "${openingKey}" was not found.` })
          .then((result) => {
            if (!result.value) {
              history.push('/');
            }
          });
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
