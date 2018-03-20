import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import MyAvatar from '../../../../components/myAvatar/myAdatar';
import './authInfo.less';
import { connect } from 'react-redux';
import {myAuthInfoAc} from '../../../../actions/member-settings';
class MyAuthInfo extends React.Component {
    componentDidMount() {
        this.props.dispatch(myAuthInfoAc.getResult());
    }
    render(){
        console.log(this.props);
        let {authInfo}=this.props.memberSettings;
        return(
            <div className="member__main">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="基本信息">
                            <table className="authInfo">

                                <tbody>
                                <tr>
                                    <th><i className="iconfont icon-user"></i>真实姓名</th>
                                    <td className="Result">已认证</td>
                                    <td className="detail">{authInfo.trueName}</td>
                                    <td className="operate">不可更改</td>
                                </tr>
                                <tr>
                                    <th><i className="iconfont icon-phone"></i>手机号</th>
                                    <td className="Result">已设置</td>
                                    <td className="detail">{authInfo.phoneNumber}</td>
                                    <td className="operate"><a href="javascript:void(0);" className="changePhoneNumber">更改</a></td>
                                </tr>
                                <tr>
                                    <th><i className="iconfont icon-id"></i>实名认证</th>
                                    <td className="Result"><span className="importantTxt">已认证</span></td>
                                    <td className="detail">{authInfo.idNumber}</td>
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
                                </tbody>
                            </table>
                        </div>
                        <div name="头像设置">
                            <div className="tab_content">
                                <MyAvatar/>
                            </div>
                        </div>
                    </Tab>

                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const { auth,memberSettings } = state.toJS();
    return {
        auth,
        memberSettings
    };
}
export default connect(mapStateToProps)(MyAuthInfo);

