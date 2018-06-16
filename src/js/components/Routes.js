import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import VideoPage from './VideoPage';
import CreatePage from './CreatePage';
import EditPage from './EditPage';
import DownloadPage from './DownloadPage';

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={CreatePage} />
      <Route exact path="/:openingKey" component={VideoPage} />
      <Route path="/:openingKey/edit" component={EditPage} />
      <Route path="/:openingKey/download" component={DownloadPage} />
    </div>
  </Router>
);

export default Routes;
