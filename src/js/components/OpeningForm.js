import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import connectContext from 'react-context-connector';

import Swal from '../extras/swal';
import OpeningProvider from './OpeningProvider';

import { season1 } from '../../json/defaultTexts.json';
import firebaseOpeningEncode from '../api/firebaseOpeningEncode';

class OpeningForm extends Component {
  static propTypes = {
    opening: PropTypes.object,
    openingKey: PropTypes.string,
    playNewOpening: PropTypes.func,

    history: PropTypes.object,

    showDownloadButton: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.inputsRefs = {};

    const { opening } = props;

    if (opening) {
      this.state = {
        opening,
      };
      return;
    }

    const defaultOpening = {
      texts: season1,
    };

    const defaultOpeningEncoded = firebaseOpeningEncode(defaultOpening);

    this.state = {
      opening: defaultOpeningEncoded,
    };
  }

  _download = () => {
    const { openingKey, history } = this.props;
    history.push(`/${openingKey}/download`);
  }

  _isValidOpening = (opening) => {
    const { texts } = opening;

    const isAllTextsValid = texts.every((text, index) => {
      const maxLength = 28 === index ? 50 : 150;
      return text.length <= maxLength;
    });

    if (!isAllTextsValid) {
      Swal('OOPS...', 'All text fields should be less than 150 characters and the logo should be less than 50. ;)', 'warning');
      return false;
    }

    return true;
  };

  _textAreaInput = (id, value, rows, maxLength, ref, first) => (
    <textarea
      ref={ref}
      key={id}
      name={id}
      id={id}
      rows={rows}
      spellCheck={false}
      maxLength={maxLength}
      defaultValue={value}
      autoFocus={first}
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
      const first = 0 === i;
      const input = this._textAreaInput(id, texts[`text${i}`], rows, maxLength, ref, first);

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
    const { showDownloadButton } = this.props;
    return (
      <div id="opening-form">
        <div className="info-box">FILL THE INPUTS BELOW, THE ORDER IS LEFT TO RIGHT, TOP TO BOTTOM</div>
        <form onSubmit={this._handleSubmit}>
          <div className="form-inputs">
            {this._renderInputs()}
          </div>
          <div className="buttons">
            <button type="submit" className="button big">PLAY</button>
            { showDownloadButton &&
              <button type="button" onClick={this._download} className="button big">DOWNLOAD</button>
            }
          </div>
        </form>
      </div>
    );
  }
}

const mapContextToProps = context => ({
  opening: context.opening,
  openingKey: context.key,
  playNewOpening: context.playNewOpening,
});

export default withRouter(connectContext(OpeningProvider, mapContextToProps)(OpeningForm));
