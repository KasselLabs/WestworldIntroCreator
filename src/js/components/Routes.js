import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import VideoPage from './VideoPage';
import CreatePage from './CreatePage';
import EditPage from './EditPage';
import DownloadPage from './DownloadPage';
import DonatePage from './DonatePage';
import GAListener from './GAListener';
import DonateDownloadPage from './DonateDownloadPage';
import RequestDownloadPage from './RequestDownloadPage';

const Routes = () => (
  <Router>
    <GAListener>
      <Switch>
        <Route exact path="/" component={CreatePage} />
        <Route exact path="/donate" component={DonatePage} />
        <Route exact path="/:openingKey" component={VideoPage} />
        <Route path="/:openingKey/edit" component={EditPage} />
        <Route path="/:openingKey/download/donate" component={DonateDownloadPage} />
        <Route path="/:openingKey/download/request" component={RequestDownloadPage} />
        <Route path="/:openingKey/download/" component={DownloadPage} />
      </Switch>
    </GAListener>
  </Router>
);

export default Routes;