import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import configureStore from '../../store/configureStore';
const store = configureStore();
import './home-page.less';
import featureIcon1 from '../../assets/images/homePage/feature_icon_1.png';
import featureIcon2 from '../../assets/images/homePage/feature_icon_2.png';
import featureIcon3 from '../../assets/images/homePage/feature_icon_3.png';
import featureIcon4 from '../../assets/images/homePage/feature_icon_4.png';
import sprogIcon from '../../assets/images/homePage/sprog_icon.png';
import partnerBrand1 from '../../assets/images/homePage/partner_brand_1.png';
import partnerBrand2 from '../../assets/images/homePage/partner_brand_2.png';
import partnerBrand3 from '../../assets/images/homePage/partner_brand_3.png';
import partnerBrand4 from '../../assets/images/homePage/partner_brand_4.png';
import partnerBrand5 from '../../assets/images/homePage/partner_brand_5.png';
import partnerBrand6 from '../../assets/images/homePage/partner_brand_6.png';
import partnerBrand7 from '../../assets/images/homePage/partner_brand_7.png';
import partnerBrand8 from '../../assets/images/homePage/partner_brand_8.png';

class HomePage extends Component {
  handleLoginBtnClick = (e) => {
    e.preventDefault();
    this.props.history.push('/login')

  }
  render() {
    return (
     <main className="main home-page" id="home-page">
       <div className="banner">
         <div className="carousel">
           <div className="carousel__img" style={{ backgroundImage: `url(${require('../../assets/images/homePage/banner.png')})` }}></div>
         </div>
         
         <div className="wrapper">
           <div className="login">
             <p className="yield">
               新手专享年化收益率
               <br />
               <em><span>12</span>%</em>
             </p>
             <button type="button" className="login__btn" onClick={ this.handleLoginBtnClick }>立即登录</button>
             <p className="signup">
               没有账号？
               <Link to={'/signup'}>立即注册</Link>
             </p>
           </div>
         </div>
       </div>

       <div className="spec">
         <div className="wrapper">
           <ul className="spec__box">
             <li className="spec__item"><em><span>5470</span>次</em><br />累计服务用户人次</li>
             <li className="spec__item"><em><span>3,419.67</span>万</em><br />累计撮合交易额（元）</li>
             <li className="spec__item"><em><span>109.82</span>万</em><br />已为客户赚取（元）</li>
             <li className="spec__item spec__more"><a href="">查看详情&nbsp;></a></li>
           </ul>
         </div>
       </div>
       <div className="feature">
         <div className="wrapper">
           <ul className="feature__box">
             <li className="feature__item">
               <i style={{ backgroundImage: `url(${featureIcon1})` }}></i>
               <span>AA级信用企业</span>
             </li>
             <li className="feature__item">
               <i style={{ backgroundImage: `url(${featureIcon2})` }}></i>
               <span>大数据征信</span>
             </li>
             <li className="feature__item">
               <i style={{ backgroundImage: `url(${featureIcon3})` }}></i>
               <span>五重风控</span>
             </li>
             <li className="feature__item">
               <i style={{ backgroundImage: `url(${featureIcon4})` }}></i>
               <span>小额分散</span>
             </li>
           </ul>
         </div>
       </div>
       <div className="wrapper">
         <div className="notice">
           <i className="notice__icon iconfont icon-gonggao"></i>
           <p className="notice__text">关于巴巴汇金服反洗钱知识普及公告<time className="notice__date">[ 2017-1-6 ]</time></p>
           <a href="" className="notice__more">更多 ></a>
         </div>
         
         <div className="floor sprog">
           <div className="floor__header">
             <h3 className="floor__tit">新手专区<span className="floor__tip">新手专享&nbsp;&nbsp;限量发布</span></h3>
           </div>
           <div className="floor__body">
             <div className="sproy__outer">
               <div className="sprog__inner">
                 <div className="sprog__tile">
                   <div className="dynamicImg__outer">
                     <img src={require('../../assets/images/homePage/sprog_tile.jpg')} alt="" className="dynamicImg__inner" />
                   </div>
                   
                 </div>
                 <div className="sprog__content">
                   <div className="sprog__item sprog__desc">
                     <h4>新手专享（90）<i style={{ backgroundImage: `url(${sprogIcon})` }}></i></h4>
                     <p>
                       <em><span>8</span>.0%+4.0%</em>
                       <br />
                       预期年化收益率
                     </p>
                   </div>
                   <div className="sprog__item sprog__info">
                     <p>已购人数：1600人</p>
                     <p>
                       <em><span>3</span>个月</em>
                       <br />
                       锁定期
                     </p>
                   </div>
                   <div className="sprog__item sprog__join">
                     <button className="join__btn">立即加入</button>
                     <p>剩余名额：240人</p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
         <div className="floor standard">
           <div className="floor__header">
             <h3 className="floor__tit">散标/债权<span className="floor__tip">风险自行承担&nbsp;&nbsp;投资需谨慎</span></h3>
           </div>
           <div className="floor__body">
             <ul className="standard__content">
               <li className="standard__card">
                 <div className="card__scroll">
                   <div className="card__header">
                     <h4 className="tit">汇车贷（一期）</h4>
                     <p className="tip">起投金额&nbsp;<em>1.000</em>元</p>
                     <ul className="tags">
                       <li>按月付息，到期还本</li>
                     </ul>
                     <p className="desc"><em><span>3</span>个月</em><br />锁定期</p>
                   </div>
                   <div className="card__body">
                     <p className="yield"><em><span>12</span>.6%+0.4%</em><br />预期年化收益率</p>
                     <ul className="tags">
                       <li>最新推出</li>
                     </ul>
                     <div className="progress">
                       <div className="progress__bar">
                         <div className="progress__bar--cur" style={{width: '65%'}}></div>
                       </div>
                       <p className="progress__percent">65%</p>
                       <p className="progress__number">18.05万/30万</p>
                     </div>
                   </div>
                 </div>
                 <div className="card__footer">
                   <a href="" className="join">立即加入</a>
                 </div>
               </li>
               
               <li className="standard__card">
                 <div className="card__scroll">
                   <div className="card__header">
                     <h4 className="tit">汇车贷（一期）</h4>
                     <p className="tip">起投金额&nbsp;<em>1.000</em>元</p>
                     <ul className="tags">
                       <li>按月付息，到期还本</li>
                     </ul>
                     <p className="desc"><em><span>3</span>个月</em><br />锁定期</p>
                   </div>
                   <div className="card__body">
                     <p className="yield"><em><span>12</span>.6%+0.4%</em><br />预期年化收益率</p>
                     <ul className="tags">
                       <li>最新推出</li>
                     </ul>
                     <div className="progress">
                       <div className="progress__bar">
                         <div className="progress__bar--cur" style={{width: '65%'}}></div>
                       </div>
                       <p className="progress__percent">65%</p>
                       <p className="progress__number">18.05万/30万</p>
                     </div>
                   </div>
                 </div>
                 <div className="card__footer">
                   <a href="" className="join">立即加入</a>
                 </div>
               </li>

               <li className="standard__card">
                 <div className="card__scroll">
                   <div className="card__header">
                     <h4 className="tit">汇车贷（一期）</h4>
                     <p className="tip">起投金额&nbsp;<em>1.000</em>元</p>
                     <ul className="tags">
                       <li>按月付息，到期还本</li>
                     </ul>
                     <p className="desc"><em><span>3</span>个月</em><br />锁定期</p>
                   </div>
                   <div className="card__body">
                     <p className="yield"><em><span>12</span>.6%+0.4%</em><br />预期年化收益率</p>
                     <ul className="tags">
                       <li>最新推出</li>
                     </ul>
                     <div className="progress">
                       <div className="progress__bar">
                         <div className="progress__bar--cur" style={{width: '65%'}}></div>
                       </div>
                       <p className="progress__percent">65%</p>
                       <p className="progress__number">18.05万/30万</p>
                     </div>
                   </div>
                 </div>
                 <div className="card__footer">
                   <a href="" className="join">立即加入</a>
                 </div>
               </li>

               <li className="standard__card">
                 <div className="card__scroll">
                   <div className="card__header">
                     <h4 className="tit">汇车贷（一期）</h4>
                     <p className="tip">起投金额&nbsp;<em>1.000</em>元</p>
                     <ul className="tags">
                       <li>按月付息，到期还本</li>
                     </ul>
                     <p className="desc"><em><span>3</span>个月</em><br />锁定期</p>
                   </div>
                   <div className="card__body">
                     <p className="yield"><em><span>12</span>.6%+0.4%</em><br />预期年化收益率</p>
                     <ul className="tags">
                       <li>最新推出</li>
                     </ul>
                     <div className="progress">
                       <div className="progress__bar">
                         <div className="progress__bar--cur" style={{width: '65%'}}></div>
                       </div>
                       <p className="progress__percent">65%</p>
                       <p className="progress__number">18.05万/30万</p>
                     </div>
                   </div>
                 </div>
                 <div className="card__footer">
                   <a href="" className="join">立即加入</a>
                 </div>
               </li>

             </ul>
           </div>
         </div>

         <div className="ad">
           <div className="dynamicImg__outer">
             <img src={require('../../assets/images/homePage/ad.jpg')} alt="" className="dynamicImg__inner" />
           </div>
           
         </div>
         <div className="floor__group">
           <div className="floor news">
             <div className="floor__header">
               <h3 className="floor__tit">公司动态</h3>
             </div>
             <div className="floor__body">
               <div className="news__content">
                 <div className="dynamicImg__outer">
                   <img src={require('../../assets/images/homePage/small_tile.jpg')} alt="" className="news__img dynamicImg__inner" />
                 </div>
                 
                 <p className="news__text">巴巴汇金服资金存管上线</p>
               </div>
               
             </div>
           </div>

           <div className="floor media">
             <div className="floor__header">
               <h3 className="floor__tit">媒体报道</h3>
             </div>
             <div className="floor__body">
               <div className="media__content">
                 <div className="media__group">
                   <ul className="media__reports">
                     <li><i>[网贷之家]</i>近年来，移动互联网、大数据、金融巨头共同关注的重点领域，其中几个热点问题备受关注</li>
                     <li><i>[中国经济导报]</i>通俗来讲，金融科技即科技在金融领域的应用，旨在创新金融产品和服务模式、降低交易成本</li>
                     <li><i>[人民政协报]</i>业界不少专家认为，区块链技术与金融业相结合，将会对金融行业带来革命性影响</li>
                     <li><i>[财经网]</i>全球传统巨头对待金融新科技并不保守，很多大银行将此视为新科技的颠覆下也迎来新的发展期</li>
                   </ul>
                   <ul className="media__brands">
                     <li><img src={require('../../assets/images/homePage/media_brand_1.jpg')} alt="" /></li>
                     <li><img src={require('../../assets/images/homePage/media_brand_2.jpg')} alt="" /></li>
                     <li><img src={require('../../assets/images/homePage/media_brand_3.jpg')} alt="" /></li>
                   </ul>
                 </div>
                 
                 <a className="media__more">查看更多 ></a>
               </div>
             </div>
           </div>
         </div>
         
         <div className="floor partner">
           <div className="floor__header">
             <h3 className="floor__tit">合作伙伴</h3>
           </div>
           <div className="floor__body">
             <ul className="partner__box">
               <li>
                 <a href=""><img src={partnerBrand1} alt="" /></a>
               </li>
               <li>
                 <a href=""><img src={partnerBrand2} alt="" /></a>
               </li>
               <li>
                 <a href=""><img src={partnerBrand3} alt="" /></a>
               </li>
               <li>
                 <a href=""><img src={partnerBrand4} alt="" /></a>
               </li>
               <li>
                 <a href=""><img src={partnerBrand5} alt="" /></a>
               </li>
               <li>
                 <a href=""><img src={partnerBrand6} alt="" /></a>
               </li>
               <li>
                 <a href=""><img src={partnerBrand7} alt="" /></a>
               </li>
               <li>
                 <a href=""><img src={partnerBrand8} alt="" /></a>
               </li>
             </ul>
           </div>
         </div>

       </div>

     </main>
     );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return {
    auth
  };
}
export default connect(mapStateToProps)(HomePage);