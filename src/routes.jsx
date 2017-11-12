import React from 'react';
import { Route, IndexRoute } from 'react-router-dom';
import HomePage from './containers/home-page/home-page';

export default (
  <Route path="/" component={HomePage}></Route>
);