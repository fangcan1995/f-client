import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import './authInfo.less';

export default ({ location, match, history }) => {
    return (
        <div className="member__main">
            <Crumbs/>
            <div className="member__cbox">
                <Tab>
                    <div name="基本信息">
                        <table className="authInfo">
                            <tr>
                                <th><i className="iconfont icon-user"></i>真实姓名</th>
                                <td className="Result">已认证</td>
                                <td className="detail">柳岩 </td>
                                <td className="operate">不可更改</td>
                            </tr>
                            <tr>
                                <th><i className="iconfont icon-phone"></i>手机号</th>
                                <td className="Result">已设置</td>
                                <td className="detail">159****4086</td>
                                <td className="operate"><a href="javascript:void(0);" className="changePhoneNumber">更改</a></td>
                            </tr>
                            <tr>
                                <th><i className="iconfont icon-id"></i>实名认证</th>
                                <td className="Result"><span className="importantTxt">已认证</span></td>
                                <td className="detail">210***********3621</td>
                                <td className="operate">不可更改</td>
                            </tr>
                            <tr className="no">
                                <th><i className="iconfont no icon-card"></i>银行卡</th>
                                <td className="Result">未开户</td>
                                <td className="detail"></td>
                                <td className="operate">
                                    <a href="javascript:void(0);" className="reBindCard">开户</a>
                                </td>
                            </tr>
                            <tr>
                                <th><i className="iconfont icon-Pass"></i>登录密码</th>
                                <td className="Result">已设置</td>
                                <td className="detail">******</td>
                                <td className="operate"><a href="javascript:void(0);" className="login_pass">修改登录密码</a></td>
                            </tr>
                        </table>
                    </div>
                    <div name="头像设置">
                        2
                    </div>
                </Tab>

            </div>

        </div>
    );
};
