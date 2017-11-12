import React from 'react';
import ReactDOM, { render } from 'react-dom';
// import 'normalize.css';
import './main.less';

import { Route, BrowserRouter } from 'react-router-dom';
import App from './components/app/app';
import routes from './routes';
render(
	<BrowserRouter>
		<App>
			{routes}
		</App>
	</BrowserRouter>,
  	document.body.appendChild(document.createElement('div'))
);