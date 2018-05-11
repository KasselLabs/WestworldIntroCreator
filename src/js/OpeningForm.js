import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OpeningProvider from './OpeningProvider';

class RawOpeningForm extends Component {
  static propTypes = {
    opening: PropTypes.shape({
      texts: PropTypes.array.isRequired,
    }),
  }

  constructor(props) {
    super(props);

    this.inputsRefs = {};
  }

  _textAreaInput = (id, value, rows) => (
    <textarea
      key={id}
      name={id}
      id={id}
      rows={rows}
      spellCheck={false}
      maxLength={300}
      defaultValue={value}
    />
  );

  _renderInputs() {
    const inputsCount = 34;
    const inputs = [];
    const { texts } = this.props.opening;

    for (let i = 0; i < inputsCount; i += 1) {
      const ref = React.createRef();
      this.inputsRefs[i] = ref;
      const id = `input-text${i}`;
      const isLogoText = 28 === i;
      const rows = isLogoText ? 1 : 2;
      const input = this._textAreaInput(id, texts[i], rows);
      inputs.push(input);
    }
    return inputs;
  }

  _getFormValues() {
    // TODO implement this
    return [];
  }

  _handleSubmit = (e) => {
    e.preventDefault();
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

const OpeningForm = () => (
  <OpeningProvider.Consumer>
    {context => (
      <RawOpeningForm opening={context.opening} />
      )
    }
  </OpeningProvider.Consumer>
);

export default OpeningForm;
