import React from 'react';
import PropTypes from 'prop-types';
import { Form,Row,Input,Button,Checkbox,Col,Alert,Icon } from 'antd';
import { connect } from 'react-redux';
import {memberAc} from "../../../actions/member";
import {Loading,NoRecord,Posting,BbhAlert} from '../../../components/bbhAlert/bbhAlert';
import {passwordRegExp } from '../../../utils/regExp';
import {formItemLayout,noop } from '../../../utils/formSetting';
import {hex_md5} from "../../../utils/md5";


const createForm = Form.create;
const FormItem = Form.Item;
let configPasswordRegExp = null;

class ModalLoginPassword extends React.Component {
    constructor() {
        super();
    }
    static propTypes = {
        form: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }
    componentWillMount () {
        this.props.dispatch(memberAc.clear());
    }
    configPasswordRegExp = ()=>{
        const { form } = this.props;
        configPasswordRegExp = new RegExp (`^${form.getFieldsValue().newPassword}$`);
        return configPasswordRegExp
    };
    //提交
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
            console.log('提交后台的数据是');
            console.log(appInfo);
            dispatch(memberAc.setLoginPassword(appInfo));

        });
    }
    //回调
    modalClose(){
        let {onSuccess}=this.props;
        onSuccess();
    }
    render(){
        let {isPosting,postResult}=this.props.member;
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
        const configPasswordProps = getFieldDecorator('configPassword', {
            validate: [{
                rules: [
                    { required: true, pattern: configPasswordRegExp, message: '与第一次输入的密码不一致' }

                ],
                trigger: ['onBlur', 'onChange']
            }]
        });
        if(postResult.type!=`success`){
            return(
                <div className="pop__password">
                    <div className="form__wrapper" >

                        <Form layout="horizontal" onSubmit={this.handleSubmit} id='frm'>
                            <FormItem
                                { ...formItemLayout }
                                label="原密码"
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
                            >
                                {
                                    newPasswordProps(
                                        <Input
                                            type="password"
                                            autoComplete="off"
                                            placeholder="设置6-16位的登录密码"
                                            onBlur={this.configPasswordRegExp}
                                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                        />
                                    )
                                }
                            </FormItem>

                            <FormItem
                                { ...formItemLayout }
                                label="确认新密码"
                            >
                                {
                                    configPasswordProps(
                                        <Input
                                            type="password"
                                            autoComplete="off"
                                            placeholder="请再次输入新密码"
                                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                        />
                                    )
                                }
                            </FormItem>
                            <div className='tips'>{postResult.message}</div>
                            <FormItem className='center'>
                                {(isPosting) ? <Button type="primary" htmlType="submit" className="pop__large" disabled={true}>
                                        <Posting isShow={isPosting}/>
                                    </Button>
                                    :
                                    <Button type="primary" htmlType="submit" className="pop__large">确认</Button>
                                }
                            </FormItem>
                        </Form>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="pop__password">
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
    const { auth, member} = state.toJS();
    return {
        auth,
        member,
    };
}
ModalLoginPassword = connect(mapStateToProps)(createForm()(ModalLoginPassword));
export default connect(mapStateToProps)(ModalLoginPassword);