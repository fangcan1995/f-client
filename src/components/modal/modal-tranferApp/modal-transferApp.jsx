import React from 'react';
import { Form,Input,Button,Row,Col,Select } from 'antd';
import { connect } from 'react-redux';
import {Loading,NoRecord,Posting,BbhAlert} from '../../../components/bbhAlert/bbhAlert';
import {amountExp } from '../../../utils/regExp';
import {formItemLayout, noop} from '../../../utils/formSetting';
import {accountAc} from "../../../actions/account";
import {getImageCode} from "../../../actions/login";
import PriceInput from "../../../components/price-input/price-input";
import { getApplyData,clear,postLoanData } from '../../../actions/loan-index';
import {addCommas, getTips, toMoney} from "../../../utils/famatData";
import PropTypes from "prop-types";
import "./modal-loanApp.less";
import {hex_md5} from "../../../utils/md5";

const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;



class ModalTransferApp extends React.Component {
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
                applyAmt: form.getFieldsValue().price.number,
                id: currentId,
                tradePassword:hex_md5(form.getFieldsValue().newPassword),

            }
            dispatch(postLoanData(appInfo))

        });

    }

    componentDidMount () {
        const { dispatch,loans,currentId } = this.props;
        dispatch(clear());
        dispatch(getApplyData(currentId))
        dispatch(getImageCode());
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
    checkPrice = (rule, value, callback) => {
        const {loans}=this.props;
        if(value.number < 1000){
            callback('借款金额不能小于1000元');
            return false;
        }
        if(value.number > loans.maxAmount){
            callback(`借款金额不能超过${loans.maxAmount}元`);
            return false;
        }
        callback();
        return;
    }
    render(){
        const {loans}=this.props;
        const {applyMessage,postinged,isPosting}=loans;
        const { imageCodeImg } = this.props.login;
        const { getFieldDecorator,getFieldValue } = this.props.form;
        const newPasswordProps = getFieldDecorator('newPassword', {
            rules: [
                { required: true, min: 6, message: '交易密码至少为 6 个字符' }
            ]
        });
        if(applyMessage.type!=`success` ){
            return(
                <div className="pop__transferApp">
                    <div className="form__wrapper" id="area">
                        <form id="frm"  onSubmit={this.handleSubmit}>
                            <Form layout="horizontal" onSubmit={this.handleSubmit}>
                                <FormItem
                                    { ...formItemLayout }
                                    label="实际投资金额"
                                    required
                                >
                                    1000.00元
                                </FormItem>
                                <FormItem
                                    { ...formItemLayout }
                                    label="转让金额"
                                    required
                                >
                                    {getFieldDecorator('price', {
                                        initialValue: { number: 0 },
                                        rules: [{ validator: this.checkPrice }],
                                    })(<PriceInput />)}
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
                                    required
                                >
                                    1000.00元

                                </FormItem>
                                <FormItem
                                    { ...formItemLayout }
                                    label="预期到账金额"
                                    required
                                >
                                    1000.00元


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
    const { auth, loans,login} = state.toJS();
    return {
        auth,
        loans,
        login
    };
}
ModalTransferApp = connect(mapStateToProps)(createForm()(ModalTransferApp));
export default connect(mapStateToProps)(ModalTransferApp);