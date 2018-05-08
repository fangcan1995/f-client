import React from 'react';
import PropTypes from 'prop-types';
import { Form,Row,Input,Button,Checkbox,Col,Alert,Icon } from 'antd';
import { connect } from 'react-redux';
import {myAuthInfoAc} from '../../../../actions/member-settings';
import { hex_md5 } from '../../../../utils/md5';
import {memberAc} from "../../../../actions/member";
import {BbhAlert} from '../../../../components/bbhAlert/bbhAlert';
import {Loading,NoRecord,Posting} from '../../../../components/bbhAlert/bbhAlert';
const passwordRegExp = /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*?_., ]).*$/;
const createForm = Form.create;
const FormItem = Form.Item;
function noop() {
    return false;
}
class ModalResetPassword extends React.Component {
    conole
    static propTypes = {
        form: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }
    modalClose(){
        //清空postResult
        this.props.dispatch(myAuthInfoAc.modifyState({'postResult':``}));
        let {callback}=this.props.info;
        callback();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFields((errors) => {
            if (errors) {
                return false;
            }
            let appInfo={
                type:`member`,
                username:this.props.auth.user.userName,
                old_password:hex_md5(form.getFieldsValue().oldPassword),
                new_password:hex_md5(form.getFieldsValue().newPassword),
            }
            //console.log('提交后台的数据是');
            //console.log(appInfo);
            dispatch(myAuthInfoAc.postPassword(appInfo));

        });
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('两次输入的密码不一致');
        } else {
            callback();
        }
    }
    render() {
       /* console.log('propTypes');
        console.log(propTypes);*/
        let {isPosting}=this.props.memberSettings;
        let {callback}=this.props.info;
        console.log('this.props');
        console.log(this.props);
        let {postResult}=this.props.memberSettings.authInfo;

        const { getFieldDecorator,getFieldValue } = this.props.form;
        const oldPasswordProps = getFieldDecorator('oldPassword', {
            rules: [
                { required: true, min: 6, message: '密码至少为 6 个字符' }
            ]
        });
        const newPasswordProps = getFieldDecorator('newPassword', {
            validate: [{
                rules: [
                    { required: true, pattern: passwordRegExp, message: '密码长度为6-16位，必须包含数字、字母、符号' }

                ],
                trigger: ['onBlur', 'onChange']
            }]
        });

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
                <div className="pop__password">
                    {postResult===``?
                    <div className="form__wrapper">
                        <Form layout="horizontal" onSubmit={this.handleSubmit} id='frm'>

                            <FormItem
                                { ...formItemLayout }
                                label="原密码"
                                hasFeedback
                            >
                                {
                                    oldPasswordProps(
                                        <Input
                                            type="password"
                                            autoComplete="off"
                                            placeholder=""
                                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem
                                { ...formItemLayout }
                                label="新密码"
                                hasFeedback
                            >
                                {
                                    newPasswordProps(
                                        <Input
                                            type="password"
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            autoComplete="off"
                                            placeholder="设置6-16位的登录密码"
                                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                        />
                                    )
                                }
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="确认新密码"
                                hasFeedback
                            >
                                {getFieldDecorator('confirm', {
                                    rules: [{
                                        required: true, message: '请确认新密码',
                                    }, {
                                        validator: this.compareToFirstPassword,
                                    }],
                                })(
                                    <Input
                                        type="password"
                                        autoComplete="off"
                                        placeholder=""
                                        onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                    />
                                )}
                            </FormItem>

                            <FormItem>
                                {(isPosting) ? <Button type="primary" htmlType="submit" className="pop__large" disabled={true}>
                                        <Posting isShow={isPosting}/>
                                    </Button>
                                    :
                                    <Button type="primary" htmlType="submit" className="pop__large">确认</Button>
                                }
                            </FormItem>
                        </Form>
                    </div>
                        :<BbhAlert
                            info={{message:postResult.message,description:postResult.description,type:postResult.type,
                                callback:()=>{
                                    this.modalClose()
                                }
                            }}
                        />}
                </div>
            )

    }
};

function mapStateToProps(state) {
    const { auth, memberSettings} = state.toJS();
    return {
        auth,
        memberSettings,
    };
}
ModalResetPassword = connect(mapStateToProps)(createForm()(ModalResetPassword));
export default connect(mapStateToProps)(ModalResetPassword);