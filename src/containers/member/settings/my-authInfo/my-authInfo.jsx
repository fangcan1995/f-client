import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import BbhModal from "../../../../components/modal/bbh_modal";
import ModalCertification from '../../../../components/modal/modal-certification/modal-certification';
import ModalTradePassword from '../../../../components/modal/modal-tradePassword/modal-tradePassword';
import ModalLoginPassword from '../../../../components/modal/modal-loginPassword/modal-loginPassword';
import ModalBindCard from '../../../../components/modal/modal-bindCard/modal-bindCard';
import {modal_config} from "../../../../utils/modal_config";

import { Popconfirm, message, Button } from 'antd';
import './authInfo.less';
import {myAuthInfoAc} from '../../../../actions/member-settings';
import {memberAc} from "../../../../actions/member";
import  {accountAc}  from '../../../../actions/account';


class MyAuthInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //modalResetPassword:false,
            //modalAuth:false,
            bbhModal:false,
            currentModule:``,
            key:Math.random(),
        }
        this.confirm = this.confirm.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    confirm() {
        this.toggleModal(`ModalCertification`,true);
    }
    //模态框开启关闭
    toggleModal=(modal,visile)=>{
        if(visile){
            this.setState({
                bbhModal:true,
                currentModule: modal,

            });
        }else{
            this.setState({
                bbhModal:false,
                currentModule: ``,
                key:Math.random()
            });
        }
    };
    componentDidMount() {
        window.scrollTo(0,0);
        this.props.dispatch(accountAc.getAccountInfo());  //获取会员帐户信息
    }
    changeCard(){
        alert('去第三方,暂不开发');
    }
    changePhone(){
        alert('去第三方,暂不开发');
    }
    callback(status){
        this.toggleModal('bbhModal',false);
    }
    render(){
        console.log('获取的数据');
        console.log(this.props);
        let {dispatch,account,auth}=this.props;
        //let {authInfo}=this.props.memberSettings;
        //let {info}=authInfo;
        //let {account,auth}=this.props;
        const {isFetching,accountsInfo}=account;
        const {postResult,isCertification,isOpenAccount,isSetTradepassword,trueName,idNumber,bankNo}=accountsInfo;
        return(
            <div className="member__main">
                <Crumbs/>

                <div className="member__cbox">
                    <Tab>
                        <div name="基本信息">
                            <table className="authInfo">
                                <tbody>
                                {isCertification === '1' ?
                                    <tr>
                                        <th><i className="iconfont icon-user"></i>真实姓名</th>
                                        <td className="Result">已认证</td>
                                        <td className="detail">{trueName}</td>
                                        <td className="operate">{/*不可更改*/}</td>
                                    </tr>
                                    : isCertification === '0' ?
                                    <tr className="no">
                                        <th><i className="iconfont icon-user"></i>真实姓名</th>
                                        <td className="Result">未认证</td>
                                        <td className="detail"></td>
                                        <td className="operate"><a href="javascript:void(0);"  onClick={() => this.toggleModal(`ModalCertification`,true)}>认证</a></td>
                                    </tr>
                                        :``
                                }

                                    <tr>
                                        <th><i className="iconfont icon-phone"></i>手机号</th>
                                        <td className="Result">已设置</td>
                                        <td className="detail">{auth.user.userName}</td>
                                        <td className="operate">{/*<a href="javascript:void(0);" onClick={this.changePhone}>更改</a>*/}</td>
                                    </tr>

                                {
                                    isCertification==='1'?
                                        <tr>
                                            <th><i className="iconfont icon-id"></i>实名认证</th>
                                            <td className="Result">已认证</td>
                                            <td className="detail">{idNumber}</td>
                                            <td className="operate">{/*不可更改*/}</td>
                                        </tr>
                                        : isCertification === '0' ?
                                        <tr className="no">
                                            <th><i className="iconfont icon-id"></i>实名认证</th>
                                            <td className="Result">未认证</td>
                                            <td className="detail"></td>
                                            <td className="operate"><a href="javascript:void(0);" onClick={() => this.toggleModal(`ModalCertification`,true)}>认证</a></td>
                                        </tr>
                                        :``
                                }
                                {isOpenAccount==='1'?
                                    <tr>
                                        <th><i className="iconfont no icon-card"></i>银行卡</th>
                                        <td className="Result">已开户</td>
                                        <td className="detail">{bankNo}</td>
                                        <td className="operate">
                                            {/*<a href="javascript:void(0);" onClick={this.changeCard}>更换</a>*/}
                                            {(isCertification==='1')?<a href="javascript:void(0);" onClick={() => this.toggleModal(`ModalBindCard`,true)}>开户</a>
                                                :<Popconfirm placement="top" title={`请您先完成实名认证`} onConfirm={this.confirm} okText="确定" cancelText="取消">
                                                    <a href="javascript:void(0);">开户</a>
                                                </Popconfirm>
                                            }
                                        </td>
                                    </tr>
                                    :isOpenAccount==='0'?
                                    <tr className="no">
                                        <th><i className="iconfont no icon-card"></i>银行卡</th>
                                        <td className="Result">未开户</td>
                                        <td className="detail"></td>
                                        <td className="operate">
                                            <a href="javascript:void(0);" onClick={() => this.toggleModal(`modalAuth`,true)}>开户</a>
                                        </td>
                                    </tr>
                                        :``
                                }
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

                                {isSetTradepassword === '1' ?
                                    <tr >
                                        <th><i className="iconfont icon-Pass"></i>交易密码</th>
                                        <td className="Result">已设置</td>
                                        <td className="detail">******</td>
                                        <td className="operate">
                                            <a href="javascript:void(0);"
                                               onClick={
                                                   () => this.toggleModal(`modalResetPassword`,true)
                                               }>
                                                修改交易密码
                                            </a>
                                        </td>
                                    </tr>
                                    :``
                                }
                                {isSetTradepassword === '0' ?
                                    <tr  className="no">
                                        <th><i className="iconfont no icon-Pass"></i>交易密码</th>
                                        <td className="Result">未设置</td>
                                        <td className="detail"></td>
                                        <td className="operate">
                                            <a href="javascript:void(0);"
                                               onClick={
                                                   () => this.toggleModal(`modalResetPassword`,true)
                                               }>
                                                设置交易密码
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

                {this.state.currentModule!=``?
                    <BbhModal config={modal_config[this.state.currentModule]} visible={this.state.bbhModal} onCancel={()=>this.callback()}>
                        {(this.state.currentModule === `ModalTradePassword`)?<ModalTradePassword onSuccess={()=>{this.callback()}} onFail={()=>{this.callback()}} />:``}
                        {(this.state.currentModule === `ModalBindCard`)?<ModalBindCard onSuccess={()=>{this.callback()}} onFail={()=>{this.callback()}} />:``}
                        {(this.state.currentModule === `ModalCertification`)?<ModalCertification onSuccess={()=>{this.callback()}} onFail={()=>{this.callback()}} />:``}
                        {(this.state.currentModule === `ModalLoginPassword`)?<ModalLoginPassword onSuccess={()=>{this.callback()}} onFail={()=>{this.callback()}} />:``}
                    </BbhModal>
                    :``
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { auth,memberSettings,account } = state.toJS();
    return {
        auth,
        memberSettings,
        account
    };
}
export default connect(mapStateToProps)(MyAuthInfo);

