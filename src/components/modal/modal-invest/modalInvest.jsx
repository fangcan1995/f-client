import React from 'react';
import  {checkMoney,income}  from '../../../utils/cost';
import {BbhAlert,Posting} from '../../../components/bbhAlert/bbhAlert';
import { connect } from 'react-redux';
import  investDetailActions  from '../../../actions/invest-detail';
import {accountAc} from "../../../actions/account";
import {addCommas, getTips, toMoney} from "../../../utils/famatData";
import {formItemLayout, hasErrors, noop} from "../../../utils/formSetting";
import { Form,Row,Input,Button,Select,Checkbox,Col,Alert,Icon,Collapse  } from 'antd';
import {hex_md5} from "../../../utils/md5";


const Panel = Collapse.Panel;
const createForm = Form.create;
const FormItem = Form.Item;


let appInfo={};
class ModalInvest extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeReward = this.onChangeReward.bind(this);

    }

    componentDidMount () {
        let {auth,investDetail,dispatch,value,isTransfer}=this.props;
        let {id,projectId,loanExpiry,transferPeriod}=investDetail.investInfo;
        console.log('标的信息')
        console.log(this.props);
        dispatch(investDetailActions.getAvailableRewards(id,value,isTransfer));
        dispatch(investDetailActions.statePostResultModify(``)); //清空结果


    }
    componentDidUpdate() {
        let {dispatch, investDetail} = this.props;
        let {postResult,isPosting,availableRewards}=this.props.investDetail;
        if(postResult.userCode===101 && postResult.times<5 && !isPosting){
            let t=window.setTimeout(()=>{
                console.log('在这里发第'+(postResult.times+1)+'次请求');
                dispatch(investDetailActions.postInvest(appInfo,postResult.times));
            }, 500);

        }
    }
    onChangeReward(e) {
        let {dispatch,investDetail}=this.props;
        let {availableRewards}=investDetail;
        //console.log(e.target);
        //console.log('////////////');
        //console.log(availableRewards);
        let index=availableRewards.findIndex((x)=>
            x.id ==e.target.value
        );
        for(let index of availableRewards.keys()){
            availableRewards[index].isDefault=false;
        }
        //console.log(index);
        availableRewards[index].isDefault=true;

        dispatch(investDetailActions.changeReward(availableRewards.splice(0)));
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch, form,value,investDetail } = this.props;
        //console.log(this.props);
        let {availableRewards}=investDetail;
        let {id}=investDetail.investInfo;
        let isTransfer=false;

        form.validateFields((errors) => {
            if (errors) {
                return false;
            }
            let index=availableRewards.findIndex((x)=>
                x.isDefault ==true
            );
            if(investDetail.investInfo.isTransfer==`1`){
                //债转标
                appInfo={
                    tradePassword:hex_md5(form.getFieldsValue().newPassword),
                    transferProjectId:id,
                    investAmt:value,
                    isTransfer:true,
                    investWay:1,
                    transfer:true,
                }
            }else{
                //散标
                appInfo={
                    tradePassword:hex_md5(form.getFieldsValue().newPassword),
                    projectId:id,
                    investAmt:value,
                    isTransfer:false,
                    investWay:1,
                    transfer:false,
                }
            }
            if(index!=-1){
                appInfo.rewardId=availableRewards[index].id ; //奖励id
                appInfo.rewardType=availableRewards[index].type ; //奖励类型
            }
            //console.log('提交的投资申请');
            //console.log(appInfo);
            dispatch(investDetailActions.postInvest(appInfo,0));

        });
        //3 下一步
        //this.modalClose();
    }
    modalClose(){
        const {onSuccess,dispatch,investDetail}=this.props;
        console.log('标的信息-------');
        console.log(investDetail);
        const {postResult}=investDetail;
        /*if(postResult.code==0){
            dispatch(accountAc.getAccountInfo());  //成功重新获取新户信息
            dispatch(investDetailActions.getInvestRecords(this.props.id));//成功重新获取投资记录
            dispatch(investDetailActions.getInvestInfo(this.props.id)); //成功重新获取标的信息
        }*/

        onSuccess();
    }
    render() {
        let {value,account,onFail,onSuccess,dispatch}=this.props;
        let {postResult,isPosting,availableRewards}=this.props.investDetail;
        let {annualRate,raiseRate, loanExpiry,transferPeriod,isTransfer} = this.props.investDetail.investInfo;
        let rate=annualRate;
        if(raiseRate){
            rate=rate+raiseRate;
        }

        let allowInvest=false;
        if(!isPosting){
            allowInvest=true
        }
        let i=-1;
        if(availableRewards!=``){
            i=availableRewards.findIndex(
                (x)=>x.isDefault==true
            );
        }
        const { getFieldDecorator,getFieldValue,getFieldsError } = this.props.form;

        const newPasswordProps = getFieldDecorator('newPassword', {
            rules: [
                { required: true, min: 6, message: '密码至少为 6 个字符' }
            ]
        });
        const agreementProps = getFieldDecorator('is_read', {
            valuePropName: 'checked',
            initialValue: false,
        })
        if(postResult.type!=`success`) {
            return (
                <div className="pop__invest">
                    <div className="form__wrapper" id="area" >
                        <Form layout="horizontal" onSubmit={this.handleSubmit} id='frm'>
                            <FormItem
                                { ...formItemLayout }
                                label="投资金额"
                            >
                                <span id="money" className="money">{addCommas(parseFloat(value))}</span>元
                            </FormItem>
                            <FormItem
                                { ...formItemLayout }
                                label="使用奖励"
                            >

                                {(availableRewards==='')?``
                                    :(availableRewards.length>0?
                                        <Collapse bordered={false}>

                                            <Panel header={(i==-1)? `` :availableRewards[i].title } key="1" >
                                                <div className="rewardList">

                                                {
                                                    availableRewards.map((item, index) => (
                                                        <ul key={`row-${index}`} >
                                                            <li><Checkbox onChange={this.onChangeReward} value={`${item.id}`} checked={item.isDefault}></Checkbox></li>
                                                            <li>{item.title}</li>
                                                            <li>{item.validity}</li>
                                                        </ul>

                                                    ))
                                                }
                                                </div>
                                            </Panel>
                                        </Collapse>

                                            :`无可用奖励`
                                    )
                                }
                            </FormItem>
                            <FormItem
                                { ...formItemLayout }
                                label="预期赚取"
                            >
                                <span  className="money">
                                    {
                                        (isTransfer===`1`)?income(value,rate,transferPeriod, 'm')
                                            :income(value,rate,loanExpiry, 'm')
                                    }
                                </span>元

                                {(i==-1)? `` : `+${toMoney(availableRewards[i].reAmount)}元`}
                            </FormItem>
                            <FormItem
                                { ...formItemLayout }
                                label="交易密码"
                            >
                                {
                                    newPasswordProps(
                                        <Input
                                            type="password"
                                            autoComplete="off"
                                            placeholder=""
                                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem className="agreement">
                                {
                                    agreementProps(
                                        <Checkbox> 我已阅读并同意</Checkbox>
                                    )
                                }<a href="/subject_3/4" target="_blank">《投资协议》</a>
                            </FormItem>
                            <FormItem className='tips'>
                                {
                                    (!postResult.message)?``
                                        :<p className="errorMessages">
                                            {postResult.message}
                                        </p>
                                }
                            </FormItem>
                            <FormItem  className='center'>
                                {(isPosting || postResult.userCode===101) ?
                                    <Button type="primary" htmlType="submit" className="pop__large" disabled={true}>
                                        <Posting isShow={true}/>
                                    </Button>
                                    : <Button type="primary" htmlType="submit" className="pop__large" disabled={ hasErrors(getFieldsError()) || !getFieldValue('is_read') }>确认</Button>

                                }
                            </FormItem>
                        </Form>
                    </div>
                </div>
            );
        }else{


            return(
                <div className="pop__invest">
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
    const { auth,investDetail,account } = state.toJS();
    return {
        auth,
        investDetail,
        account
    };
}

ModalInvest = connect(mapStateToProps)(createForm()(ModalInvest));
export default connect(mapStateToProps)(ModalInvest);