import React from 'react';
import PropTypes from 'prop-types';


import { connect } from 'react-redux';
import {myAuthInfoAc} from '../../../../actions/member-settings';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import memberActions, {memberAc} from '../../../../actions/member';
import { Modal } from 'antd';
import ModalResetPassword from './modalResetPassword';
import ModalAuth from '../../../../components/modal/modal-auth/modal-auth';

import './authInfo.less';
class MyAuthInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalResetPassword:false,
            modalAuth:false,
            key:Math.random()
        }
        //this.bindCard = this.bindCard.bind(this);
    }
    //模态框开启关闭
    toggleModal=(modal,visile)=>{
        if(visile){
            this.setState({
                [modal]: true,

            });
        }else{
            this.setState({
                [modal]: false,
                key:Math.random()
            });
        }
    };
    componentDidMount() {
        window.scrollTo(0,0);
        this.props.dispatch(myAuthInfoAc.getResult());
    }
    changeCard(){
        alert('去第三方,暂不开发');
    }
    changePhone(){
        alert('去第三方,暂不开发');
    }

    render(){
        console.log('获取的数据');
        console.log(this.props);
        let {dispatch}=this.props;
        let {authInfo}=this.props.memberSettings;
        let {info}=authInfo;
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
                                            <a href="javascript:void(0);" onClick={
                                                () => this.toggleModal(`modalAuth`,true)
                                            }>开户</a>
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
                                                   () => this.toggleModal(`modalResetPassword`,true)
                                               }>
                                                修改登录密码
                                            </a>
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
                    visible={this.state.modalResetPassword}
                    width="520px"
                    footer={null}
                    destroyOnClose={true}
                    onCancel={() =>
                        this.toggleModal(`modalResetPassword`,false)
                    }
                >
                    <ModalResetPassword key={this.state.key} info={
                        {
                            callback:(obj)=>{
                                this.toggleModal(`modalResetPassword`,false);
                            }
                        }
                    }/>
                </Modal>
                <Modal
                    title="开户"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modalAuth}
                    width="520px"
                    footer={null}
                    destroyOnClose={true}
                    onCancel={() => {
                        this.toggleModal(`modalAuth`,false);

                    }}
                >

                        <ModalAuth key={this.state.key} info={
                            {
                                callback:(obj)=>{
                                    this.toggleModal(`modalAuth`,false);
                                }
                            }
                        }
                        />
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

