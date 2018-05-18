import React from 'react';
import PropTypes from 'prop-types';
import './bank-card.less';
import Tab from '../../../components/tab/tab';
import Crumbs from '../../../components/crumbs/crumbs';
import { connect } from 'react-redux';
import {accountAc} from '../../../actions/account';
import ModalAuth from '../../../components/modal/modal-auth/modal-auth';
import { Modal,Button  } from 'antd';
import {modal_config} from "../../../utils/modal_config";
import BbhModal from "../../../components/modal/bbh_modal";

function callback(key) {
    console.log(key);
}
class BankCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            modalAuth:false,
            key:Math.random(),
            bbhModal:false,
            currentModule:``,
        }
    }
    componentDidMount() {
        window.scrollTo(0,0);
        this.props.dispatch(accountAc.getAccountInfo()); //获取会员帐户信息
        this.props.dispatch(accountAc.getFuyouInfo({type:'ReOpenAccount'})); //获取换卡需携带的信息
    }

    changeCard(){
        //alert('更换银行卡,第三方暂不开发');
        let {toOthersInfo}=this.props.account;
        console.log('切换状态');
        console.log(toOthersInfo);
        document.getElementById('webReg').action=toOthersInfo.url;
        document.getElementById('webReg').submit();
        this.props.dispatch(accountAc.change_goOutState(true));
        return false;
    }
    //模态框开启关闭
    toggleModal=(module,visile,id)=>{
        let currentModule=``;
        currentModule=module;
        if(visile){
            this.setState({
                currentModule:currentModule,
                bbhModal: true,
            });
        }else{
            this.setState({
                currentModule:``,
                bbhModal: false,
                key:Math.random()
            });
        }
    };
    render(){
        let {account}=this.props;
        let {postResult,accountsInfo,toOthersInfo}=account;
        let {isCertification,isOpenAccount,bankName,bankNo,trueName}=account.accountsInfo;
        if(postResult.code==='0'){
            this.props.dispatch(accountAc.modifyState({postResult:''}));
            this.props.dispatch(accountAc.getInfo());
        }
        return (
            <div className="member__main">
                <Crumbs />
                <div className="member__cbox">
                    <Tab>
                        <div name="我的银行卡">
                            <div className="tab_content">
                                {
                                    (isOpenAccount === `0`) ?<div className="addCard">
                                            <p>为保证账户资金安全，请绑定本人的银行卡</p>
                                            <div className="grayCard">
                                                <a href="javascript:void(0);" style={{color: '#31aaf5'}}
                                                   onClick={() => this.toggleModal(`ModalBindCard`,true)}>
                                                    <i className="iconfont add"></i>
                                                    <p>绑定银行卡！</p>
                                                </a>
                                            </div>
                                        </div>
                                        :(isOpenAccount === `1`) ?
                                        <div className="editCard">
                                            <div className="form__wrapper">
                                                <div className="card">
                                                    <p><strong>用户名</strong>{trueName}</p>
                                                    <p><strong>银行账号</strong>{bankNo}</p>
                                                    <p><strong>开户行</strong>{bankName}</p>
                                                </div>
                                                <div className="form__bar">
                                                    <form name="ChangeCard2" id="ChangeCard2" method="post" action={toOthersInfo.url} >
                                                        <input type="hidden" name="mchnt_cd" value={toOthersInfo.mchnt_cd} />
                                                        <input type="hidden" name="mchnt_txn_ssn" value={toOthersInfo.mchnt_txn_ssn} />
                                                        <input type="hidden" name="login_id" value={toOthersInfo.login_id} />
                                                        <input type="hidden" name="page_notify_url" value={toOthersInfo.page_notify_url} />
                                                        <input type="hidden" name="signature" value={toOthersInfo.signature} />
                                                        {
                                                            toOthersInfo==``?<Button type="primary" htmlType="submit" className="pop__large" disabled={true}>更换银行卡</Button>
                                                                :<Button type="primary" htmlType="submit" className="pop__large" onClick={()=>this.changeCard()}>更换银行卡</Button>
                                                        }
                                                    </form>

                                                </div>
                                            </div>
                                        </div>
                                        :``
                                }

                            </div>
                        </div>
                    </Tab>

                </div>
                <div className="member__cbox m-wxts">
                    <Tab>
                        <div name="温馨提示">
                            <div className="tab_content">
                                <p>1、目前只支持储蓄卡<br/>2、不支持信用卡<br/>3、目前只能支持一张银行卡，可以修改</p>
                            </div>
                        </div>
                    </Tab>

                </div>

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
                {this.state.currentModule!=``?
                    <BbhModal
                        config={modal_config[this.state.currentModule]}
                        visible={this.state.bbhModal}
                        closeFunc={()=>this.closeModal()}
                        moduleName={this.state.currentModule}
                    >
                    </BbhModal>
                    :``
                }
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { auth,account } = state.toJS();
    return {
        auth,
        account
    };
}
export default connect(mapStateToProps)(BankCard);

