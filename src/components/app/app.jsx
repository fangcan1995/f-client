import React from 'react';
import PropTypes from 'prop-types';

import Header from '../header/header';
import Footer from '../footer/footer';

import './app.less';
export default (props) => {
  return (
    <div className="app" id="app">
      <Header />
      	{props.children}
      <Footer />
    </div>
    );
};

