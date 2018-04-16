import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import MyAvatar from '../../../../components/myAvatar/myAdatar';
import './authInfo.less';
import { connect } from 'react-redux';
import {myAuthInfoAc} from '../../../../actions/member-settings';
import  memberActions  from '../../../../actions/member';

import { Modal } from 'antd';
import ModalResetPassword from './modalResetPassword';

class MyAuthInfo extends React.Component {
    constructor(props) {
        super(props);
        this.bindCard = this.bindCard.bind(this);
    }
    componentDidMount() {
        window.scrollTo(0,0);
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
    callback(){
        let {dispatch}=this.props;
        dispatch(myAuthInfoAc.modifyState({modalResetPassword:false}))
    }
    render(){
        console.log('获取的数据');
        console.log(this.props);
        let {dispatch}=this.props;
        let {authInfo}=this.props.memberSettings;
        let {modalResetPassword,info}=authInfo;
        return(
            <div className="member__main">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="基本信息">
                            <table className="authInfo">
                                <tbody>
                                {info.trueNameStatus === '0' ?
                                    <tr>
                                        <th><i className="iconfont icon-user"></i>真实姓名</th>
                                        <td className="Result">已认证</td>
                                        <td className="detail">{info.trueName}</td>
                                        <td className="operate">{/*不可更改*/}</td>
                                    </tr>
                                    : info.trueNameStatus === '1' ?
                                    <tr className="no">
                                        <th><i className="iconfont icon-user"></i>真实姓名</th>
                                        <td className="Result">未认证</td>
                                        <td className="detail"></td>
                                        <td className="operate"><a href="javascript:void(0);" onClick={this.bindCard}>认证</a></td>
                                    </tr>
                                        :``
                                }
                                {info.phoneNumberStatus==='0'?
                                    <tr>
                                        <th><i className="iconfont icon-phone"></i>手机号</th>
                                        <td className="Result">已设置</td>
                                        <td className="detail">{info.phoneNumber}</td>
                                        <td className="operate"><a href="javascript:void(0);" onClick={this.changePhone}>更改</a></td>
                                    </tr>
                                    :``
                                }
                                {
                                    info.trueNameStatus==='0'?
                                        <tr>
                                            <th><i className="iconfont icon-id"></i>实名认证</th>
                                            <td className="Result">已认证</td>
                                            <td className="detail">{info.idNumber}</td>
                                            <td className="operate">{/*不可更改*/}</td>
                                        </tr>
                                        : info.trueNameStatus === '1' ?
                                        <tr className="no">
                                            <th><i className="iconfont icon-id"></i>实名认证</th>
                                            <td className="Result"><span className="importantTxt">未认证</span></td>
                                            <td className="detail"></td>
                                            <td className="operate"><a href="javascript:void(0);" onClick={this.bindCard}>认证</a></td>
                                        </tr>
                                        :``
                                }
                                {info.bankNoStatus==='0'?
                                    <tr>
                                        <th><i className="iconfont no icon-card"></i>银行卡</th>
                                        <td className="Result">已开户</td>
                                        <td className="detail">{info.bankNo}</td>
                                        <td className="operate">
                                            <a href="javascript:void(0);" onClick={this.changeCard}>更换</a>
                                        </td>
                                    </tr>
                                    :info.bankNoStatus==='1'?
                                    <tr className="no">
                                        <th><i className="iconfont no icon-card"></i>银行卡</th>
                                        <td className="Result">未开户</td>
                                        <td className="detail"></td>
                                        <td className="operate">
                                            <a href="javascript:void(0);" onClick={this.bindCard}>开户</a>
                                        </td>
                                    </tr>
                                        :``
                                }
                                {info.phoneNumberStatus === '0' ?
                                    <tr>
                                        <th><i className="iconfont icon-Pass"></i>登录密码</th>
                                        <td className="Result">已设置</td>
                                        <td className="detail">******</td>
                                        <td className="operate">
                                            <a href="javascript:void(0);"
                                               onClick={
                                                   () => dispatch(myAuthInfoAc.modifyState({modalResetPassword:true}))
                                               }>修改登录密码</a>
                                        </td>
                                    </tr>
                                    :``
                                }
                                </tbody>
                            </table>
                        </div>
                    </Tab>

                </div>

                <Modal
                    title="修改登录密码"
                    wrapClassName="vertical-center-modal"
                    visible={modalResetPassword}
                    width="520px"
                    footer={null}
                    onCancel={() => this.callback()}
                >
                    {modalResetPassword===true?
                        <ModalResetPassword info={
                            {
                                //currentId:currentId,
                                callback:(obj)=>{
                                    this.callback();
                                }
                            }
                        }
                        />:''
                    }
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { auth,memberSettings,member } = state.toJS();
    return {
        auth,
        memberSettings,
        member
    };
}
export default connect(mapStateToProps)(MyAuthInfo);

