import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import VideoPage from './VideoPage';
import CreatePage from './CreatePage';
import EditPage from './EditPage';
import DownloadPage from './DownloadPage';
import DonatePage from './DonatePage';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={CreatePage} />
      <Route exact path="/donate" component={DonatePage} />
      <Route exact path="/:openingKey" component={VideoPage} />
      <Route path="/:openingKey/edit" component={EditPage} />
      <Route path="/:openingKey/download" component={DownloadPage} />
    </Switch>
  </Router>
);

export default Routes;
