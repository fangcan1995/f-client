import React from 'react';
import PropTypes from 'prop-types';
import { Button} from 'antd';
import { connect } from 'react-redux';
import {accountAc} from "../../../actions/account";
import {Loading,NoRecord,Posting,BbhAlert,WaitThirdParty} from '../../../components/bbhAlert/bbhAlert';
import "./modal-bindCard.less";

class ModalBindCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount () {
        //this.props.dispatch(accountAc.getAccountInfo()); //获取会员帐户信息
        this.props.dispatch(accountAc.getFuyouOpenAccountInfo()); //获取开户需携带的信息
    }
    //提交
    handleSubmit(event){
        this.props.dispatch(accountAc.change_goOutState(true));
        console.log('提交了');
        //event.preventDefault();   //阻止提交
    }
    //回调
    modalClose(){
        let {onSuccess,onFail,dispatch}=this.props;
        this.props.dispatch(accountAc.getAccountInfo()); //获取会员帐户信息
        dispatch(accountAc.clear());


    }
    render(){
        console.log('-------------this.props---------------');
        console.log(this.props);
        let {onSuccess,onFail}=this.props;
        let {isPosting,toOthersInfo,postResult,isOpenOthers}=this.props.account;
        console.log('去富有开户携带的信息');
        console.log(typeof toOthersInfo);
        if(postResult.type!=`success`){
            return(
                <div className="pop__password pop">
                    {(isOpenOthers )?<WaitThirdParty isShow={true} title='绑卡' callback={this.modalClose} />
                        :<div className="form__wrapper">
                            <form name="webReg" id="webReg" method="post" action={toOthersInfo.url}  target="_blank" >
                                <input type="hidden" name="mchnt_cd" value={toOthersInfo.mchnt_cd} />
                                <input type="hidden" name="mchnt_txn_ssn" value={toOthersInfo.mchnt_txn_ssn} />
                                <input type="hidden" name="user_id_from" value={toOthersInfo.user_id_from} />
                                <input type="hidden" name="mobile_no" value={toOthersInfo.mobile_no} />
                                <input type="hidden" name="cust_nm" value={toOthersInfo.cust_nm} />
                                <input type="hidden" name="certif_tp" value={toOthersInfo.certif_tp} />
                                <input type="hidden" name="certif_id" value={toOthersInfo.certif_id} />
                                <input type="hidden" name="email" value={toOthersInfo.email} />
                                <input type="hidden" name="city_id" value={toOthersInfo.city_id} /><br/>
                                <input type="hidden" name="parent_bank_id" value={toOthersInfo.parent_bank_id} />
                                <input type="hidden" name="bank_nm" value={toOthersInfo.bank_nm} /><br/>
                                <input type="hidden" name="capAcntNo" value={toOthersInfo.capAcntNo} /><br/>
                                <input type="hidden" name="page_notify_url" value={toOthersInfo.page_notify_url} />
                                <input type="hidden" name="back_notify_url" value={toOthersInfo.back_notify_url} />
                                <input type="hidden" name="signature" value={toOthersInfo.signature} /><br/>
                                <input type="hidden" name="ver" value={toOthersInfo.ver} /><br/>
                                <div className='center'>
                                    {
                                        toOthersInfo==``?<Button type="primary" htmlType="submit" className="pop__large" disabled={true}>去富友开户</Button>
                                            :<Button type="primary" htmlType="submit" className="pop__large" >去富友开户</Button>
                                    }

                                </div>
                            </form>
                        </div>
                    }


                </div>
            )
        }else{
            return(
                <div className="pop__password pop">
                    <BbhAlert
                        info={{message:postResult.message,description:postResult.description,type:postResult.type,
                            callback:()=>{
                                this.modalClose()
                            }
                        }}
                    />
                </div>
            )
        }

    }
}
function mapStateToProps(state) {
    const { auth, account} = state.toJS();
    return {
        auth,
        account,
    };
}
export default connect(mapStateToProps)(ModalBindCard);