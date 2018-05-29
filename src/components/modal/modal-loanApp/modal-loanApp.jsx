import React from 'react';
import { Form,Input,Button,Row,Col,Select } from 'antd';
import { connect } from 'react-redux';
import {Loading,NoRecord,Posting,BbhAlert} from '../../../components/bbhAlert/bbhAlert';
import {amountExp } from '../../../utils/regExp';
import {formItemLayout, noop} from '../../../utils/formSetting';
import {accountAc} from "../../../actions/account";
import {getImageCode} from "../../../actions/login";
import { getApplyData,checkForm ,formData,postLoanData,clear, hideModal1 } from '../../../actions/loan-index'
import PropTypes from "prop-types";
import "./modal-loanApp.less";

const createForm = Form.create;
const FormItem = Form.Item;

const Option = Select.Option;
class ModalLoanApp extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            repayType:`1`
        }
        this.typeChange = this.typeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    static propTypes = {
        form: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }
    typeChange(value) {
        this.setState({
            repayType: value
        });
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
                applyAmt: form.getFieldsValue().amount,
                graphValidateCode:form.getFieldsValue().image_code,
                loanExpiry:form.getFieldsValue().loanExpiry,
                loanPurpose: form.getFieldsValue().loanPurpose,
                loanType: currentId,
                repayType: this.state.repayType

            }

            dispatch(postLoanData(appInfo))

        });

    }

    componentDidMount () {
        const { dispatch,loans } = this.props;
        dispatch(getImageCode());
        dispatch(clear());
    }
    handleImageCodeImgClick = e => {
        const { dispatch } = this.props;
        dispatch(getImageCode());
    }
    //回调
    modalClose(){
        let {onSuccess,onFail,dispatch}=this.props;
        //清空postResult
        dispatch(accountAc.clear());
        onSuccess();
    }
    render(){
        const {onSuccess,onFail,loans,account,auth}=this.props;
        const {applyMessage}=loans;
        const { imageCodeImg } = this.props.login;
        const {isPosting,postResult,accountsInfo}=account;
        const {trueName,idNumber,surplusAmount}=accountsInfo;
        const { getFieldDecorator,getFieldValue } = this.props.form;
        const amountProps = getFieldDecorator('amount', {
            rules: [
                { required: true, pattern: amountExp, message: '借款金额有误' }
            ]
        });
        const imageCodeProps = getFieldDecorator('image_code', {
            validate: [{
                rules: [
                    { required: true, min: 4, message: '验证码至少为4个字符' }
                ],
                trigger: ['onBlur', 'onChange']
            }]
        });

        if(applyMessage.type!=`success` ){
            return(
                <div className="pop__loanApp">

                    <div className="form__wrapper" id="area">
                        <form id="frm"  onSubmit={this.handleSubmit}>
                            <div className="fl">
                                <Form layout="horizontal" onSubmit={this.handleSubmit}>
                                    <FormItem
                                        { ...formItemLayout }
                                        label="借款金额"
                                        required
                                    >
                                        {
                                            amountProps(
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
                                        label="借款期限"
                                        required
                                    >
                                        {getFieldDecorator('loanExpiry', {
                                            rules: [
                                                { required: true, message: '请选择借款期限' },
                                            ],
                                        })(
                                        <Select placeholder="请选择"
                                        >
                                            <Option value="3">3个月</Option>
                                            <Option value="6">6个月</Option>
                                            <Option value="12">12个月</Option>
                                        </Select>
                                        )}

                                    </FormItem>
                                    <FormItem
                                        { ...formItemLayout }
                                        label="还款方式"
                                        required
                                    >

                                        <Select
                                            defaultValue="1"
                                            onChange={this.typeChange}
                                        >
                                            <Option value="1">按月付息，到期还本</Option>
                                            <Option value="2">一次性还本还息</Option>
                                        </Select>

                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="借款用途"
                                        required
                                    >
                                        {getFieldDecorator('loanPurpose', {
                                            rules: [
                                                { required: true, message: '请选择借款用途' },
                                            ],
                                        })(
                                            <Select placeholder="请选择" >
                                                <Option value="1">经营</Option>
                                                <Option value="2">消费</Option>
                                                <Option value="3">资金周转</Option>
                                                <Option value="4">其他</Option>
                                            </Select>
                                        )}
                                    </FormItem>

                                    <FormItem
                                        { ...formItemLayout }
                                        label="验证码"
                                        required
                                    >
                                        <Row gutter={12}>
                                            <Col span={14}>
                                                <FormItem
                                                    hasFeedback
                                                >
                                                    {
                                                        imageCodeProps(
                                                            <Input
                                                                size="large"
                                                                type="text"
                                                                autoComplete="off"
                                                                placeholder="验证码"
                                                                onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                                            />
                                                        )
                                                    }
                                                </FormItem>
                                            </Col>
                                            <Col span={10}>
                                                <img
                                                    className="imageCode__img"
                                                    src={ imageCodeImg }
                                                    onClick={ this.handleImageCodeImgClick }
                                                />
                                            </Col>
                                        </Row>

                                    </FormItem>

                                    <div className='tips'>{applyMessage.message}</div>
                                    <FormItem className='center'>
                                        {(isPosting) ? <Button type="primary" htmlType="submit" className="pop__large" disabled={true}>
                                                <Posting isShow={isPosting}/>
                                            </Button>
                                            :
                                            <Button type="primary" htmlType="submit" className="pop__large" >确认</Button>
                                        }
                                    </FormItem>
                                </Form>
                            </div>
                            <div className="fr">
                                <div className="member_info">
                                    <ul>
                                        <li>
                                            <strong>姓名:</strong>{trueName}
                                        </li>
                                        <li>
                                            <strong>手机号码:</strong>{auth.userName}
                                        </li>
                                        <li>
                                            <strong>身份证号:</strong>{idNumber }
                                        </li>
                                    </ul>
                                </div>
                                <dl>
                                    <dt><h3>最高额度：</h3></dt>
                                    <dd>平台用户最高借款金额为{surplusAmount}.00元<br/>剩余借款额度随借款笔数和金额的增加而减少。</dd>
                                </dl>
                                <dl>
                                    <dt><h3>申请条件：</h3></dt>
                                    <dd id="sqtj">以借款人的信用情况为基础，巴巴汇平台评估借款人资质后，对其授信一定额度发标借款。</dd>
                                </dl>
                            </div>
                            <input type='hidden' value={loans.loanType} ref='loanType'/>
                        </form>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="pop__password pop">
                    <BbhAlert
                        info={{
                            type:applyMessage.type,
                            message:applyMessage.message,
                            description:applyMessage.description,
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
    const { auth, account,loans,login} = state.toJS();
    return {
        auth,
        account,loans,
        login
    };
}
ModalLoanApp = connect(mapStateToProps)(createForm()(ModalLoanApp));
export default connect(mapStateToProps)(ModalLoanApp);