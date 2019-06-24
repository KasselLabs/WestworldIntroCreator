import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import PageContainer from './PageContainer';
import ContactButton from './ContactButton';
import TermsOfServiceAcceptance from './TermsOfServiceAcceptance';
import { requestDownload, fetchStatus } from '../api/queueApi';

class DownloadPage extends Component {
  static propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
  }

  constructor() {
    super();

    this.formRef = React.createRef();

    this.state = {
      isLoading: true,
      isRendered: false,
    };
  }

  componentDidMount = async () => {
    const { match } = this.props;
    const { openingKey } = match.params;
    const response = await fetchStatus(openingKey);
    const status = response.data;

    if ('rendered' === status.status) {
      this.setState({
        isLoading: false,
        isRendered: true,
        downloadUrl: status.downloadUrl,
      });
      return;
    }

    this.setState({
      isLoading: false,
    });
  }


  _closeButton = () => {
    const { history, match } = this.props;
    const { openingKey } = match.params;

    history.push(`/${openingKey}/edit`);
  }

  _handleSubmit = async () => {
    const { match } = this.props;
    const { openingKey } = match.params;
    const email = this.formRef.current.querySelector('.email').value;

    // setTimeout to prevent form clear before send
    setTimeout(() => {
      this.formRef.current.reset();
    });

    await requestDownload(openingKey, email);
  }

  renderDefaultPage = () => {
    const { openingKey } = this.props.match.params;
    return (
      <Fragment>
        <p>
          The automatic download feature will be available soon!
          We are working on that to be released!
        </p>
        <p>
          But you can already request your intro to download. By donating at least
          <span className="donate_value"> US $20</span> we can provide your video for download.
          Send us an email with the link of your creation
          when you donate and we will put it to render as soon as possible.
        </p>
        <p>
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick" readOnly />
            <input type="hidden" name="hosted_button_id" value="9Y4V9P7GQ6RBA" readOnly />
            <input type="hidden" name="item_number" value={openingKey} readOnly />
            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
            <img alt="" border="0" src="https://www.paypalobjects.com/pt_BR/i/scr/pixel.gif" width="1" height="1" />
          </form>
        </p>

        <p>
          Also, subscribe to be notified when we have news about the automatic download!
        </p>

        <form
          action="https://github.us18.list-manage.com/subscribe/post?u=955f23a083dc8aff26326536a&amp;id=317ca42ec8&SIGNUP=DownloadPage"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          target="_blank"
          onSubmit={this._handleSubmit}
          ref={this.formRef}
        >
          <input type="email" name="EMAIL" className="email" id="mce-EMAIL" placeholder="Your email..." required />
          <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
            <input type="text" name="b_955f23a083dc8aff26326536a_317ca42ec8" tabIndex="-1" value="" readOnly />
          </div>
          <input type="hidden" name="INTRO" value={openingKey} />
          <input type="submit" value="SUBSCRIBE" name="subscribe" id="mc-embedded-subscribe" className="button medium" />
        </form>
      </Fragment>
    );
  }

  renderRendered = () => {
    const { downloadUrl } = this.state;
    return (
      <Fragment>
        <p>
          Your video is ready to download! Click on the button below to download it!
        </p>
        <div className="center-content">
          <a href={downloadUrl} style={{ display: 'inline-block' }} download>
            <button className="button medium">
              DOWNLOAD
            </button>
          </a>
        </div>
        <ContactButton />
        <TermsOfServiceAcceptance />
      </Fragment>
    );
  }

  render() {
    const { isRendered, isLoading } = this.state;

    const showDefault = !isLoading && !isRendered;
    return (
      <PageContainer>
        <div className="download-page box-page">
          <div className="box">
            <button id="closeButton" className="button" onClick={this._closeButton}>x</button>
            <h1 className="title">DOWNLOAD</h1>
            {isLoading && <p>Loading...</p>}
            {showDefault && this.renderDefaultPage()}
            {isRendered && this.renderRendered()}
          </div>
        </div>
      </PageContainer>
    );
  }
}

export default withRouter(DownloadPage);
