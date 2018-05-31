import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import Floor from '../../../components/home-page-floor/home-page-floor';
import BbhModal from "../../../components/modal/bbh_modal";
import { connect } from 'react-redux';
import {modal_config} from "../../../utils/modal_config";
import './loan-index.less';
import {repaymentsAc} from "../../../actions/member-loans";
import {accountAc} from "../../../actions/account";

class Loan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bbhModal:false,
            currentModule:``,
            type:``,
            key:Math.random(),
        }

    }
    componentDidMount () {
        window.scrollTo(0,0);
        const {auth,dispatch,account}=this.props;
        if(auth.isAuthenticated){
            dispatch(accountAc.getAccountInfo()); //获取会员帐户信息
        }

    }
    //模态框开启关闭
    toggleModal=(modal,visile,type)=>{
        if(visile){
            this.setState({
                bbhModal:true,
                currentModule: modal,
                type:type,
            });
        }else{
            this.setState({
                bbhModal:false,
                currentModule: ``,
                type:``,
                key:Math.random()
            });
        }
    };
    closeModal(status){
        this.props.dispatch(accountAc.getAccountInfo()); //获取会员帐户信息
        this.toggleModal('bbhModal',false);
    }
    render(){
        const { auth ,account} = this.props;
        return (
            <main className="main loan-index" id="loan-index">
                <div className="banner">
                    <div className="carousel">
                        <div className="carousel__img" style={{ backgroundImage: `url(${require('../../../assets/images/loanIndex/banner.jpg')}) `}}></div>
                    </div>
                </div>
                <div className="wrapper">
                    <div className="steplist">
                        <ul className="steps">
                            <li className="step__1">
                                <i></i>
                                <span>注册并实名认证</span>
                            </li>
                            <li className="step__2">
                                <i></i>
                                <span>借款申请</span>
                            </li>
                            <li className="step__3">
                                <i></i>
                                <span>提交资料</span>
                            </li>
                            <li className="step__4">
                                <i></i>
                                <span>平台审批</span>
                            </li>
                            <li className="step__5">
                                <i></i>
                                <span>审核通关</span>
                            </li>
                        </ul>
                    </div>
                    <Floor
                        otherClassName="loanType"
                        tit="快速借款"
                        tip="该业务由巴巴汇平台提供，精准解决资金难题"
                    >
                        <ul className="loanType__list">
                            <li className="loanType__1">
                                <h4>车贷</h4>
                                <p>适用于公务员、事业单位、银行、<br />最高可借<br /><em>100 万</em></p>

                                {
                                    (!auth.isAuthenticated) ?<Link to={`/login?redirect=%2loan-index`}>点击申请</Link>
                                        :(account.accountsInfo.isCertification===`0`)?
                                        <a className="" onClick={() =>this.toggleModal('ModalCertification',true)}>点击申请</a>
                                        :<a className="" onClick={() =>this.toggleModal('ModalLoanApp',true,1)}>点击申请</a>

                                }
                            </li>
                            <li className="loanType__2">
                                <h4>房贷</h4>
                                <p>适用于公务员、事业单位、银行、<br />最高可借<br /><em>50 万</em></p>
                                {
                                    (!auth.isAuthenticated) ?<Link to={`/login?redirect=%2loan-index`}>点击申请</Link>
                                        :(account.accountsInfo.isCertification===`0`)?<a className="" onClick={() =>this.toggleModal('ModalCertification',true)}>点击申请</a>
                                        :<a className="" onClick={() =>this.toggleModal('ModalLoanApp',true,2)}>点击申请</a>
                                }
                            </li>
                            <li className="loanType__3">
                                <h4>信用贷</h4>
                                <p>适用于公务员、事业单位、银行、<br />最高可借<br /><em>100 万</em></p>
                                {
                                    (!auth.isAuthenticated) ?<Link to={`/login?redirect=%2loan-index`}>点击申请</Link>
                                        :(account.accountsInfo.isCertification===`0`)?<a className="" onClick={() =>this.toggleModal('ModalCertification',true)}>点击申请</a>
                                        :<a className="" onClick={() =>this.toggleModal('ModalLoanApp',true,3)}>点击申请</a>
                                }
                            </li>

                        </ul>
                    </Floor>
                    <Floor
                        otherClassName="faq"
                        tit="常见问题"
                    >
                        <ul className="faq__list">
                            <li className="faq_item">
                                <h4><i className="iconfont icon-tiaojianchaxun"></i>借款申请条件</h4>
                                <ol>
                                    <li>年龄在18-60岁具有完全民事行为能力的自然人；</li>
                                    <li>现居住地居住超过6个月；</li>
                                    <li>有稳定的合法的收入来源；</li>
                                    <li>个人信用记录良好；</li>
                                    <li>私营业主营业执照满1年及以上。</li>
                                </ol>
                            </li>
                            <li className="faq_item">
                                <h4><i className="iconfont icon-tiaojianchaxun"></i>借款优势</h4>
                                <ol>
                                    <li>审核快——1-7天审核完毕；</li>
                                    <li>期限灵活——支持提前还款，支持多种还款方式；</li>
                                    <li>门槛低——月收入达4000元，信誉良好，即可申请借款；</li>
                                    <li>平台可靠——公司实力雄厚；</li>
                                    <li>信息安全——保障个人信息安全。</li>
                                </ol>
                            </li>
                        </ul>
                    </Floor>
                </div>
                {this.state.currentModule!=``?
                    <BbhModal
                        config={modal_config[this.state.currentModule]}
                        visible={this.state.bbhModal}
                        closeFunc={()=>this.closeModal()}
                        moduleName={this.state.currentModule}
                        key={this.state.key}
                        currentId={this.state.type}
                    >

                    </BbhModal>
                    :``
                }
            </main>
        );

    };

};
function select(state) {
    const { auth ,account} = state.toJS();
    return {
        auth,
        account
    };
}
export default connect(select)(Loan);