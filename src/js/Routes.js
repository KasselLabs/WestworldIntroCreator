import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import GAListener from './GAListener';

import VideoPage from './pages/VideoPage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import DownloadPage from './pages/DownloadPage';
import DonateDownloadPage from './pages/DonateDownloadPage';
import RequestDownloadPage from './pages/RequestDownloadPage';
import DonatedPage from './pages/DonatedPage';
import RequestedPage from './pages/RequestedPage';
import AddDownloadEmailPage from './pages/AddDownloadEmailPage';

const Routes = () => (
  <Router>
    <GAListener>
      <Switch>
        <Route exact path="/" component={CreatePage} />
        <Route exact path="/:openingKey" component={VideoPage} />
        <Route path="/:openingKey/edit" component={EditPage} />
        <Route path="/:openingKey/download/pay" component={DonateDownloadPage} />
        <Route path="/:openingKey/download/paid" component={DonatedPage} />
        <Route path="/:openingKey/download/request" component={RequestDownloadPage} />
        <Route path="/:openingKey/download/requested" component={RequestedPage} />
        <Route path="/:openingKey/download/add_email" component={AddDownloadEmailPage} />
        <Route path="/:openingKey/download/" component={DownloadPage} />
      </Switch>
    </GAListener>
  </Router>
);

export default Routes;
