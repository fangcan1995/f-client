import 'antd/dist/antd.less';
import './main.less';

import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';

import routes from './routes';

/*import configureStore from './store/configureStore';

const store = configureStore();*/
import store from './store/store';
render(
  <Provider store={store}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </Provider>,
  document.body.appendChild(document.createElement('div'))
);