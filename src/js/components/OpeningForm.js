import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Swal from '../swal';
import OpeningProvider from './OpeningProvider';
import connectContext from './connectContext';

import { season1 } from '../../json/defaultTexts.json';
import firebaseOpeningEncode from '../api/firebaseOpeningEncode';

class OpeningForm extends Component {
  static propTypes = {
    opening: PropTypes.object,
    setDefaultOpening: PropTypes.func,
    playNewOpening: PropTypes.func,
    history: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.inputsRefs = {};

    const defaultOpening = {
      texts: season1,
    };

    const openingEncoded = firebaseOpeningEncode(defaultOpening);

    this.state = {
      opening: props.opening || openingEncoded,
    };

    if (!props.opening) {
      this.props.setDefaultOpening(openingEncoded);
    }
  }


  _isValidOpening = (opening) => {
    const { texts } = opening;

    const isAllTextsValid = texts.every((text, index) => {
      const maxLength = 28 === index ? 50 : 150;
      return text.length <= maxLength;
    });

    if (!isAllTextsValid) {
      Swal.fire('OOPS...', 'All text fields should be less than 150 characters and the logo should be less than 50. ;)', 'warning');
      return false;
    }

    return true;
  };

  _textAreaInput = (id, value, rows, maxLength, ref) => (
    <textarea
      ref={ref}
      key={id}
      name={id}
      id={id}
      rows={rows}
      spellCheck={false}
      maxLength={maxLength}
      defaultValue={value}
    />
  );

  _renderInputs() {
    const inputsCount = 34;
    const inputs = [];
    const { texts } = this.state.opening;

    for (let i = 0; i < inputsCount; i += 1) {
      const ref = React.createRef();
      const id = `input-text${i}`;
      const isLogoText = 28 === i;
      const rows = isLogoText ? 1 : 2;
      const maxLength = isLogoText ? 50 : 150;
      const input = this._textAreaInput(id, texts[`text${i}`], rows, maxLength, ref);

      this.inputsRefs[i] = ref;
      inputs.push(input);
    }

    return inputs;
  }

  _getFormValues() {
    const keys = Object.keys(this.inputsRefs);
    const values = keys.map(key => this.inputsRefs[key].current.value);
    return values;
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    const values = this._getFormValues();
    const { playNewOpening, history } = this.props;

    const opening = {
      texts: values,
    };

    if (this._isValidOpening(opening)) {
      const encodedOpening = firebaseOpeningEncode(opening);
      playNewOpening(encodedOpening, history);
    }
  }

  render() {
    return (
      <div id="opening-form">
        <div className="info-box">FILL THE INPUTS BELOW, THE ORDER IS LEFT TO RIGHT, TOP TO BOTTOM</div>
        <form onSubmit={this._handleSubmit}>
          <div className="form-inputs">
            {this._renderInputs()}
          </div>
          <button className="button">PLAY</button>
        </form>
      </div>
    );
  }
}

const mapContextToProps = context => ({
  opening: context.opening,
  setDefaultOpening: context.setDefaultOpening,
  playNewOpening: context.playNewOpening,
});

export default withRouter(connectContext(OpeningProvider, mapContextToProps)(OpeningForm));
