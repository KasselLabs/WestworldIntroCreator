import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import sendGAPageView from './extras/googleanalytics';

class GAListener extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.object,
  }

  componentDidMount() {
    const { history } = this.props;

    sendGAPageView();
    history.listen(sendGAPageView);
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(GAListener);
