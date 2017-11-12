import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
export default ({ location, match, history }) => {
  return (
    <div id="home-page">
      <p>Hello, World!</p>
      <p>location：{JSON.stringify(location)}</p>
      <p>match: {JSON.stringify(match)}</p>
      <p>history: {JSON.stringify(history)}</p>
      <Button type="primary">antd</Button>
    </div>
    );
};
