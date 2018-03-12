import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './invest-list.less';
import Tab from '../../../components/tab/tab';
import SubjectList from './subject-list/subject-list';
//import TransferList from './transfer-list/transfers-list';

export default class InvestList extends Component {
  render() {
    return (
      <main className="main invest-list" id="invest-list">
        <div className="wrapper">
          <Tab>
            <div name="散标" id="1">
              <SubjectList/>
            </div>
            <div name="债权">
              {/*<TransferList/>*/}
              123
            </div>
          </Tab>
        </div>
      </main>
    )
  }
}