import React from 'react';
import ReactDOM, { render } from 'react-dom';
import 'antd/dist/antd.less';
import './main.less';
import { Route, BrowserRouter } from 'react-router-dom';
import routes from './routes';
render(
  <BrowserRouter>
    {routes}
  </BrowserRouter>,
  document.body.appendChild(document.createElement('div'))
);