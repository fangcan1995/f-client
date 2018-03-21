import React,{Component} from 'react';
import PropTypes from 'prop-types';
import './loan-index.less';
import Floor from '../../../components/home-page-floor/home-page-floor';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
import Login from '../../login/login'
import { showModal,hideModal } from '../../../actions/login-modal';
import LoginModal from '../../../components/login-modal/login-modal'

class Loan extends Component {
  state = {
    ModalText: 'Content of the modal dialog',
    visible: false,
    footer:null
  }
  showModal = () => {
    const { dispatch } = this.props;
    dispatch(showModal())
  }
  showModal1 = () => {
    this.setState({
      visible: true,
    })
  }
  handleOk = () => {
    this.setState({
      ModalText: 'The modal dialog will be closed after two seconds',
      confirmLoading: true,
    });
    
  }
  
  handleCancel = () => {
    console.log('Clicked cancel button');
    const { dispatch } = this.props;
    console.log(3)
    dispatch(hideModal())
  }

  handleCancel1 = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    })
  }
  componentWillUnmount(){
   
  }
  render(){
    const { auth ,loginModal} = this.props;
    console.log(auth)
    // auth.isAuthenticated
    if(true){
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
                  <a className="" onClick={this.showModal1}>点击申请</a>
                </li>
                <li className="loanType__2">
                  <h4>房贷</h4>
                  <p>适用于公务员、事业单位、银行、<br />最高可借<br /><em>50 万</em></p>
                  <a className="" onClick={this.showModal1}>点击申请</a>
                </li>
                <li className="loanType__3">
                  <h4>信用贷</h4>
                  <p>适用于公务员、事业单位、银行、<br />最高可借<br /><em>100 万</em></p>
                  <a className="" onClick={this.showModal1}>点击申请</a>
                </li>
              </ul>
            </Floor>
            <Modal title="借款申请"
              visible={this.state.visible}
              onOk={this.handleOk}
              confirmLoading={this.state.confirmLoading}
              onCancel={this.handleCancel1}
              footer={this.state.footer}
            >
             
              <div className='layui-layer'>
                <div id="app">
                    <main className="main loanApp">
                        <div className="pop_pub"></div>
                        <div className="pop_main pop_loanApp">
                            <form  id="frm" method="post">
                                <div className="fl">
                                    <dl className="form_bar">
                                        <dt><label>借款金额</label></dt>
                                        <dd>
                                            <input name="loanAmt" id="loanAmt" type="text" className="textInput moneyInput" maxLength="20"/>
                                            <span className="unit">元</span>
                                        </dd>
                                    </dl>
                                    <dl className="form_bar">
                                        <dt><label>借款期限</label></dt>
                                        <dd>
                                            <select name="loanExpiry" id="loanExpiry" className="textInput">
                                                <option value="3" defaultValue="">3个月</option>
                                                <option value="6">6个月</option>
                                                <option value="12">12个月</option>
                                            </select>
                                        </dd>
                                    </dl>
                                    <dl className="form_bar">
                                        <dt><label>还款方式</label></dt>
                                        <dd>
                                            <select name="refundWay" id="refundWay" className="textInput">
                                                <option value="2" defaultValue="">按月付息，到期还本</option>
                                                <option value="3">一次性还本还息</option>
                                                <option value="1">等本等息</option>
                                                <option value="1">等额本金</option>
                                            </select>
                                        </dd>
                                    </dl>
                                    <div className="form_bar">
                                        <dt><label>借款用途</label></dt>
                                        <dd>
                                            <select name="loanPurpose" id="loanPurpose" className="textInput">
                                                <option value="" defaultValue="">请选择</option>
                                                <option value="1">经营</option>
                                                <option value="2">消费</option>
                                                <option value="3">资金周转</option>
                                                <option value="3">其他</option>
                                            </select>
                                        </dd>
                                    </div>
                                    <dl className="form_bar">
                                        <dt><label>验证码</label></dt>
                                        <dd>
                                            <input name="validateCode" id="imgcode" type="text" className="textInput w140" placeholder="请输入验证码" maxLength="6"/>
                                            <img src="/images/account/pt1.png" data-url="/user/captcha" id="img-code" title="看不清？点击图片更换验证码" className="vCode" />
                                        </dd>
                                    </dl>
                                    <div className="ps">
                                        <span className="tips"></span>
                                    </div>
                                    <div className="form_bar">
                                        <button className="btn">点击确认</button>
                                    </div>
                                </div>
                                <div className="fr">
                                    <div className="member_info">
                                        <ul>
                                            <li>
                                                <strong>姓名:</strong>张三
                                            </li>
                                            <li>
                                                <strong>手机号码:</strong>15942010456
                                            </li>
                                            <li>
                                                <strong>身份证号:</strong>210503198817103622
                                            </li>
                                        </ul>
                                    </div>
                                    <dl>
                                        <dt><h3>最高额度：</h3></dt>
                                        <dd>平台用户最高借款金额为200000.00元<br/>剩余借款额度随借款笔数和金额的增加而减少。</dd>
                                    </dl>
                                    <dl>
                                        <dt><h3>申请条件：</h3></dt>
                                        <dd id="sqtj">以借款人的信用情况为基础，巴巴汇平台评估借款人资质后，对其授信一定额度发标借款。</dd>
                                    </dl>
                                </div>
                            </form>
                        </div>
            
                    </main>
                </div>
              </div>
              
              
            </Modal>
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
        </main>
        );
      }else{
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
                  <a className="" onClick={this.showModal}>点击申请</a>
                </li>
                <li className="loanType__2">
                  <h4>房贷</h4>
                  <p>适用于公务员、事业单位、银行、<br />最高可借<br /><em>50 万</em></p>
                  <a className="" onClick={this.showModal}>点击申请</a>
                </li>
                <li className="loanType__3">
                  <h4>信用贷</h4>
                  <p>适用于公务员、事业单位、银行、<br />最高可借<br /><em>100 万</em></p>
                  <a className="" onClick={this.showModal}>点击申请</a>
                </li>
              </ul>
            </Floor>
            <LoginModal/>
           
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
        </main>
        );
      }
    };
  
};
function select(state) {
  const { auth ,loginModal} = state.toJS();
  return {
    auth,
    loginModal
  };
}
export default connect(select)(Loan);