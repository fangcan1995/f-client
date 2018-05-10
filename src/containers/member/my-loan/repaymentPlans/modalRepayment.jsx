import React from 'react';
import PropTypes from 'prop-types';
import  {addCommas}  from '../../../../utils/cost';
import { Form,Row,Input,Button,Checkbox,Col } from 'antd';
import { connect } from 'react-redux';
import  {repaymentsAc}  from '../../../../actions/member-loans';
import {BbhAlert} from '../../../../components/bbhAlert/bbhAlert';
import { hex_md5 } from '../../../../utils/md5';
import moment from "moment";
const createForm = Form.create;
const FormItem = Form.Item;
function noop() {
    return false;
}

class ModalRepayment extends React.Component {
    componentDidMount () {
        this.props.dispatch(repaymentsAc.getRepayment(this.props.info.currentId));
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
            dispatch(repaymentsAc.postRepayment(appInfo));

        });
    }
    static propTypes = {
        form: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }
    render() {
        let {callback}=this.props.info;
        let {postResult,projectInfo}=this.props.memberLoans.repaymentPlans;
        let {imageCodeImg}=this.props.memberLoans; //
        const { getFieldDecorator,getFieldValue } = this.props.form;
        const passwordProps = getFieldDecorator('password', {
            rules: [
                { required: true, min: 6, message: '密码至少为 6 个字符' }
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
                    (postResult === ``) ?
                        (projectInfo === '') ? ``
                            : <div className="form__wrapper">
                                <dl className="form__bar">
                                    <dt><label>项目名称：</label></dt>
                                    <dd>{projectInfo.name}</dd>
                                </dl>
                                <dl className="form__bar">
                                        <dt><label>还款期数：</label></dt>
                                        <dd>{projectInfo.rpmtIssue} 期</dd>
                                    </dl>
                                <dl className="form__bar">
                                    <dt><label>应还日期：</label></dt>
                                    <dd>{moment(projectInfo.shdRpmtDate).format('YYYY-MM-DD')}</dd>
                                </dl>
                                <dl className="form__bar">
                                    <dt><label>应还本金：</label></dt>
                                    <dd><p>{addCommas(projectInfo.rpmtCapital)} 元</p></dd>
                                </dl>
                                <dl className="form__bar">
                                    <dt><label>应还利息：</label></dt>
                                    <dd>{addCommas(projectInfo.rpmtIint)} 元</dd>
                                </dl>
                                <dl className="form__bar">
                                    <dt><label>应还罚息：</label></dt>
                                    <dd>{addCommas(projectInfo.lateTotal)} 元</dd>
                                </dl>
{/*                                <dl className="form__bar">
                                    <dt><label>应还罚金：</label></dt>
                                    <dd>{addCommas(projectInfo.e)} 元</dd>
                                </dl>*/}
                                <dl className="form__bar">
                                    <dt><label>还款总额：</label></dt>
                                    <dd>{addCommas(projectInfo.rpmtTotal)} 元</dd>
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
                                                <img
                                                    className="imageCode__img"
                                                    src={ imageCodeImg }
                                                    onClick={ this.handleImageCodeImgClick }
                                                />
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
                        : <div>
                            <BbhAlert
                                info={{
                                    message:'失败',
                                    description:'连接失败，请重试',
                                    type:'error',
                                    callback:(obj)=>{
                                        callback();
                                    }
                                }}
                            />
                            <BbhAlert
                                info={{
                                    message:'成功',
                                    description:'您的申请已经提交',
                                    type:'success',
                                    callback:(obj)=>{
                                        callback();
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