import React from 'react';
import PropTypes from 'prop-types';
import './invest-list.less';
import Tab from '../../../components/tab/tab';
import SbList from './list/list';
import TransferList from './transfer-list/transferList';

export default class InvestList extends React.Component{
    render(){
        return (
            <main className="main invest-list" id="invest-list">
                <div className="wrapper">
                    <Tab>
                        <div name="散标">
                            <SbList/>
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