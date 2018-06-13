import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import VideoPage from './VideoPage';
import CreatePage from './CreatePage';

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={CreatePage} />
      <Route exact path="/:openingKey" component={VideoPage} />
      {/* <Route path="/:openingKey/edit" component={CreatePage} /> TODO CreatePage as edit page */}
      {/* <Route path="/:openingKey/download" component={DownloadPage} /> */}
    </div>
  </Router>
);

export default Routes;
