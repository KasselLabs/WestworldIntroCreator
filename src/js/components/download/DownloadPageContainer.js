import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import PageContainer from '../PageContainer';

class DownloadPageContainer extends Component {
  static propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    children: PropTypes.node,
    title: PropTypes.string,
  }

  _backToEdit = () => {
    const { history, match } = this.props;
    const { openingKey } = match.params;

    history.push(`/${openingKey}/edit`);
  }

  render() {
    const { title = 'DOWNLOAD' } = this.props;
    return (
      <PageContainer>
        <div className="download-page box-page">
          <div className="box">
            <button id="closeButton" className="button" onClick={this._backToEdit}>x</button>
            <h1 className="title">{title}</h1>
            <div>
              {this.props.children}
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }
}

export default withRouter(DownloadPageContainer);
