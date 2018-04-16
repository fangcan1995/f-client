import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StepperInput from '../../../../components/stepperInput/stepperInput';
import {income,addCommas} from "../../../../assets/js/cost";
import {toDefinedString, toMoney, toNumber} from "../../../../assets/js/famatData"
import {  Link} from 'react-router-dom';
import { Modal } from 'antd';
import ModalInvest from '../modal-invest/modalInvest';
import ModalRecharge from '../modal-recharge/modaRecharge'
import ModalRiskAssess from '../modal-riskAssess/modal-riskAssess';
import  {memberAc}  from '../../../../actions/member';
import {message} from "antd/lib/index";


class MasterInvestBox extends React.Component {
    constructor(props) {
        super(props);
        this.bindCard = this.bindCard.bind(this);
        this.state = {
            member:{},
            investAmount:props.investInfo.min,
            modalInvest: false,
            modalRecharge: false,
            modalRiskAssess: false,
            tips:'',
            allowedInvest:true,
            code:100
        }
    }
    getStatusName(status,id){
        let investButton=``;
        switch(status){

            case 1:
                investButton=<Link to={`/invest-detail/${id}`} className="btn end">待发布</Link>;
                break;
            case 2:
                investButton=<Link to={`/invest-detail/${id}`} className="btn start">立即加入</Link>;
                break;
            case 3:
                investButton=<Link to={`/invest-detail/${id}`} className="btn end">满标待划转</Link>;
                break;
            case 4:
                investButton=<Link to={`/invest-detail/${id}`} className="btn end">还款中</Link>;
                break;
            case 6:
                investButton=<Link to={`/invest-detail/${id}`} className="btn end">已流标</Link>;
                break;
            case 5:
                investButton=<Link to={`/invest-detail/${id}`} className="btn end">已结清</Link>;
                break;
        }
        return investButton;

    };
    bindCard(){
        this.props.dispatch(memberAc.postOpenAccount());  //绑卡

        /*if(this.props.member.accountsInfo.openAccountStatus==1){
            //message.success('开户成功');
            window.location.reload();  //
        }*/
    }
    //模态框开启关闭
    toggleModal=(modal,visile,id)=>{
        if(visile){
            this.setState({
                [modal]: true,
            });
        }else{
            this.setState({
                [modal]: false,
            });
        }
        console.log(this.state);
    };
    //是否登录，根据是否开户，是否需要风险测评，是否新手，投资金额，获取操作按钮
    //auth.isAuthenticated true登录 false未登录
    getButton(){
        let {auth,member,investInfo}=this.props;

        //假数据：member
        /*member={
            accountsInfo:{
                acBank: {bankName: "", bankNo: ""},
                amount: "",
                basicInfo: "",
                couponInfo: "",
                noviceStatus: 0,//是否新手（0：不是；1：是） ,
                openAccountStatus: 0, //0未开户，1已开户
                redInfo: "",
                result: "",
                riskLevel: "",
                riskStatus: "1", //是否风险测评（0：不需要测评；1：需要测评） ,

            }

        };*/
        console.log('获取到的用户信息');
        console.log(member);
        let {openAccountStatus,riskStatus,riskLevel,amount,noviceStatus}=member.accountsInfo;
        if(!auth.isAuthenticated){
            return(
                <Link  to={`/login?redirect=%2Finvest-detail%2F${investInfo.id}`} className="btn">我要登录</Link>
            )
        }else if(openAccountStatus===0){
            return(
                <a  className="btn" onClick={this.bindCard}>立即开户</a>
            )
        }else if(openAccountStatus===1){
            if(riskStatus===`1`){//1 需要测评
                return(
                    <a className="btn" onClick={() => this.toggleModal(`modalRiskAssess`,true,investInfo.id)}>立即风险评估</a>
                )
            }else if(1!=1){ //根据riskLevel判断测评结果暂时不需要
                return(
                    <a className="btn" onClick={() => this.toggleModal(`modalRiskAssess`,true,investInfo.id)}>重新风险评估</a>
                )
            }else if(noviceStatus===0 && investInfo.noviceLoan=='1'){ //当前新手标，用户非新手
                return(
                    <a className='btn end'>仅限新手</a>
                )
            }else　if(amount.availableBalance<this.state.investAmount){
                return(
                    <a className="btn" onClick={() => this.toggleModal(`modalRecharge`,true,investInfo.id)}>立即充值</a>
                )
            }else{
                if(this.state.tips!=''){
                    return(
                        <a className='btn end'>立即投资</a>
                    )
                }else{
                    return(
                        <a className='btn' onClick={() => this.toggleModal(`modalInvest`,true,investInfo.id)}>立即投资</a>
                    )
                }
            }
        }
    }
    render(){
        let {member,auth,investInfo,type}=this.props;
        let {amount,redInfo,couponInfo}=member.accountsInfo;
        if(investInfo==''){
            return (
                <div className="form_area"></div>
            )
        }else if(investInfo.status!=2){
            return(
                <div className="form_area">
                    <ul className="m-amount">
                        <li><strong>开放金额：</strong>{investInfo.money}元</li>
                    </ul>
                    {this.getStatusName(investInfo.status,investInfo.id)}
                </div>
            )
        }
        else{
            return(
                <div>
                    <div className="form_area">
                        <div>
                            <ul className="m-amount">
                                <li><strong>开放金额：</strong>{investInfo.money}元</li>
                                <li><strong>可投金额：</strong>{investInfo.surplusAmount}元</li>
                            </ul>
                            <StepperInput config = {
                                {
                                    defaultValue:investInfo.min, //默认金额
                                    min:investInfo.min,
                                    max:investInfo.max,
                                    step:investInfo.step,
                                    callback:(obj)=>{
                                        this.setState({
                                            tips:obj.tips,
                                            investAmount:parseFloat(obj.value),
                                            code:obj.code
                                        });
                                    }
                                }
                            }
                            >
                            </StepperInput>
                            <div className="tips__area">
                                {this.state.tips!=''? <span className="tips error">{this.state.tips}</span>
                                    :''}
                            </div>
                            <ul className="others">
                                <li>
                                    <strong>我的可用余额：</strong>
                                    {
                                        (1==1)? `${toMoney(amount.availableBalance)} 元`
                                            : <Link  to={`/login?redirect=%2invest-detail%${investInfo.id}`} >登陆查看</Link>
                                    }
                                </li>
                                <li>
                                    <strong>可用红包总计：</strong>
                                    {
                                        (1==1)? `${toMoney(redInfo.amountSum)} 元`
                                            : <Link  to={`/login?redirect=%2invest-detail%${investInfo.id}`} >登陆查看</Link>
                                    }
                                </li>
                                <li>
                                    <strong>可用加息券：</strong>
                                    {
                                        (1==1)? `${toNumber(couponInfo.number)} 张`
                                            : <Link  to={`/login?redirect=%2invest-detail%${investInfo.id}`} >登陆查看</Link>
                                    }
                                </li>
                                <li>
                                    <strong>预期可赚取：</strong>
                                    <i id="money">
                                        {(this.state.investAmount==0)?income(investInfo.min,(investInfo.rate),investInfo.loanExpiry,'m')
                                            :income(this.state.investAmount,(investInfo.rate),investInfo.loanExpiry,'m')
                                        }
                                    </i>元
                                </li>
                            </ul>
                            {this.getButton()}
                        </div>
                    </div>
                    {/*投资弹窗*/}
                    <Modal
                        title="投资"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modalInvest}
                        width="520px"
                        height="400px"
                        footer={null}
                        onCancel={() => {
                            this.toggleModal(`modalInvest`,false);
                            this.props.dispatch(memberAc.modifyState({accountsInfo:``}));
                            this.props.dispatch(memberAc.getInfo());  //充值成功重载数据
                        }}
                    >
                        {this.state.modalInvest===true?
                            <ModalInvest config = {
                                {
                                    investAmount:this.state.investAmount,  //投资金额
                                    //账户余额
                                    callback:(obj)=>{
                                        this.toggleModal(`modalInvest`,false);
                                        this.props.dispatch(memberAc.modifyState({accountsInfo:``}));
                                        this.props.dispatch(memberAc.getInfo());  //充值成功重载数据
                                    }
                                }
                            }
                            />:''
                        }
                    </Modal>
                    {/*充值弹窗*/}
                    <Modal
                        title="充值"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modalRecharge}
                        width="520px"
                        height="400px"
                        footer={null}
                        onCancel={() => {
                            this.toggleModal(`modalRecharge`,false);
                            this.props.dispatch(memberAc.modifyState({accountsInfo:``}));
                            this.props.dispatch(memberAc.getInfo());  //充值成功重载数据
                        }

                        }
                    >
                        {this.state.modalRecharge===true?
                            <ModalRecharge
                                config = {
                                    {
                                        proId:investInfo.id,
                                        accountBalance:amount.availableBalance,  //账户余额
                                        callback:(obj)=>{
                                            this.toggleModal(`modalRecharge`,false);
                                            this.props.dispatch(memberAc.modifyState({accountsInfo:``}));
                                            this.props.dispatch(memberAc.getInfo());  //充值成功重载数据
                                        },
                                    }
                                }
                            />:''
                        }
                    </Modal>
                    {/*风险测评弹窗*/}
                    <Modal
                        title="风险测评"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modalRiskAssess}
                        width="780px"
                        footer={null}
                        onCancel={() => {
                            this.toggleModal(`modalRiskAssess`,false);
                            this.props.dispatch(memberAc.getInfo());  //成功重载数据
                        }}
                    >
                        {this.state.modalRiskAssess===true?
                            <ModalRiskAssess
                                config={{
                                    callback:(obj)=>{
                                        this.toggleModal(`modalRiskAssess`,false);
                                        this.props.dispatch(memberAc.getInfo());  //成功重载数据
                                    }
                                }}
                            />:''
                        }
                    </Modal>
                </div>

            )
        }
    }
}
function mapStateToProps(state) {
    const { auth,member } = state.toJS();
    return {
        auth,
        member
    };
}
export default  connect(mapStateToProps)(MasterInvestBox);