import React, { Component } from 'react';
import './login-card.less';
export default (props) => {
  const { tit, tip, children } = props;
  return (
    <div className="login__card">
      <div className="card__header">
        <h3 className="card__tit">{ tit }</h3>
        <span className="card__tip">{ tip }</span>
      </div>
      <div className="card__body">
        { children }
      </div>
    </div>
    )
}