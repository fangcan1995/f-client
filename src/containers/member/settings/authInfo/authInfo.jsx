import React from 'react';
import PropTypes from 'prop-types';
import './authInfo.less';

export default ({ location, match, history }) => {
    return (
        <div className="member__main">
            <div className="crumb">
                <div>
                    <b>您所在的位置：</b>
                    <a href="/">首页</a>&nbsp;&gt;
                    基本设置&nbsp;&gt;
                    <a  className="actice">个人资料</a>
                </div>
            </div>
            <div className="member__cbox">
                <div className="tab">
                    <div className="tab_title">
                        <ul>
                            <li className="on"><h3>基本信息</h3></li>
                            <li ><h3><a href="#">头像设置</a></h3></li>
                        </ul>
                    </div>
                    <div className="tab_content">
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
                </div>
            </div>

        </div>
    );
};
