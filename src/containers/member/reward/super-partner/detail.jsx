import React from 'react';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import './detail.less';

export default class SuperPartnerDetail extends React.Component{
    render(){
        return (
            <div className="member__main">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="邀请记录">
                            <div className="table__wrapper">
                                <table  className="tableList">
                                    <thead>
                                    <tr>
                                        <th>邀请用户</th>
                                        <th>业绩金额（元）</th>
                                        <th>奖励来源</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr >
                                        <td>
                                            1
                                        </td>
                                        <td>
                                            2
                                        </td>
                                        <td>
                                            3
                                        </td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </Tab>

                </div>

            </div>
        );
    };
}
