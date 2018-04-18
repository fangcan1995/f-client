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
        console.log('进来了');
    }

    handleSubmit(e) {
        // 提交后台

        console.log('提交后台');
        let info={
            trueName:this.refs.trueName.value,
            idNumber:this.refs.idNumber.value,
            bankNo:this.refs.bankNo.value,
        }
        console.log(info);
        this.props.dispatch(memberAc.postOpenAccount(info));  //绑卡

    }

    render() {

        let {member,auth}=this.props;
        let {accountsInfo}=member;
        let {postResult}=accountsInfo;

        if(postResult===``) {
            return (
                <div className="pop__invest">

                    <div className="form__wrapper" id="area" >
                        <dl className="form__bar">
                            <p><label style={{textAlign:'center',color:'#f00',fontSize:'14px'}}>(虚拟开户)</label></p>
                        </dl>
                        <dl className="form__bar">
                            <dt><label>真实姓名:</label></dt>
                            <dd>
                                <input type="text" name="trueName"  maxLength="16" className="textInput" value={this.state.trueName} ref="trueName"/>
                            </dd>
                        </dl>
                        <dl className="form__bar">
                            <dt><label>身份证号:</label></dt>
                            <dd>
                                <input type="tel" name="idNumber" ref="idNumber"  maxLength="30" className="textInput" />
                            </dd>
                        </dl>
                        <dl className="form__bar">
                            <dt><label>银行卡号:</label></dt>
                            <dd>
                                <input type="tel" name="bankNo" ref="bankNo" maxLength="30" className="textInput" />
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
        }else if(postResult.code==1 || postResult.code==2){
            return(
                <div className="pop__invest">
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
            )
        }else{
            return(
                <div className="pop__invest">等待开发</div>
            )
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