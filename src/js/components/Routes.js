import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import VideoPage from './VideoPage';
import CreatePage from './CreatePage';

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={CreatePage} />
      <Route path="/:openingKey" component={VideoPage} />
    </div>
  </Router>
);

export default Routes;
