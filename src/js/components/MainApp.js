import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import VideoPage from './VideoPage';
import CreatePage from './CreatePage';

const MainApp = () => (
  <Router>
    <div>
      <Route exact path="/" component={CreatePage} />
      <Route path="/video" component={VideoPage} />
    </div>
  </Router>
);

export default MainApp;
