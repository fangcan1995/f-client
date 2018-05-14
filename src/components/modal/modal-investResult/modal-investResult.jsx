import React from 'react';
import PropTypes from 'prop-types';
import  {poundage,checkMoney,income}  from '../../../utils/cost';
import { Checkbox,message,Select,Button } from 'antd';
import './modal-investResult..less';
import {BbhAlert,Posting} from '../../../components/bbhAlert/bbhAlert';
import { connect } from 'react-redux';
import  investDetailActions  from '../../../actions/invest-detail';
import {accountAc} from "../../../actions/account";
import {addCommas} from "../../../utils/famatData";
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class ModalInvestResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num:0
        }
    }
    componentWillMount () {
        let {auth,investDetail,dispatch}=this.props;
        let {id,annualRate,loanExpiry}=investDetail.investInfo;
        if(auth.isAuthenticated){
            dispatch(investDetailActions.getRedEnvelopes(id));
            dispatch(investDetailActions.getRateCoupons(id));
        }
        this.setState({
            num:this.state.num+1
        },()=>{

            this.app();

        });

    }
    app(){
        console.log('提交投资申请'+this.state.num);
        //2 提交后台
        /*console.log('提交投资申请');
        dispatch(investDetailActions.postInvest(
            {
                projectId:id,
                investAmt:investAmount,
                ifTransfer:false,
                investWay:1,
                transfer:false
            }
            ));*/
    }
    /*componentWillReceiveProps(){
        console.log('更新了');
    }*/
    modalClose(){
        //清空
        let {investAmount,account,onFail,onSuccess,dispatch}=this.props;
        /*let {postResult}=this.props.investDetail;
        if(postResult.code==0){
            dispatch(accountAc.getAccountInfo());  //成功重新获取新户信息
            dispatch(investDetailActions.getInvestRecords(this.props.id));//成功重新获取投资记录
            dispatch(investDetailActions.getInvestInfo(this.props.id)); //成功重新获取标的信息
        }
        dispatch(investDetailActions.statePostResultModify(``));*/
        onSuccess();
    }
    render() {
        let {investAmount,account,onFail,onSuccess}=this.props;
        let {postResult,isPosting,redEnvelopes,rateCoupons}=this.props.investDetail;
        let {annualRate, loanExpiry} = this.props.investDetail.investInfo;
        if(postResult===``){
            return (
                <div className="pop__invest">
                    <Spin indicator={antIcon} />
                    正在提交您的投资申请...
                </div>
            );
        }else{
            if(postResult.type===`success`){
                <BbhAlert
                    info={{message:postResult.message,description:postResult.description,type:postResult.type,
                        callback:()=>{
                            this.modalClose()
                        }
                    }}
                />
            }else{
                if(postResult.code==406){
                    if(this.state.num<5){
                        this.app();
                    }
                    return (
                        <div className="pop__invest">
                            <Spin indicator={antIcon} />
                            正在提交您的投资申请...
                        </div>
                    );
                }else{
                    return (
                        <BbhAlert
                            info={{message:postResult.message,description:postResult.description,type:postResult.type,
                                callback:()=>{
                                    this.modalClose()
                                }
                            }}
                        />
                    );
                }
            }
        }



    }
}

function mapStateToProps(state) {
    const { auth,investDetail,account } = state.toJS();
    return {
        auth,
        investDetail,
        account
    };
}
export default connect(mapStateToProps)(ModalInvestResult);