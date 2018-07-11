import React from 'react';
import PropTypes from 'prop-types';
import { Button} from 'antd';
import { connect } from 'react-redux';
import {accountAc} from "../../../actions/account";
import {Loading,NoRecord,Posting,BbhAlert,WaitThirdParty} from '../../../components/bbhAlert/bbhAlert';
import {getTips} from "../../../utils/famatData";

class ModalBindCardBohai extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }
    componentDidMount () {
        const {returnPage,dispatch}=this.props;
        dispatch(accountAc.clear());
        dispatch(accountAc.getBohaiInfo({type:'OpenAccount',url:returnPage})); //获取开户需携带的信息
    }
    //提交
    handleSubmit(event){
        document.getElementById('form1').submit();
        return false;
    }
    //回调
    modalClose(){
        console.log('绑卡成功回调');
        let {onSuccess,dispatch}=this.props;
        this.props.dispatch(accountAc.getAccountInfo()); //获取会员帐户信息,暂时注释掉
        dispatch(accountAc.clear());
        onSuccess();
    }
    render(){
        let {onSuccess,onFail,returnPage}=this.props;
        let {isPosting,toOthersInfo,postResult,isOpenOthers}=this.props.account;
        console.log(toOthersInfo);
        if(postResult.type!=`success`){
            return(
                <div className="pop__openOther">
                    {(toOthersInfo==`` )?``
                        :<div className="form__wrapper">
                            <div className='tips'>
                                {
                                    (toOthersInfo!=`` && toOthersInfo.code==406)?
                                        <div className="errorMessages">{getTips(toOthersInfo.message).message}</div>
                                        :``
                                }
                            </div>

                            <form name="form1" id="form1" method="post" acceptCharset="GBK" action='http://221.239.93.141:9080/bhdep/hipos/payTransaction' target='_blank'>
                                <input type="input" name="char_set" value={toOthersInfo.char_set} />
                                <input type="input" name="partner_id" value={toOthersInfo.partner_id} />
                                <input type="input" name="version_no" value={toOthersInfo.version_no} />
                                <input type="input" name="biz_type" value={toOthersInfo.biz_type} />
                                <input type="input" name="sign_type" value={toOthersInfo.sign_type} />
                                <input type="input" name="MerBillNo" value={toOthersInfo.MerBillNo} />
                                <input type="input" name="OpenType" value={toOthersInfo.OpenType} />
                                <input type="input" name="MobileNo" value={toOthersInfo.MobileNo} />
                                <input type="input" name="PageReturnUrl" value={toOthersInfo.PageReturnUrl} />
                                <input type="input" name="BgRetUrl" value={toOthersInfo.BgRetUrl} />
                                <input type="input" name="TransTyp" value={toOthersInfo.TransTyp} />
                                <input type="input" name="MerPriv" value={toOthersInfo.MerPriv} />
                                <input type="input" name="mac" value={toOthersInfo.mac} />
                                {
                                    (toOthersInfo==`` || toOthersInfo.code==`406`)?<Button type="primary" htmlType="submit" className="pop__large" disabled={true}>渤海银行开户</Button>
                                        :<Button type="primary" htmlType="submit" className="pop__large" onClick={()=>this.handleSubmit()}>渤海银行开户</Button>
                                }
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
export default connect(mapStateToProps)(ModalBindCardBohai);