import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StepperInput from '../../../../components/stepperInput/stepperInput';
import {income} from "../../../../assets/js/cost";
import {addCommas, toMoney, toNumber} from "../../../../assets/js/famatData"
import {  Link} from 'react-router-dom';
import { Modal } from 'antd';
import ModalInvest from '../modal-invest/modalInvest';
import ModalRecharge from '../modal-recharge/modaRecharge'
import ModalRiskAssess from '../modal-riskAssess/modal-riskAssess';
import  {memberAc}  from '../../../../actions/member';
import ModalAuth from '../../../../components/modal/modal-auth/modal-auth';
import {InvestButton} from '../../invest-list/investComponents';
class MasterInvestBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            member:{},
            investAmount:props.investInfo.min,
            modalInvest: false,
            modalRecharge: false,
            modalRiskAssess: false,
            modalAuth:false,
            key:Math.random(),
            tips:'',
            allowedInvest:true,
            code:100
        }
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
                key:Math.random()
            });
        }
    };
    callback(modal,status){
        this.toggleModal(modal,false);
        this.props.dispatch(memberAc.modifyState({accountsInfo:``}));
        this.props.dispatch(memberAc.getInfo());  //成功重载数据
    }
    render(){
        let {member,auth,investInfo,type}=this.props;
        console.log('-------------this.props---------------');
        console.log(this.props);
        let {amount,redInfo,couponInfo,postResult,openAccountStatus,riskStatus,riskLevel,noviceStatus}=member.accountsInfo;
        let {isFetching}=member;
        return(
            <div className="form_area">
                {investInfo===``?``
                    :(investInfo.status!=2)?
                        <div>
                            <ul className="m-amount">
                                <li><strong>开放金额：</strong>{addCommas(toMoney(investInfo.money))}元</li>
                            </ul>
                            <InvestButton status={investInfo.status} id={investInfo.id} />
                        </div>
                        :<div>
                            <ul className="m-amount">
                                <li><strong>开放金额：</strong>{addCommas(investInfo.money)}元</li>
                                <li><strong>可投金额：</strong>{addCommas(investInfo.surplusAmount)}元</li>
                            </ul>
                            <StepperInput config = {{
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
                                }}>
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
                            {
                                isFetching?<a href="javascript:void(0);" className="btn end" onClick={() => this.toggleModal(`modalAuth`,true)}>载入中...</a>
                                    :(
                                        !auth.isAuthenticated?<Link  to={`/login?redirect=%2Finvest-detail%2F${investInfo.id}`} className="btn">我要登录</Link>
                                            :(openAccountStatus===0?<a  className="btn" onClick={() => this.toggleModal(`modalAuth`,true)}>立即开户</a>
                                                :(riskStatus===`1`?<a className="btn" onClick={() => this.toggleModal(`modalRiskAssess`,true,investInfo.id)}>立即风险评估</a>
                                                        :(1!=1?<a className="btn" onClick={() => this.toggleModal(`modalRiskAssess`,true,investInfo.id)}>重新风险评估</a>
                                                                :(noviceStatus===0 && investInfo.noviceLoan=='1'?<a className='btn end'>仅限新手</a>
                                                                        :(amount.availableBalance<this.state.investAmount?<a className="btn" onClick={() => this.toggleModal(`modalRecharge`,true,investInfo.id)}>立即充值</a>
                                                                                :(this.state.tips!=''?<a className='btn end'>立即投资</a>
                                                                                        : <a className='btn' onClick={() => this.toggleModal(`modalInvest`,true,investInfo.id)}>立即投资</a>
                                                                                )
                                                                        )
                                                                )
                                                        )
                                                )

                                            )
                                    )
                            }
                        </div>
                }
                {/*投资弹窗*/}
                <Modal
                    title="投资"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modalInvest}
                    width="520px"
                    height="400px"
                    footer={null}
                    onCancel={() => {
                        this.callback(`modalInvest`);
                    }}
                >
                    {this.state.modalInvest===true?
                        <ModalInvest
                            key={this.state.key}
                            config = {
                                {
                                    id:investInfo.id,
                                    investAmount:this.state.investAmount,  //投资金额
                                    callback:(obj)=>{
                                        this.callback(`modalInvest`);
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
                        this.callback(`modalRecharge`);
                    }
                    }
                >
                    {this.state.modalRecharge===true?
                        <ModalRecharge
                            key={this.state.key}
                            config = {
                                {
                                    proId:investInfo.id,
                                    accountBalance:amount.availableBalance,  //账户余额
                                    callback:(obj)=>{
                                        this.callback(`modalRecharge`);
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
                        this.callback(`modalRiskAssess`);
                    }}
                >
                    {this.state.modalRiskAssess===true?
                        <ModalRiskAssess
                            key={this.state.key}
                            config={{
                                callback:(obj)=>{
                                    this.callback(`modalRiskAssess`);
                                }
                            }}
                        />:''
                    }
                </Modal>
                {/*开户*/}
                <Modal
                    title="开户"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modalAuth}
                    width="520px"
                    footer={null}
                    destroyOnClose={true}
                    onCancel={() => {
                        this.callback(`modalAuth`);
                    }}
                >

                    <ModalAuth key={this.state.key} info={
                        {
                            callback:(obj)=>{
                                this.callback(`modalAuth`);
                            }
                        }
                    }
                    />
                    }
                </Modal>
            </div>
        )

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