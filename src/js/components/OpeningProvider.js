import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    playNewOpening: (opening) => {
      this.setState({
        opening,
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
