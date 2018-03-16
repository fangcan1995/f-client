import React from 'react';
import PropTypes from 'prop-types';
import './bank-card.less';
import Tab from '../../../components/tab/tab';
import Crumbs from '../../../components/crumbs/crumbs';
import { connect } from 'react-redux';
import  memberActions  from '../../../actions/member';

class BankCard extends React.Component{
    componentDidMount() {
        this.props.dispatch(memberActions.getInfo());
    }
    bindCard(){
        let postData={
            escrowCode:100100,
            custId:123,
            accountBalance:0,
            freezingAmount:0,
            availableBalance:0

        };
        this.props.dispatch(memberActions.postOpenAccount(postData));
    }
    render(){
        console.log(this.props);
        let {openAccountStatus,acBank}=this.props.member.accountsInfo;
        console.log(openAccountStatus);
        return (
            <div className="member__main">
                <Crumbs />
                <div className="member__cbox">
                    <Tab>
                        <div name="我的银行卡">
                            <div className="tab_content">
                                {
                                    (openAccountStatus === 1) ?<div className="addCard">
                                            <p>为保证账户资金安全，请绑定本人的银行卡</p>
                                            <div className="grayCard">
                                                <a href="javascript:void(0);" style={{color: '#31aaf5'}} onClick={() => {
                                                    this.bindCard()
                                                }}> 绑定银行卡！</a>
                                            </div>
                                        </div>
                                        :<div className="editCard">
                                            <div className="form__wrapper">
                                                <div className="card">
                                                    <p><strong>用户名</strong>{acBank.bankName}</p>
                                                    <p><strong>银行账号</strong>{acBank.bankNo}</p>
                                                    <p><strong>开户行</strong>{acBank.bankName}</p>
                                                </div>
                                                <div className="form__bar">
                                                    <button className="button able" style={{ width: '200px',marginTop:'20px'}} onClick={() => {
                                                        this.bindCard()
                                                    }}>更换银行卡</button>
                                                </div>
                                            </div>
                                        </div>
                                }


                            </div>
                        </div>
                    </Tab>

                </div>
                <div className="member__cbox m-wxts">
                    <Tab>
                        <div name="温馨提示">
                            <div className="tab_content">
                                <p>1、目前只支持储蓄卡<br/>2、不支持信用卡<br/>3、目前只能支持一张银行卡，可以修改</p>
                            </div>
                        </div>
                    </Tab>

                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { auth,member } = state.toJS();
    return {
        auth,
        member
    };
}
export default connect(mapStateToProps)(BankCard);

