import React from 'react';
import  {checkMoney,income}  from '../../../utils/cost';
import {BbhAlert,Posting} from '../../../components/bbhAlert/bbhAlert';
import { connect } from 'react-redux';
import  investDetailActions  from '../../../actions/invest-detail';
import {accountAc} from "../../../actions/account";
import {addCommas, getTips, toMoney} from "../../../utils/famatData";
import {formItemLayout, noop} from "../../../utils/formSetting";
import { Form,Row,Input,Button,Select,Checkbox,Col,Alert,Icon,Collapse  } from 'antd';
import {tradePasswordRegExp } from '../../../utils/regExp';
import {hex_md5} from "../../../utils/md5";


const Panel = Collapse.Panel;
const createForm = Form.create;
const FormItem = Form.Item;


let appInfo={};
class ModalInvest extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeReward = this.onChangeReward.bind(this);
        this.state = {
            tips: '',  //错误提示
            isRead: false,
        }
    }

    componentDidMount () {
        let {auth,investDetail,dispatch}=this.props;
        let {id,annualRate,loanExpiry}=investDetail.investInfo;
        dispatch(investDetailActions.getAvailableRewards(id));
        //dispatch(investDetailActions.statePostResultModify(``)); //清空结果
        if(auth.isAuthenticated){

        }
    }
    componentDidUpdate() {
        let {dispatch, investDetail} = this.props;
        let {postResult,isPosting,availableRewards}=this.props.investDetail;
        if(postResult.userCode===101 && postResult.times<5 && !isPosting){
            //console.log('在这里发第'+(postResult.times+1)+'次请求');
            dispatch(investDetailActions.postInvest(appInfo,postResult.times));
        }
    }
    onChange(e) {
        this.setState({
            isRead: e.target.checked
        });
        if(this.state.tips===`请阅读并同意《投资协议》`){
            this.setState({
                tips: ``
            });
        }
    }
    onChangeReward(e) {
        let {dispatch,investDetail}=this.props;
        let {availableRewards}=investDetail;
        let index=availableRewards.findIndex((x)=>
            x.id ==parseInt(e.target.value)
        );
        for(let index of availableRewards.keys()){
            availableRewards[index].default=false;
        }
        availableRewards[index].default=true;

        dispatch(investDetailActions.changeReward(availableRewards.splice(0)));
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch, form,value,investDetail } = this.props;
        console.log(this.props);
        let {availableRewards}=investDetail;
        let {id}=investDetail.investInfo;
        form.validateFields((errors) => {
            if (errors) {
                return false;
            }
            //2 验证是否同意协议
            if (!this.state.isRead) {
                this.setState({
                    tips: `请阅读并同意《投资协议》`
                });
                return false;
            }
            let index=availableRewards.findIndex((x)=>
                x.default ==true
            );
            appInfo={
                tradePassword:hex_md5(form.getFieldsValue().newPassword),
                projectId:id,
                investAmt:value,
                ifTransfer:false,
                investWay:1,
                transfer:false,
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
        let {annualRate, loanExpiry} = this.props.investDetail.investInfo;

        let allowInvest=false;
        if(!isPosting){
            allowInvest=true
        }
        let i=-1;
        if(availableRewards!=``){
            i=availableRewards.findIndex(
                (x)=>x.default==true
            );
        }
        const { getFieldDecorator,getFieldValue } = this.props.form;

        const newPasswordProps = getFieldDecorator('newPassword', {
            rules: [
                { required: true, min: 6, message: '密码至少为 6 个字符' }
            ]
        });
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
                                                            <li><Checkbox onChange={this.onChangeReward} value={`${item.id}`} checked={item.default}></Checkbox></li>
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
                                <span  className="money">{income(value, annualRate, loanExpiry, 'm')}</span>元

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
                                            placeholder="设置6-16位的交易密码"
                                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem>
                                <p>
                                    <Checkbox onChange={this.onChange}>我已阅读并同意
                                        <a href="/subject_3/2" target="_blank">《投资协议》</a></Checkbox>
                                </p>
                            </FormItem>
                            <FormItem>

                                {(postResult!='')?
                                    <p className="errorMessages">
                                        {postResult.message}
                                    </p>:``
                                }
                                {(this.state.tips!='')?
                                    <p className="errorMessages">
                                        {this.state.tips}
                                    </p>:``
                                }
                            </FormItem>
                            <FormItem className='center'>
                                {
                                    isPosting?
                                        <Button type="primary"  className="pop__large"  disabled={true}>
                                            <Posting isShow={isPosting}/>
                                        </Button>
                                        :
                                        <Button type="primary"  htmlType="submit" className="pop__large" >
                                            确定
                                        </Button>
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