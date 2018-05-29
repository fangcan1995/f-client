import React from 'react';
import PropTypes from 'prop-types';
import {toMoney,toNumber,addCommas} from '../../../utils/famatData';
import { Form,Row,Input,Button,Checkbox,Col } from 'antd';
import { connect } from 'react-redux';
import {BbhAlert} from '../../bbhAlert/bbhAlert';
import  {memberLoansAc,getImageCode}  from '../../../actions/member-loans';
import { hex_md5 } from '../../../utils/md5';
import {formItemLayout,noop } from '../../../utils/formSetting';
import moment from "moment";
const createForm = Form.create;
const FormItem = Form.Item;

class ModalRepaymentApp extends React.Component {
    componentDidMount () {
        let {onSuccess,onFail,currentId}=this.props;
        console.log('id是')
        console.log(currentId);
        this.props.dispatch(memberLoansAc.getProject(currentId));
        //this.props.dispatch(memberLoansAc.getProject(this.props.info.currentId));
        //this.props.dispatch(getImageCode());
    }
    static propTypes = {
        form: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }
    handleImageCodeImgClick = e => {
        const { dispatch } = this.props;
        dispatch(getImageCode());
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch, form,currentId } = this.props;
        form.validateFields((errors) => {
            if (errors) {
                return false;
            }
            let appInfo={
                password:hex_md5(form.getFieldsValue().password),
                //verifyCode:form.getFieldsValue().verifyCode,
                projectId:currentId
            }
            console.log('提交后台的数据是');
            console.log(appInfo);
            //dispatch(memberLoansAc.postRepaymentApp(appInfo));

        });
    }
    //回调
    modalClose(){
        /*this.setState({
            isReset:true,
        },()=>{
            let {onSuccess,dispatch}=this.props;
            dispatch(accountAc.getAccountInfo());  //真实
            onSuccess();
        });*/
        console.log('点击确认了');
        let {onSuccess,dispatch}=this.props;
        //dispatch(accountAc.getAccountInfo());  //真实
        onSuccess();
    }
    render() {
        let {onSuccess,onFail,value}=this.props;
        let {postResult,projectInfo,isPosting}=this.props.memberLoans.myLoans;
        let {imageCodeImg}=this.props.memberLoans;
        const { getFieldDecorator,getFieldValue } = this.props.form;
        const passwordProps = getFieldDecorator('password', {
            rules: [
                { required: true, min: 6, message: '密码至少为 6 个字符' }
            ]
        });

        const isReadProps = getFieldDecorator('isRead', {
            valuePropName: 'checked',
            initialValue: false,
        })
        return (
            <div className="pop__repayment">
                {
                    (postResult.type!=`success`) ?
                        (projectInfo==='') ? ('')
                            :
                            <div className="form__wrapper">
                                <dl className="form__bar">
                                    <dt><label>项目名称：</label></dt>
                                    <dd>{projectInfo.name}</dd>
                                </dl>
                                {/*<dl className="form__bar">
                                        <dt><label>已还期数：</label></dt>
                                        <dd>{repaymentData.rpmtIssue} 期</dd>
                                    </dl>*/}
                                <dl className="form__bar">
                                    <dt><label>到期日期：</label></dt>
                                    <dd>{moment(projectInfo.expireDate).format('YYYY-MM-DD')}</dd>
                                </dl>
                                <dl className="form__bar">
                                    <dt><label>应还本金：</label></dt>
                                    <dd><p>{addCommas(projectInfo.rpmtCapital)} 元</p></dd>
                                </dl>
                                <dl className="form__bar">
                                    <dt><label>应还利息：</label></dt>
                                    <dd>{addCommas(projectInfo.rpmtIint)} 元</dd>
                                </dl>
                                {
                                    addCommas(projectInfo.lateTotal)>0?
                                        <dl className="form__bar">
                                            <dt><label>应还罚息：</label></dt>
                                            <dd>{addCommas(projectInfo.lateTotal)} 元</dd>
                                        </dl>
                                        :''
                                }
                                <dl className="form__bar">
                                    <dt><label>手续费：</label></dt>
                                    <dd>{addCommas(projectInfo.paidFee)} 元</dd>
                                </dl>
                                <dl className="form__bar">
                                    <dt><label>还款总额：</label></dt>
                                    <dd>{addCommas(projectInfo.rpmtTotal)} 元</dd>
                                </dl>
                                <Form layout="horizontal" onSubmit={this.handleSubmit}>
                                    <FormItem
                                        { ...formItemLayout }
                                        label="交易密码"
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

                                    <FormItem>
                                        {
                                            isReadProps(
                                                <Checkbox>我已阅读并同意<a href="/subject_common/6" target="_blank">《提前还款规则》</a></Checkbox>
                                            )
                                        }
                                    </FormItem>
                                    <div className='tips'>{postResult.message}</div>
                                    <FormItem  className='center'>
                                        {/*<Button type="primary" htmlType="submit" className="pop-button" disabled={!getFieldValue('isRead')}
                                                onClick={this.handleSubmit}>
                                            确认
                                        </Button>*/}
                                        {(isPosting) ? <Button type="primary" htmlType="submit" className="pop__large" disabled={true}>
                                                <Posting isShow={isPosting}/>
                                            </Button>
                                            :
                                            <Button type="primary" htmlType="submit" className="pop__large" onClick={this.handleSubmit}>确认</Button>
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