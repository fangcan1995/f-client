import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import BbhModal from "../../../../components/modal/bbh_modal";
import {modal_config} from "../../../../utils/modal_config";
import { message } from 'antd';
import  {accountAc}  from '../../../../actions/account';
import BohaiInfo from '../../../../components/bohai-info/bohai-info';
import './authInfo.less';

class MyAuthInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bbhModal:false,
            currentModule:``,
            key:Math.random(),
            disabled:true,
        }
        this.toggleModal = this.toggleModal.bind(this);
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
        //this.props.dispatch(accountAc.getFuyouInfo({type:'ReOpenAccount'})); //获取换卡需携带的信息
    }

    callback(status){
        this.props.dispatch(accountAc.clear()); //清空结果
        this.toggleModal('bbhModal',false);
    }
    closeModal(status){
        this.props.dispatch(accountAc.getAccountInfo());  //成功重载数据,暂时注释掉
        this.props.dispatch(accountAc.clear()); //清空结果
        this.toggleModal('bbhModal',false);
    }
    render(){
        let {dispatch,account,auth}=this.props;
        //console.log('------------auth-----------')
        //console.log(auth);
        const {isFetching,accountsInfo,toOthersInfo}=account;
        const {postResult,isCertification,isPhoneNumber,isOpenAccount,isSetTradepassword,trueName,phoneNumber,idNumber,bankNo}=accountsInfo;
        return(
            <div className="member__main">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="基本信息">
                            {
                                (accountsInfo==``)?<div></div>
                                    :<table className="authInfo">
                                        <tbody>
                                        <tr className={(isOpenAccount==='1')? '' : 'no'}>
                                            <th><i className="iconfont icon-user"></i>真实姓名</th>
                                            <td className="Result">{(isOpenAccount==='1')? '已认证' : '未认证'}</td>
                                            <td className="detail">{(isOpenAccount==='1')? trueName : ''}</td>
                                            <td className="operate">
                                                {(isOpenAccount==='1')? ''
                                                    : <BohaiInfo type={`bindCard`} url={`my-settings_my-authInfo`}>认证</BohaiInfo>
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><i className="iconfont icon-phone"></i>手机号</th>
                                            <td className="Result">已设置</td>
                                            <td className="detail">{phoneNumber}</td>
                                            <td className="operate">
                                                <BohaiInfo type={`changePhone`} url={`my-settings_my-authInfo`}>更改</BohaiInfo>
                                            </td>

                                        </tr>
                                        <tr className={(isOpenAccount==='1')? '' : 'no'}>
                                            <th><i className="iconfont icon-user"></i>实名认证</th>
                                            <td className="Result">{(isOpenAccount==='1')? '已认证' : '未认证'}</td>
                                            <td className="detail">{(isOpenAccount==='1')? trueName : ''}</td>
                                            <td className="operate">
                                                {(isOpenAccount==='1')? ''
                                                    : <BohaiInfo type={`bindCard`} url={`my-settings_my-authInfo`}>认证</BohaiInfo>
                                                }
                                            </td>
                                        </tr>
                                        <tr className={(isOpenAccount==='1')? '' : 'no'}>
                                            <th><i className="iconfont icon-card"></i>存管账户</th>
                                            <td className="Result">{(isOpenAccount==='1')? '已开通' : '未开通'}</td>
                                            <td className="detail">{(isOpenAccount==='1')? bankNo : ''}</td>
                                            <td className="operate">
                                                {(isOpenAccount==='1')? <BohaiInfo type={`bindCard`} url={`my-settings_my-authInfo`}>管理</BohaiInfo>
                                                    : <BohaiInfo type={`bindCard`} url={`my-settings_my-authInfo`}>开通</BohaiInfo>
                                                }

                                            </td>
                                        </tr>
                                        {/*<tr className={(isOpenAccount==='1')? '' : 'no'}>
                                            <th><i className="iconfont icon-card"></i>存管账户</th>
                                            <td className="Result">已开通</td>
                                            <td className="detail">{bankNo}</td>
                                            <td className="operate">
                                                <a href="javascript:void(0);" onClick={this.changeCard}>更换</a>
                                            </td>
                                        </tr>*/}
                                        <tr>
                                            <th><i className="iconfont icon-Pass"></i>登录密码</th>
                                            <td className="Result">已设置</td>
                                            <td className="detail">******</td>
                                            <td className="operate">
                                                <a href="javascript:void(0);"
                                                   onClick={() => this.toggleModal(`ModalLoginPassword`,true)}>
                                                    修改登录密码
                                                </a>
                                            </td>
                                        </tr>
                                        <tr className={(isOpenAccount==='1')? '' : 'no'}>
                                            <th><i className="iconfont icon-Pass"></i>交易密码</th>
                                            <td className="Result">{(isOpenAccount==='1')? '已设置' : '未设置'}</td>
                                            <td className="detail">{(isOpenAccount==='1')? '******' : ''}</td>
                                            <td className="operate">
                                                {(isOpenAccount==='1')? <BohaiInfo type={`setTradePass`} url={`my-settings_my-authInfo`}>重新设置交易密码</BohaiInfo>
                                                    : <BohaiInfo type={`bindCard`} url={`my-settings_my-authInfo`}>设置交易密码</BohaiInfo>
                                                }
                                            </td>
                                        </tr>
                                        <tr className={(isOpenAccount==='1')? '' : 'no'}>
                                            <th><i className="iconfont icon-card"></i>不知道干啥</th>
                                            <td className="Result">{(isOpenAccount==='1')? '已开通' : '未开通'}</td>
                                            <td className="detail"></td>
                                            <td className="operate">
                                                <BohaiInfo type={`aaaa`} url={`my-settings_my-authInfo`}>开通</BohaiInfo>

                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                            }
                        </div>
                    </Tab>

                </div>
                {this.state.currentModule!=``?
                    <BbhModal
                        config={modal_config[this.state.currentModule]}
                        visible={this.state.bbhModal}
                        closeFunc={()=>this.closeModal()}
                        moduleName={this.state.currentModule}
                        repeat={true}
                        /*stepslength={2}*/
                        returnPage={`my-settings_my-authInfo`}
                        key={this.state.key}
                    >

                    </BbhModal>
                    :``
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { auth,account } = state.toJS();
    return {
        auth,
        account
    };
}
export default connect(mapStateToProps)(MyAuthInfo);

