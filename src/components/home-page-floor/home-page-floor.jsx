import React, { Component } from 'react';
import './home-page-floor.less';
export default (props) => {
  const { otherClassName, tit, tip, children } = props;
  return (
    <div className={ otherClassName ? 'floor ' + otherClassName : 'floor' }>
      <div className="floor__header">
        <h3 className="floor__tit">{ tit }{ tip ? <span className="floor__tip">{ tip }</span> : null }</h3>
      </div>
      <div className="floor__body">
        { children }
      </div>
    </div>
    )
}