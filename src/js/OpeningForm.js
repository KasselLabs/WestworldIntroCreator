import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import OpeningProvider from './OpeningProvider';


class RawOpeningForm extends Component {
  static propTypes = {
    opening: PropTypes.shape({
      texts: PropTypes.array.isRequired,
    }),
    loadOpening: PropTypes.func,
    history: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.inputsRefs = [];
  }

  _textAreaInput = (id, value, rows, ref) => (
    <textarea
      ref={ref}
      key={id}
      name={id}
      id={id}
      rows={rows}
      spellCheck={false}
      maxLength={150}
      defaultValue={value}
    />
  );

  _renderInputs() {
    const inputsCount = 34;
    const inputs = [];
    const { texts } = this.props.opening;

    for (let i = 0; i < inputsCount; i += 1) {
      const ref = React.createRef();
      const id = `input-text${i}`;
      const isLogoText = 28 === i;
      const rows = isLogoText ? 1 : 2;
      const input = this._textAreaInput(id, texts[i], rows, ref);

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
    this.props.loadOpening({
      texts: values,
    });
    this.props.history.push('/video');
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

const OpeningForm = props => (
  <OpeningProvider.Consumer>
    {context => (
      <RawOpeningForm
        opening={context.opening}
        loadOpening={context.loadOpening}
        {...props}
      />
      )
    }
  </OpeningProvider.Consumer>
);

export default withRouter(OpeningForm);
