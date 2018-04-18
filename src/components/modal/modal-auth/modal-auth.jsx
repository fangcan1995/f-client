import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import './modal-auth.less'
import { connect } from 'react-redux';
import {memberAc} from "../../../actions/member";

class ModalAuth extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            tips: '',  //错误提示
        }
    }

    componentDidMount () {
       //获取会员信息
        if(this.props.auth.isAuthenticated) {
            this.props.dispatch(memberAc.getInfo());
        }
    }

    handleSubmit(e) {
        let info={
            trueName:this.refs.trueName.value,
            idNumber:this.refs.idNumber.value,
            bankNo:this.refs.bankNo.value,
        }
        this.props.dispatch(memberAc.postOpenAccount(info));  //绑卡

        //this.props.dispatch(memberAc.getInfo()); //重新获取用户信息

    }

    render() {
        let {member,auth,info}=this.props;
        let {callback}=info;
        let {accountsInfo,isFetching}=member;
        let {postResult}=accountsInfo;
        console.log('postResult');
        console.log(postResult);
        if(!isFetching){
            if(postResult===``) {
                //开户页面
                return (
                    <div className="pop__auth">
                        <div className="form__wrapper" id="area" >
                            <dl className="form__bar">
                                <p><label style={{textAlign:'center',color:'#f00',fontSize:'14px'}}>(虚拟开户)</label></p>
                            </dl>
                            <dl className="form__bar">
                                <dt><label>真实姓名:</label></dt>
                                <dd>
                                    <input type="text" name="trueName"  maxLength="16" className="textInput"  ref="trueName" />
                                </dd>
                            </dl>
                            <dl className="form__bar">
                                <dt><label>身份证号:</label></dt>
                                <dd>
                                    <input type="tel" name="idNumber" ref="idNumber"  maxLength="30"  className="textInput" />
                                </dd>
                            </dl>
                            <dl className="form__bar">
                                <dt><label>银行卡号:</label></dt>
                                <dd>
                                    <input type="tel" name="bankNo" ref="bankNo" maxLength="30"  className="textInput" />
                                </dd>
                            </dl>

                            <div className="form__bar">
                                {this.state.tips != '' ?
                                    <span className="errorMessages">{this.state.tips}</span>
                                    : ''
                                }
                            </div>
                            <div className="form__bar">
                                <button className="button able" style={{marginTop:'30px'}} onClick={this.handleSubmit}>确定</button>
                            </div>
                        </div>

                    </div>
                );
            }else{
                //提交后提示
                <div className="pop__auth">
                    <Alert
                        message={postResult.message}
                        description={postResult.description}
                        type={postResult.type}
                        showIcon
                    />
                    <div className="form__wrapper">
                        <button className="button able" style={{marginTop:'30px'}} onClick={() => callback()}>确定</button>
                    </div>
                </div>
            }
        }

    }
}

function mapStateToProps(state) {
    const { auth,member } = state.toJS();
    return {
        auth,
        member
    };
}
export default connect(mapStateToProps)(ModalAuth);