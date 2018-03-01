import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './invest-list.less';
import Tab from '../../../components/tab/tab';
import SubjectList from './subject-list/subject-list';
import TransferList from './transfer-list/transfer-list';

export default class InvestList extends Component {
  render() {
    return (
      <main className="main invest-list" id="invest-list">
        <div className="wrapper">
          <Tab>
            <div name="散标">
              <SubjectList/>
            </div>
            <div name="债权">
              <TransferList/>
            </div>
          </Tab>
        </div>
      </main>
    )
  }
}