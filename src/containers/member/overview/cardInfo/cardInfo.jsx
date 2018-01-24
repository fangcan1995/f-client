import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import './cardInfo.less';

export default ({ location, match, history }) => {
    return (
        <div className="member__main">
            <Crumbs/>
            <div className="member__cbox">
                <Tab>
                    <div name="我的银行卡">
                        <div className="addCard">
                            <p>为保证账户资金安全，请绑定本人的银行卡</p>
                            <div className="grayCard">
                                <a href="javascript:void(0);" className="btn_add">
                                    <i className="iconfont">&#xe748;</i><p>绑定银行卡</p>
                                </a>
                            </div>
                        </div>
                        <div className="editCard">
                            <div className="card">
                                <p><strong>用户名</strong>佟鑫</p>
                                <p><strong>银行账号</strong>6217000780022472881</p>
                                <p><strong>开户支行</strong>中国建设银行大连香周路分理处</p>
                            </div>
                            <a href="javascript:void(0);" className="btn_edit">更换银行卡</a>
                        </div>
                    </div>
                </Tab>
            </div>
            <div className="member__cbox m-wxts">
                <Tab>
                    <div name="温馨提示">
                        <div className="m-wxts">
                            <p>
                                1、目前只支持储蓄卡<br/>
                                2、不支持信用卡<br/>
                                3、目前只能支持一张银行卡，可以修改
                            </p>
                        </div>
                    </div>
                </Tab>
            </div>
        </div>
    );
};
