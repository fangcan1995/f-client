import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import BbhModal from "../../../../components/modal/bbh_modal";
import {modal_config} from "../../../../utils/modal_config";
import { Popconfirm, message, Button } from 'antd';
import './authInfo.less';
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
            disabled:true,
        }
        this.confirm = this.confirm.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.changeCard= this.changeCard.bind(this);
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
//开卡前询问是否实名认证
    confirm() {
        this.toggleModal(`ModalSteps`,true);
    }
    changeCard(){
        //const hide = message.loading('请稍后..', 0);
        //setTimeout(hide, 3000);
        let {dispatch, account} = this.props;
        let {isPosting,isFetching,accountsInfo,toOthersInfo,postResult,isOpenOthers}=account;
        //先获取换卡需携带的信息，正确的话提交表单
        dispatch(accountAc.getFuyouInfo({type:'ReOpenAccount',url:`my-settings_my-authInfo`}))
            .then(
                (res)=>{
                    console.log('给富有的')
                    toOthersInfo=res.value;
                    console.log(toOthersInfo);
                    //hide;
                        if(toOthersInfo.code==406  ){
                            this.setState({
                                disabled:false
                            });
                            message.info(toOthersInfo.message);
                        }else if(toOthersInfo!=``){
                            document.getElementById('ChangeCard2').submit();
                            dispatch(accountAc.change_goOutState(true));
                        }

                }
            )
            .catch();
    }

    changePhone(){
        alert('去第三方,暂不开发');
    }
    callback(status){
        this.toggleModal('bbhModal',false);
    }
    closeModal(status){
        //this.props.dispatch(accountAc.getAccountInfo());  //成功重载数据,暂时注释掉
        this.toggleModal('bbhModal',false);
    }
    render(){
        let {dispatch,account,auth}=this.props;
        const {isFetching,accountsInfo,toOthersInfo}=account;
        const {postResult,isCertification,isOpenAccount,isSetTradepassword,trueName,idNumber,bankNo}=accountsInfo;
        return(
            <div className="member__main">
                <Crumbs/>
                {/*<Button onClick={success}>Display a loading indicator</Button>*/}
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

                                            {
                                                this.state.disabled?<a href="javascript:void(0);" onClick={this.changeCard}>更换</a>
                                                    :`更换`
                                            }
                                        </td>
                                    </tr>
                                    :isOpenAccount==='0'?
                                    <tr className="no">
                                        <th><i className="iconfont no icon-card"></i>银行卡</th>
                                        <td className="Result">未开户</td>
                                        <td className="detail"></td>
                                        <td className="operate">
                                            {(isCertification==='1')?<a href="javascript:void(0);" onClick={() => this.toggleModal(`ModalBindCard`,true)}>开户</a>
                                                :<Popconfirm placement="top" title={`请您先完成实名认证`} onConfirm={this.confirm} okText="确定" cancelText="取消">
                                                    <a href="javascript:void(0);" >开户</a>
                                                </Popconfirm>
                                            }
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
                                                   () => this.toggleModal(`ModalLoginPassword`,true)
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
                                                   () => this.toggleModal(`ModalTradePassword`,true)
                                               }>
                                                重新设置交易密码
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
                                                   () => this.toggleModal(`ModalTradePassword`,true)
                                               }>
                                                设置交易密码
                                            </a>
                                        </td>
                                    </tr>
                                    :``
                                }
                                </tbody>
                            </table>
                            <form name="ChangeCard2" id="ChangeCard2" method="post" action={toOthersInfo.url}  >
                                <input type="hidden" name="mchnt_cd" value={toOthersInfo.mchnt_cd} />
                                <input type="hidden" name="mchnt_txn_ssn" value={toOthersInfo.mchnt_txn_ssn} />
                                <input type="hidden" name="login_id" value={toOthersInfo.login_id} />
                                <input type="hidden" name="page_notify_url" value={toOthersInfo.page_notify_url} />
                                <input type="hidden" name="signature" value={toOthersInfo.signature} />
                                {/*{
                                    toOthersInfo==``?<Button type="primary" htmlType="submit" className="pop__large" disabled={true}>更换银行卡</Button>
                                        :<Button type="primary" htmlType="submit" className="pop__large" onClick={()=>this.changeCard()}>更换银行卡</Button>
                                }*/}
                            </form>
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
                        stepslength={2}
                        returnPage={`my-settings_my-authInfo`}
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

