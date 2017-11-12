import React from 'react';
import { render } from 'react-dom';
// import 'normalize.css';
import './main.less';
import App from './components/app';
render(
	<App />,
  	document.body.appendChild(document.createElement('div'))
);