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
                            <div className='m-wxts'>
                                温馨提示：
                                <p>1.存管姓名与身份证号码应保证一一对应，存管身份证仅支持二代身份证，一代身份证无法开通存管账户；<br/>
                                    2.银行卡根据大行不同，每日转账具有一定限额，各大行转账限额请 <a href='#'>点击查看></a><br/>
                                3.存管账户开立成功后，渤海银行将为您开通电子账户并进行资金存管；<br/>
                                4.未开通认证支付的银行卡无法绑定，请至开户行办理开通认证支付业务；
                                </p>
                            </div>
                            <div className='tips'>
                                {
                                    (toOthersInfo!=`` && toOthersInfo.code==406)?
                                        <div className="errorMessages">{getTips(toOthersInfo.message).message}</div>
                                        :``
                                }
                            </div>

                            <form name="form1" id="form1" method="post" acceptCharset="GBK" action='http://221.239.93.141:9080/bhdep/hipos/payTransaction' >
                                <input type="hidden" name="char_set" value={toOthersInfo.char_set} />
                                <input type="hidden" name="partner_id" value={toOthersInfo.partner_id} />
                                <input type="hidden" name="version_no" value={toOthersInfo.version_no} />
                                <input type="hidden" name="biz_type" value={toOthersInfo.biz_type} />
                                <input type="hidden" name="sign_type" value={toOthersInfo.sign_type} />
                                <input type="hidden" name="MerBillNo" value={toOthersInfo.MerBillNo} />
                                <input type="hidden" name="OpenType" value={toOthersInfo.OpenType} />
                                <input type="hidden" name="MobileNo" value={toOthersInfo.MobileNo} />
                                <input type="hidden" name="PageReturnUrl" value={toOthersInfo.PageReturnUrl} />
                                <input type="hidden" name="BgRetUrl" value={toOthersInfo.BgRetUrl} />
                                <input type="hidden" name="TransTyp" value={toOthersInfo.TransTyp} />
                                <input type="hidden" name="MerPriv" value={toOthersInfo.MerPriv} />
                                <input type="hidden" name="mac" value={toOthersInfo.mac} />
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