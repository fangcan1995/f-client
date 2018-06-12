import React from 'react';
import PropTypes from 'prop-types';
import {toMoney,toNumber,addCommas} from '../../../utils/famatData';
import { Form,Row,Input,Button,Checkbox,Col } from 'antd';
import { connect } from 'react-redux';
import {memberLoansAc, repaymentsAc} from '../../../actions/member-loans';
import {accountAc} from '../../../actions/account';
import { hex_md5 } from '../../../utils/md5';
import {formItemLayout, hasErrors, noop} from '../../../utils/formSetting';
import {Posting,BbhAlert} from '../../../components/bbhAlert/bbhAlert';
import moment from "moment";
const createForm = Form.create;
const FormItem = Form.Item;

class ModalRepayment extends React.Component {
    componentDidMount () {
        let {currentId}=this.props;
        this.props.dispatch(repaymentsAc.getRepayment(currentId));
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch, form,memberLoans,currentId } = this.props;
        const {projectInfo}=memberLoans.repaymentPlans;
        form.validateFields((errors) => {
            if (errors) {
                return false;
            }
            let appInfo={
                traderPassword:hex_md5(form.getFieldsValue().password), //交易密码
                id:currentId,  //还款计划id
                shdRpmtDate:projectInfo.shdRpmtDate ,//应还日期
                projectName:projectInfo.projectName ,//项目名称
                rpmtIssue:projectInfo.rpmtIssue ,//还款期数
                paidFee: projectInfo.paidFee,//应还服务费
                rpmtCapital:projectInfo.rpmtCapital ,//应还本金
                rpmtIint: projectInfo.rpmtIint,//应还利息
                lateFine:projectInfo.lateFine ,//应还罚金
                lateIint:projectInfo.lateIint ,//应还罚息
                sum : projectInfo.sum,//还款总额
                paidFee: projectInfo.paidFee,//手续费
            }
            //console.log('要提交的还款信息');
            //console.log(appInfo);
            dispatch(repaymentsAc.postRepayment(appInfo));

        });
    }
    static propTypes = {
        form: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }
    //回调
    modalClose(){
        let {onSuccess,dispatch}=this.props;
        dispatch(memberLoansAc.stateModify({postResult:``}));
        //模态框回调方法只清楚post结果，但不更新父组件数据
        onSuccess();
    }
    render() {
        //let {callback}=this.props.info;
        const {isPosting}=this.props.memberLoans
        const {postResult,projectInfo}=this.props.memberLoans.repaymentPlans;
        const { getFieldDecorator,getFieldValue,getFieldsError } = this.props.form;
        const passwordProps = getFieldDecorator('password', {
            rules: [
                { required: true, min: 6, message: '密码至少为 6 个字符' }
            ]
        });
        console.log('还款详情');
        console.log(projectInfo);
        return (
            <div className="pop__repayment">
                {
                    (postResult.type!=`success`) ?
                        (projectInfo === '') ? ``
                            : <div className="form__wrapper">
                                <Form layout="horizontal" onSubmit={this.handleSubmit}>
                                <FormItem
                                    { ...formItemLayout }
                                    label="项目名称"
                                >
                                    {projectInfo.projectName}
                                </FormItem>
                                    <FormItem
                                        { ...formItemLayout }
                                        label="还款期数"
                                    >
                                        {projectInfo.rpmtIssue} 期
                                    </FormItem>
                                    <FormItem
                                        { ...formItemLayout }
                                        label="应还日期"
                                    >
                                        {moment(projectInfo.shdRpmtDate).format('YYYY-MM-DD')}
                                    </FormItem>
                                    <FormItem
                                        { ...formItemLayout }
                                        label="应还本金"
                                    >
                                        {addCommas(projectInfo.rpmtCapital)} 元
                                    </FormItem>
                                    <FormItem
                                        { ...formItemLayout }
                                        label="应还利息"
                                    >
                                        {addCommas(projectInfo.rpmtIint)} 元
                                    </FormItem>
                                    {/*<FormItem
                                        { ...formItemLayout }
                                        label="应还罚金"
                                    >
                                        {addCommas(projectInfo.lateFine)} 元
                                    </FormItem>*/}
                                    <FormItem
                                        { ...formItemLayout }
                                        label="应还罚息"
                                    >
                                        {addCommas(projectInfo.lateIint)} 元
                                    </FormItem>
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
                                        {addCommas(projectInfo.sum)} 元
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
                                    <FormItem className='tips'>
                                        {postResult.message}
                                    </FormItem>

                                    <FormItem  className='center'>
                                        {(isPosting) ?
                                            <Button type="primary" htmlType="submit" className="pop__large" disabled={true}>
                                                <Posting isShow={isPosting}/>
                                            </Button>
                                            : <Button type="primary" htmlType="submit" className="pop__large" disabled={ hasErrors(getFieldsError())  }>确认</Button>

                                        }
                                    </FormItem>
                                </Form>
                            </div>
                        : <div  className="pop__repayment">

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
ModalRepayment = connect(mapStateToProps)(createForm()(ModalRepayment));
export default connect(mapStateToProps)(ModalRepayment);