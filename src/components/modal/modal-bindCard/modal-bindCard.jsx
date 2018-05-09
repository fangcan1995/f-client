import React from 'react';
import PropTypes from 'prop-types';
import { Button} from 'antd';
import { connect } from 'react-redux';
import {memberAc} from "../../../actions/member";
import {Loading,NoRecord,Posting,BbhAlert} from '../../../components/bbhAlert/bbhAlert';
import {realnameRegExp,idcodeRegExp } from '../../../utils/regExp';


import "./modal-bindCard.less";



class ModalBindCard extends React.Component {

    //提交
    handleSubmit(){
        console.log('提交了');
        return false;
    }
    //回调
    modalClose(){
        let {onSuccess,onFail,dispatch}=this.props;
        //清空postResult
        dispatch(memberAc.clear());
        onSuccess();
    }
    render(){
        console.log('-------------this.props---------------');
        console.log(this.props);
        let {onSuccess,onFail}=this.props;
        let {isPosting,postResult}=this.props.member;
        let pojo={
            url:`https://jzh-test.fuiou.com/jzh/webReg.action`,
            mchnt_cd:`0002220F0353114`,
            mchnt_txn_ssn:`aa0000000`,
            user_id_from:`1234`,
            mobile_no:`15042414679`,
            cust_nm:`张三`,
            certif_tp:`0`,
            certif_id:`210503197905283621`,
            page_notify_url:`http://www.baidu.com`,
            back_notify_url:`aaa.html`

        }
        if(postResult.type!=`success`){
            return(
                <div className="pop__password pop">
                    <div className="form__wrapper">
                       {/* <form action="http://www.baidu.com" method="post" onSubmit={this.handleSubmit}>
                            <input type="hidden" name='trueName' value='trueName'  />
                            <input type="hidden" name='idCard'  value='idCard' />
                            <Button type="primary" htmlType="submit" className="pop__large">去富友绑卡</Button>
                        </form>*/}
                        <form name="webReg" id="webReg" method="post" action={pojo.url} target="_blank" onsubmit={`return false`}>
                            <input type="hidden" name="mchnt_cd" value={pojo.mchnt_cd} />
                            <input type="hidden" name="mchnt_txn_ssn" value={pojo.mchnt_txn_ssn} />
                            <input type="hidden" name="user_id_from" value={pojo.user_id_from} />
                            <input type="hidden" name="mobile_no" value={pojo.mobile_no} />
                            <input type="hidden" name="cust_nm" value={pojo.cust_nm} />
                            <input type="hidden" name="certif_tp" value={pojo.certif_tp} />
                            <input type="hidden" name="certif_id" value={pojo.certif_id} />
                            <input type="hidden" name="email" value={pojo.email} />
                            <input type="hidden" name="city_id" value={pojo.city_id} /><br/>
                            <input type="hidden" name="parent_bank_id" value={pojo.parent_bank_id} />
                            <input type="hidden" name="bank_nm" value={pojo.bank_nm} /><br/>
                            <input type="hidden" name="capAcntNo" value={pojo.capAcntNo} /><br/>
                            <input type="hidden" name="page_notify_url" value={pojo.page_notify_url} />
                            <input type="hidden" name="back_notify_url" value={pojo.back_notify_url} />
                            <input type="hidden" name="signature" value={pojo.signature} /><br/>
                            <input type="hidden" name="ver" value={pojo.ver} /><br/>
                           {/* <input type="submit" value="提交" />*/}
                            <div className='center'>
                                <Button type="primary" htmlType="submit" className="pop__large">去富友开户</Button>
                            </div>
                        </form>
                    </div>
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
    const { auth, member} = state.toJS();
    return {
        auth,
        member,
    };
}
export default connect(mapStateToProps)(ModalBindCard);