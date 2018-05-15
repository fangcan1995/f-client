import React from 'react';
import PropTypes from 'prop-types';
import { Form,Row,Input,Button,Checkbox,Col,Alert,Icon } from 'antd';
import { connect } from 'react-redux';
import {Loading,NoRecord,Posting,BbhAlert} from '../../../components/bbhAlert/bbhAlert';
import {realnameRegExp,idcodeRegExp } from '../../../utils/regExp';
import {formItemLayout,noop } from '../../../utils/formSetting';
import {accountAc} from "../../../actions/account";
import "./modal-certification.less";

const createForm = Form.create;
const FormItem = Form.Item;

class ModalCertification extends React.Component {
    componentDidMount () {
        this.props.dispatch(accountAc.getAccountInfo()); //获取会员帐户信息
    }
    static propTypes = {
        form: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }
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
                trueName:form.getFieldsValue().trueName,
                idCode:form.getFieldsValue().idCode,
            }
            console.log('提交后台的数据是');
            console.log(appInfo);
            dispatch(accountAc.certification(appInfo));

        });
    }
    //回调
    modalClose(){
        let {onSuccess,onFail,dispatch}=this.props;
        //清空postResult
        dispatch(accountAc.clear());
        onSuccess();
    }
    render(){
        console.log('-------------this.props---------------');
        console.log(this.props);
        let {onSuccess,onFail}=this.props;
        let {isPosting,postResult,accountsInfo}=this.props.account;
        let {isCertification,isOpenAccount,isSetTradepassword}=accountsInfo;
        const { getFieldDecorator,getFieldValue } = this.props.form;
        const trueNameProps = getFieldDecorator('trueName', {
            rules: [
                { required: true, pattern: realnameRegExp, message: '请输入真实姓名' }
            ]
        });
        const idCodeProps = getFieldDecorator('idCode', {
            validate: [{
                rules: [
                    { required: true, pattern: idcodeRegExp, message: '请输入正确的身份证号' }
                ],
                trigger: ['onBlur', 'onChange']
            }]
        });

        if(postResult.type!=`success` ){
            return(
                <div className="pop__certification">
                    <div className="form__wrapper">
                        <Form layout="horizontal" onSubmit={this.handleSubmit} id='frm'>

                            <FormItem
                                { ...formItemLayout }
                                label="真实姓名"
                            >
                                {
                                    trueNameProps(
                                        <Input
                                            type="text"
                                            autoComplete="off"
                                            placeholder=""
                                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem
                                { ...formItemLayout }
                                label="身份证号"
                            >
                                {
                                    idCodeProps(
                                        <Input
                                            type="text"
                                            autoComplete="off"
                                            placeholder=""
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
                        <button onClick={()=>onFail()}>下一步</button>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="pop__password pop">
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
    const { auth, account} = state.toJS();
    return {
        auth,
        account,
    };
}
ModalCertification = connect(mapStateToProps)(createForm()(ModalCertification));
export default connect(mapStateToProps)(ModalCertification);