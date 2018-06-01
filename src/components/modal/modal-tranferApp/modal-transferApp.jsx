import React from 'react';
import { Form,Input,Button,Checkbox } from 'antd';
import { connect } from 'react-redux';
import {Loading,NoRecord,Posting,BbhAlert} from '../../../components/bbhAlert/bbhAlert';
import {formItemLayout, noop,hasErrors} from '../../../utils/formSetting';
import {accountAc} from "../../../actions/account";
import {getImageCode} from "../../../actions/login";
import PriceInput from "../../../components/price-input/price-input";
import { getApplyData,clear,postLoanData } from '../../../actions/loan-index';
import {addCommas, getTips, toMoney} from "../../../utils/famatData";
import PropTypes from "prop-types";
import "./modal-transferApp.less";
import {hex_md5} from "../../../utils/md5";
import {memberInvestAc} from "../../../actions/member-investments";
import {poundage} from "../../../utils/cost";

const createForm = Form.create;
const FormItem = Form.Item;

class ModalTransferApp extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            amount:0,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    static propTypes = {
        form: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount () {
        this.props.dispatch(memberInvestAc.getTransfer(this.props.currentId));
    }

    //提交
    handleSubmit(e){
        e.preventDefault();
        const { dispatch, form,account,currentId } = this.props;
        form.validateFields((errors) => {
            if (errors) {
                return false;
            }

            let appInfo= {
                transAmt: form.getFieldsValue().price.number,
                investId: currentId,
                traderPassword:hex_md5(form.getFieldsValue().newPassword),
            }
            console.log('准备提交的债转数据是：');
            console.log(appInfo);
            dispatch(memberInvestAc.postTransfer(appInfo))

        });

    }

    //回调
    modalClose(){
        let {onSuccess,onFail,dispatch}=this.props;
        //清空postResult
        dispatch(accountAc.clear());
        onSuccess();
    }

    checkPrice = (rule, value, callback) => {
        const {transferInfo}=this.props.memberInvestments.myInvestments;
        this.setState({
            amount:value.number
        });
        if(value.number < transferInfo.minInvestAmount){
            callback(`转让金额不能小于${transferInfo.minInvestAmount}元`);
            return false;
        }
        if(value.number > transferInfo.canTransferMoney){
            callback(`转让金额不能超过投资金额`);
            return false;
        }
        callback();
        return;
    }

    render(){
        const {memberInvestments}=this.props;
        const  {isPosting,myInvestments,isFetching}=memberInvestments;
        const {postResult,transferInfo}=myInvestments;
        const { getFieldDecorator,getFieldValue,getFieldsError } = this.props.form;
        const newPasswordProps = getFieldDecorator('newPassword', {
            rules: [
                { required: true, min: 6, message: '交易密码至少为 6 个字符' }
            ]
        });
        const agreementProps = getFieldDecorator('is_read', {
            valuePropName: 'checked',
            initialValue: false,
        })
        let {amount,tips,isRead,postSwitch} =this.state;
        console.log('返回的债转详情');
        console.log(transferInfo);
        if(postResult.type!=`success` ){
            return(
                <div className="pop__transferApp">
                    {isFetching?``
                        :
                        <div className="form__wrapper" id="area">
                            <Form layout="horizontal" onSubmit={this.handleSubmit}>
                                <FormItem
                                    { ...formItemLayout }
                                    label="实际投资金额"
                                >
                                    {addCommas(transferInfo.canTransferMoney)} 元
                                </FormItem>
                                <FormItem className='price'
                                    { ...formItemLayout }
                                    label="转让金额"
                                    required
                                >
                                    {getFieldDecorator('price', {
                                        initialValue: { number: transferInfo.canTransferMoney },
                                        rules: [{ validator: this.checkPrice }],
                                    })(<PriceInput isReadOnly={true}  />)}
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
                                <FormItem
                                    { ...formItemLayout }
                                    label="手续费"
                                >
                                    {addCommas(poundage(this.state.amount,transferInfo.proTransferFee))}元

                                </FormItem>
                                <FormItem
                                    { ...formItemLayout }
                                    label="预期到账金额"
                                >
                                    {amount != 0 ?
                                        addCommas(amount - poundage(this.state.amount, transferInfo.proTransferFee))
                                        : `0.00`
                                    }元
                                </FormItem>

                                <FormItem className="agreement">
                                    {
                                        agreementProps(
                                            <Checkbox> 我已阅读并同意</Checkbox>
                                        )
                                    }<a href="/subject_3/11" target="_blank">《巴巴汇债权转让服务协议》</a>
                                </FormItem>
                                <div className='tips'>{postResult.message}</div>
                                <FormItem className='center'>
                                    {(isPosting) ? <Button type="primary" htmlType="submit" className="pop__large" disabled={true}>
                                            <Posting isShow={isPosting}/>
                                        </Button>
                                        :
                                        <Button type="primary" htmlType="submit" className="pop__large" disabled={ hasErrors(getFieldsError()) || !getFieldValue('is_read') }>确认</Button>
                                    }
                                </FormItem>

                            </Form>
                        </div>
                    }

                </div>
            )
        }else{
            return(
                <div className="pop__password pop">
                    <BbhAlert
                        info={{
                            type:postResult.type,
                            message:postResult.message,
                            description:postResult.description,
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
    const { auth, memberInvestments} = state.toJS();
    return {
        auth,
        memberInvestments
    };
}
ModalTransferApp = connect(mapStateToProps)(createForm()(ModalTransferApp));
export default connect(mapStateToProps)(ModalTransferApp);