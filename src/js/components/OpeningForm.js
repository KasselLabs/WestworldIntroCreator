import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import OpeningProvider from './OpeningProvider';
import Swal from '../swal';
import contextProviderWrapper from './contextProviderWrapper';

class OpeningForm extends Component {
  static propTypes = {
    openingProvider: PropTypes.object,
    history: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.inputsRefs = [];
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
    const { texts } = this.props.openingProvider.opening;

    for (let i = 0; i < inputsCount; i += 1) {
      const ref = React.createRef();
      const id = `input-text${i}`;
      const isLogoText = 28 === i;
      const rows = isLogoText ? 1 : 2;
      const maxLength = isLogoText ? 50 : 150;
      const input = this._textAreaInput(id, texts[i], rows, maxLength, ref);

      this.inputsRefs.push(ref);
      inputs.push(input);
    }
    return inputs;
  }

  _getFormValues() {
    const values = this.inputsRefs.map(input => input.current.value);
    return values;
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    const values = this._getFormValues();
    const { openingProvider, history } = this.props;

    const opening = {
      texts: values,
    };

    if (this._isValidOpening(opening)) {
      openingProvider.playNewOpening(opening, history);
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

export default withRouter(contextProviderWrapper(OpeningProvider, context => ({
  openingProvider: context,
}))(OpeningForm));
