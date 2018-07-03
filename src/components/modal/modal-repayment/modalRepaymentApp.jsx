import React from 'react';
import PropTypes from 'prop-types';
import {toMoney,toNumber,addCommas} from '../../../utils/famatData';
import { Form,Row,Input,Button,Checkbox,Col } from 'antd';
import { connect } from 'react-redux';
import  {memberLoansAc,getImageCode}  from '../../../actions/member-loans';
import { hex_md5 } from '../../../utils/md5';
import {formItemLayout, hasErrors, noop} from '../../../utils/formSetting';
import {Posting,BbhAlert} from '../../../components/bbhAlert/bbhAlert';
import moment from "moment";
import {accountAc} from "../../../actions/account";
const createForm = Form.create;
const FormItem = Form.Item;

class ModalRepaymentApp extends React.Component {
    /*state={
        message:''
    }*/
    componentDidMount () {
        const {onSuccess,onFail,currentId}=this.props;
        this.props.dispatch(memberLoansAc.getProject(currentId));
    }
    static propTypes = {
        form: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch, form,currentId, memberLoans, auth } = this.props;
        console.log(this.props)
        const {projectInfo}=memberLoans.myLoans;
        form.validateFields((errors) => {
            if (errors) {
                return false;
            }

            let appInfo={
                memberId:auth.user.userName, //用户id
                traderPassword:hex_md5(form.getFieldsValue().password), //交易密码
                projectId:currentId, //项目id
                projectName:projectInfo.projectName, //项目名称
                num:projectInfo.num, //剩余期数
                capital:projectInfo.capital , //应还本金
                iint:projectInfo.iint,//应还利息
                paidFee:projectInfo.paidFee,//应还手续费
            }
            console.log('提交后台的数据是');
            console.log(appInfo);
            dispatch(memberLoansAc.postRepaymentApp(appInfo))/*.then(res=>{
                console.log(res)
                this.setState({
                    message:res.value.postResult.message
                })
            });*/

        });
    }
    //回调
    modalClose(){
        let {onSuccess,dispatch}=this.props;
        //清空postResult
        dispatch(memberLoansAc.stateModify({postResult:``}));
        onSuccess();
    }

    render() {
        /*console.log('----------');
        console.log(this.props.memberLoans);*/
        const{myLoans,isPosting,isFetching}=this.props.memberLoans;
        const {postResult,projectInfo}=myLoans;
        const { getFieldDecorator,getFieldValue,getFieldsError } = this.props.form;
        const passwordProps = getFieldDecorator('password', {
            rules: [
                { required: true, min: 6, message: '密码至少为 6 个字符' }
            ]
        });
        const agreementProps = getFieldDecorator('is_read', {
            valuePropName: 'checked',
            initialValue: false,
        })
        /*console.log('提前还款申请中获取的详情');
        console.log(projectInfo);*/
        return (
            <div className="pop__repayment">
                {
                    (postResult.type!=`success`) ?
                        (projectInfo==='') ? ('')
                            :
                            <div className="form__wrapper">
                                <Form layout="horizontal" onSubmit={this.handleSubmit}>
                                    <FormItem
                                        { ...formItemLayout }
                                        label="项目名称"
                                    >
                                        {projectInfo.projectName}
                                    </FormItem>
                                    {/*<FormItem
                                        { ...formItemLayout }
                                        label="到期日期"
                                    >
                                        {moment(projectInfo.expireDate).format('YYYY-MM-DD')}
                                    </FormItem>*/}
                                    <FormItem
                                        { ...formItemLayout }
                                        label="未还期数"
                                    >
                                        {projectInfo.num} 期
                                    </FormItem>
                                    <FormItem
                                        { ...formItemLayout }
                                        label="应还本金"
                                    >
                                        {addCommas(projectInfo.capital)} 元
                                    </FormItem>
                                    <FormItem
                                        { ...formItemLayout }
                                        label="应还利息"
                                    >
                                        {addCommas(projectInfo.iint)} 元
                                    </FormItem>
                                    {(projectInfo.lateTotal>0)?
                                        <FormItem
                                            { ...formItemLayout }
                                            label="应还罚息"
                                        >
                                            {addCommas(projectInfo.lateTotal)} 元
                                        </FormItem>
                                        :``
                                    }
                                    <FormItem
                                        { ...formItemLayout }
                                        label="手续费"
                                    >
                                        {addCommas(projectInfo.paidFee)} 元
                                    </FormItem>
                                    <FormItem
                                        { ...formItemLayout }
                                        label="还款总额"
                                    >
                                        {addCommas(parseFloat(projectInfo.sum)+parseFloat(projectInfo.paidFee))} 元
                                    </FormItem>
                                    <FormItem
                                        { ...formItemLayout }
                                        label="交易密码"
                                        required
                                    >
                                        {
                                            passwordProps(
                                                <Input
                                                    type="password"
                                                    autoComplete="off"
                                                    placeholder="请输入6-16位的交易密码"
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
                                        }<a href="/subject_3/8" target="_blank">《提前还款规则》</a>
                                    </FormItem>
                                    <FormItem className='tips'>
                                        {postResult.message}
                                    </FormItem>
                                    <FormItem  className='center'>
                                        {(isPosting) ?
                                            <Button type="primary" htmlType="submit" className="pop__large" disabled={true}>
                                                <Posting isShow={isPosting}/>
                                            </Button>
                                            : <Button type="primary" htmlType="submit" className="pop__large"
                                                      disabled={ hasErrors(getFieldsError()) || !getFieldValue('is_read') }>确认</Button>

                                        }
                                    </FormItem>
                                </Form>
                            </div>
                        :<div className="pop__repayment">
                            <BbhAlert
                                info={{message:postResult.message,description:postResult.description,type:postResult.type,
                                    callback:()=>{
                                        this.modalClose()
                                    }
                                }}
                            />
                        </div>
                }

            </div>
        );
    }
};

function mapStateToProps(state) {
    const { auth,memberLoans } = state.toJS();
    return {
        auth,
        memberLoans,
    };
}
ModalRepaymentApp = connect(mapStateToProps)(createForm()(ModalRepaymentApp));
export default connect(mapStateToProps)(ModalRepaymentApp);