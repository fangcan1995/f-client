import React from 'react';
import PropTypes from 'prop-types';
import  {addCommas}  from '../../../../assets/js/cost';
import { Form,Row,Input,Button,Checkbox,Col,Alert } from 'antd';
import { connect } from 'react-redux';
import  memberLoansActions  from '../../../../actions/member-loans';
import { hex_md5 } from '../../../../utils/md5';
import moment from "moment";
const createForm = Form.create;
const FormItem = Form.Item;
function noop() {
    return false;
}

class ModalRepayment extends React.Component {
    componentWillMount () {
        this.props.dispatch(memberLoansActions.getRepayment(this.props.info.currentId));
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFields((errors) => {
            if (errors) {
                return false;
            }
            let appInfo={
                password:hex_md5(form.getFieldsValue().password),
                verifyCode:form.getFieldsValue().verifyCode,
                projectId:this.props.currentId,
            }
            dispatch(memberLoansActions.postRepayment(appInfo));

        });
    }
    static propTypes = {
        form: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }
    render() {
        console.log('还款弹框');
        console.log(this.props);
        let {callback}=this.props.info;
        let {postResult}=this.props.memberLoans.repaymentPlans;
        let {repaymentData}=this.props.memberLoans.repaymentPlans.repaymentInfo;
        const { getFieldDecorator,getFieldValue } = this.props.form;
        const passwordProps = getFieldDecorator('password', {
            rules: [
                { required: true, min: 4, message: '密码至少为 4 个字符' }
            ]
        });
        const verifyCodeProps = getFieldDecorator('verify_code', {
            rules: [
                { required: true, min: 4, message: '验证码至少为4个字符' }
            ]
        });
        const isReadProps = getFieldDecorator('isRead', {
            valuePropName: 'checked',
            initialValue: false,
        })
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        return (
            <div className="pop__repayment">
                {
                    (postResult === 0) ?
                        (JSON.stringify(repaymentData) == '{}') ? ('')
                            :
                            <div className="form__wrapper">
                                <dl className="form__bar">
                                    <dt><label>项目名称：</label></dt>
                                    <dd>{repaymentData.name}</dd>
                                </dl>
                                <dl className="form__bar">
                                        <dt><label>还款期数：</label></dt>
                                        <dd>{repaymentData.rpmtIssue} 期</dd>
                                    </dl>
                                <dl className="form__bar">
                                    <dt><label>应还日期：</label></dt>
                                    <dd>{moment(repaymentData.shdRpmtDate).format('YYYY-MM-DD')}</dd>
                                </dl>
                                <dl className="form__bar">
                                    <dt><label>应还本金：</label></dt>
                                    <dd><p>{addCommas(repaymentData.rpmtCapital)} 元</p></dd>
                                </dl>
                                <dl className="form__bar">
                                    <dt><label>应还利息：</label></dt>
                                    <dd>{addCommas(repaymentData.rpmtIint)} 元</dd>
                                </dl>
                                <dl className="form__bar">
                                    <dt><label>应还罚息：</label></dt>
                                    <dd>{addCommas(repaymentData.lateTotal)} 元</dd>
                                </dl>
{/*                                <dl className="form__bar">
                                    <dt><label>应还罚金：</label></dt>
                                    <dd>{addCommas(repaymentData.e)} 元</dd>
                                </dl>*/}
                                <dl className="form__bar">
                                    <dt><label>还款总额：</label></dt>
                                    <dd>{addCommas(repaymentData.rpmtTotal)} 元</dd>
                                </dl>
                                <Form layout="horizontal" onSubmit={this.handleSubmit}>
                                    <FormItem
                                        { ...formItemLayout }
                                        label="交易密码"
                                        hasFeedback
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
                                    <FormItem
                                        { ...formItemLayout }
                                        label="验证码"
                                        hasFeedback
                                    >
                                        <Row gutter={8}>
                                            <Col span={12}>
                                                {
                                                    verifyCodeProps(
                                                        <Input
                                                            size="large"
                                                            type="text"
                                                            autoComplete="off"
                                                            placeholder="验证码"
                                                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                                        />
                                                    )
                                                }
                                            </Col>
                                            <Col span={12}>
                                                <img className="verifyCode__img" src="http://172.16.1.234:8060/uaa/code/image" />
                                            </Col>
                                        </Row>
                                    </FormItem>
                                    <FormItem>
                                        <Button type="primary" htmlType="submit" className="pop-button">
                                            确认
                                        </Button>

                                    </FormItem>
                                </Form>
                            </div>
                        : ''
                }
                {
                    (postResult===1)?
                        <div className="form__wrapper">
                            <Alert
                                message='失败'
                                description='连接失败，请重试'
                                type='success'
                                showIcon
                            />
                            <button className="button able" style={{marginTop:'30px'}} onClick={() => callback() }>确定</button>
                        </div>
                        :''
                }
                {
                    (postResult===2)?
                        <div className="form__wrapper">
                            <Alert
                                message='成功'
                                description='您的申请已经提交'
                                type='success'
                                showIcon
                            />
                            <button className="button able" style={{marginTop:'30px'}} onClick={() => callback() }>确定</button>
                        </div>
                        :''
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