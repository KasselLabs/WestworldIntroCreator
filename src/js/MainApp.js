import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import VideoPage from './VideoPage';

const CreatePage = () => (
  <div>
    <Link to="/video">Play video</Link>
  </div>
);

const MainApp = () => (
  <Router>
    <div>
      <Route exact path="/" component={CreatePage} />
      <Route path="/video" component={VideoPage} />
    </div>
  </Router>
);

export default MainApp;
