import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import MyAvatar from '../../../../components/myAvatar/myAdatar';
import './authInfo.less';
import { connect } from 'react-redux';
import {myAuthInfoAc} from '../../../../actions/member-settings';
import  memberActions  from '../../../../actions/member';
class MyAuthInfo extends React.Component {
    constructor(props) {
        super(props);
        this.bindCard = this.bindCard.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(myAuthInfoAc.getResult());
    }
    changeCard(){
        alert('去第三方');
    }
    changePhone(){
        alert('更改手机号');
    }
    changePassword(){
        alert('更改密码');
    }
    bindCard(){
        console.log('***********');
        let postData={
            escrowCode:100100,
            custId:123,
            accountBalance:0,
            freezingAmount:0,
            availableBalance:0

        };
        this.props.dispatch(memberActions.postOpenAccount(postData));
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
                                {authInfo.trueNameStatus === '0' ?
                                    <tr>
                                        <th><i className="iconfont icon-user"></i>真实姓名</th>
                                        <td className="Result">已认证</td>
                                        <td className="detail">{authInfo.trueName}</td>
                                        <td className="operate">{/*不可更改*/}</td>
                                    </tr>
                                    :<tr className="no">
                                        <th><i className="iconfont icon-user"></i>真实姓名</th>
                                        <td className="Result">未认证</td>
                                        <td className="detail"></td>
                                        <td className="operate"><a href="javascript:void(0);" onClick={this.bindCard}>认证</a></td>
                                    </tr>
                                }
                                    <tr>
                                        <th><i className="iconfont icon-phone"></i>手机号</th>
                                        <td className="Result">已设置</td>
                                        <td className="detail">{authInfo.phoneNumber}</td>
                                        <td className="operate"><a href="javascript:void(0);" onClick={this.changePhone}>更改</a></td>
                                    </tr>
                                {
                                    authInfo.trueNameStatus==='0'?
                                        <tr>
                                            <th><i className="iconfont icon-id"></i>实名认证</th>
                                            <td className="Result">已认证</td>
                                            <td className="detail">{authInfo.idNumber}</td>
                                            <td className="operate">{/*不可更改*/}</td>
                                        </tr>
                                        :<tr className="no">
                                            <th><i className="iconfont icon-id"></i>实名认证</th>
                                            <td className="Result"><span className="importantTxt">未认证</span></td>
                                            <td className="detail"></td>
                                            <td className="operate"><a href="javascript:void(0);" onClick={this.bindCard}>认证</a></td>
                                        </tr>
                                }
                                {authInfo.bankNoStatus==='0'?
                                    <tr>
                                        <th><i className="iconfont no icon-card"></i>银行卡</th>
                                        <td className="Result">已开户</td>
                                        <td className="detail">{authInfo.bankNo}</td>
                                        <td className="operate">
                                            <a href="javascript:void(0);" onClick={this.changeCard}>更换</a>
                                        </td>
                                    </tr>
                                    :<tr className="no">
                                        <th><i className="iconfont no icon-card"></i>银行卡</th>
                                        <td className="Result">未开户</td>
                                        <td className="detail"></td>
                                        <td className="operate">
                                            <a href="javascript:void(0);" onClick={this.bindCard}>开户</a>
                                        </td>
                                    </tr>
                                }
                                <tr>
                                    <th><i className="iconfont icon-Pass"></i>登录密码</th>
                                    <td className="Result">已设置</td>
                                    <td className="detail">******</td>
                                    <td className="operate"><a href="javascript:void(0);" onClick={this.changePassword}>修改登录密码</a></td>
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

