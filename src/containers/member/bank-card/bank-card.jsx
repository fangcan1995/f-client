import React from 'react';
import PropTypes from 'prop-types';
import './bank-card.less';
import Tab from '../../../components/tab/tab';
import Crumbs from '../../../components/crumbs/crumbs';
import { connect } from 'react-redux';
import {memberAc} from '../../../actions/member';
import ModalAuth from '../../../components/modal/modal-auth/modal-auth';
import { Modal } from 'antd';
class BankCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            modalAuth:false,
            key:Math.random()
        }
    }
    componentDidMount() {
        window.scrollTo(0,0);
    }

    changeCard(){
        alert('更换银行卡,第三方暂不开发');
    }
    //模态框开启关闭
    toggleModal=(modal,visile)=>{
        if(visile){
            this.setState({
                [modal]: true,
            });
        }else{
            this.setState({
                [modal]: false,
                key:Math.random()
            });
        }
    };
    render(){
        let {openAccountStatus,acBank,basicInfo,postResult}=this.props.member.accountsInfo;
        if(postResult.code==='0'){
            this.props.dispatch(memberAc.modifyState({postResult:''}));
            this.props.dispatch(memberAc.getInfo());
        }
        return (
            <div className="member__main">
                <Crumbs />
                <div className="member__cbox">
                    <Tab>
                        <div name="我的银行卡">
                            <div className="tab_content">
                                {
                                    (openAccountStatus === 0) ?<div className="addCard">
                                            <p>为保证账户资金安全，请绑定本人的银行卡</p>
                                            <div className="grayCard">
                                                <a href="javascript:void(0);" style={{color: '#31aaf5'}}
                                                   onClick={() => this.toggleModal(`modalAuth`,true)}>
                                                    <i className="iconfont add"></i>
                                                    <p>绑定银行卡！</p>
                                                </a>
                                            </div>
                                        </div>
                                        :(openAccountStatus === 1) ?
                                        <div className="editCard">
                                            <div className="form__wrapper">
                                                <div className="card">
                                                    <p><strong>用户名</strong>{basicInfo.trueName}</p>
                                                    <p><strong>银行账号</strong>{acBank.bankNo}</p>
                                                    <p><strong>开户行</strong>{acBank.bankName}</p>
                                                </div>
                                                <div className="form__bar">
                                                    <button className="button able" style={{ width: '200px',marginTop:'20px',cursor:'pointer'}} onClick={() => {
                                                        this.changeCard()
                                                    }}>更换银行卡</button>
                                                </div>
                                            </div>
                                        </div>
                                        :``
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
                <Modal
                    title="开户"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modalAuth}
                    width="520px"
                    footer={null}
                    destroyOnClose={true}
                    onCancel={() => {
                        this.toggleModal(`modalAuth`,false);

                    }}
                >

                    <ModalAuth key={this.state.key} info={
                        {
                            callback:(obj)=>{
                                this.toggleModal(`modalAuth`,false);
                            }
                        }
                    }
                    />
                    }
                </Modal>
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

