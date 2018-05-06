import React, { Component } from 'react';
import { season1 } from '../json/defaultTexts.json';

class OpeningForm extends Component {
  constructor(props) {
    super(props);

    this.inputsRefs = {};
  }

  _textAreaInput = (id, value, rows) => (
    <textarea key={id} name={id} id={id} rows={rows} spellCheck={false} maxLength={300}>
      {value}
    </textarea>
  );

  _renderInputs() {
    const inputsCount = 34;
    const inputs = [];
    for (let i = 0; i < inputsCount; i += 1) {
      const ref = React.createRef();
      this.inputsRefs[i] = ref;
      const id = `input-text${i}`;
      const isLogoText = 28 === i;
      const rows = isLogoText ? 1 : 2;
      const input = this._textAreaInput(id, season1[i], rows);
      inputs.push(input);
    }
    return inputs;
  }

  _getFormValues() {
    return [];
  }

  _handleSubmit() {
    console.log((this._getFormValues()));
  }

  render() {
    return (
      <div id="opening-form">
        <div className="info-box">Fill the inputs below, the order is left to right, top to bottom</div>
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

export default OpeningForm;
