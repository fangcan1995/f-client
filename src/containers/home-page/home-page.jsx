import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Carousel } from 'antd';

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

import Floor from '../../components/home-page-floor/home-page-floor';

import { getData, getNovice, getStandard, getNotice, getBanner,getSpecs ,getAdverts,getAdvertTital} from '../../actions/home-page';

class HomePage extends Component {
  
  handleLoginBtnClick = (e) => {
    e.preventDefault();
    console.log('aaaa')
    this.props.history.push('/login');

  }
  handleBannerClick(e){
  //  console.log(e)
   window.location.href=e;
  }
  handleSpecClick = (e) => {
    e.preventDefault();
    // console.log('aaaa')
    this.props.history.push('/about/constant');

  }
  handleNoticeClick(e){
    console.log(e);
    this.props.history.push(`/about/news/notice`)
  }
  handleMoreClick(){
    console.log('22')
    this.props.history.push('/about/news/notice')
  }
  handleComeInClick(){
    this.props.history.push('/invest-list//newNoviceLoan')
  }
  handleStandardClick(e){
    console.log(e)
    this.props.history.push(`/invest-list/${e}`)
  }
  handleAdClick(e){
    console.log(e)
    window.location.href=e
  }
  handleCommediaClick(e){
    console.log(e)
    this.props.history.push(`/about/news/mediaCompany`)
  }
  handleNewsClick(e){
    console.log(e)
    this.props.history.push(`/about/news/mediaReport`)
  }
  handleMimageClick(e){
    console.log(e)
  }
  handleMoreMediaClick(){
    console.log('1111')
    this.props.history.push('/about/news/mediaReport')
  }
  handleMedIcoClick(e){
    console.log(e)
    // this.props.history.push('/about/news/mediaReport')
    window.location.href=e
  }
  handlePartnerClick(e){
    window.location.href=e
  }
  handlePreClick=()=>{
    next()
  }
  componentDidMount() {
    const { dispatch ,homePage} = this.props;
    dispatch(getData());
    dispatch(getNovice());
    dispatch(getStandard());
    dispatch(getBanner());
    dispatch(getNotice());
    dispatch(getSpecs());
    dispatch(getAdverts());
    dispatch(getAdvertTital());
    
  }
  render() {
    const { homePage,auth } = this.props;
    
   console.log(homePage )
    return (
    <main className="main home-page" id="home-page">
      <div className="banner" >
        <div className="carousel" >
          <div className="prevArrow" onClick={this.handlePreClick}> 《</div>
            <Carousel autoplay touchMove='true' key={homePage.banner.length} prevArrow nextArrow next>
              {homePage.banner.map((item)=>{
                  return (
                    <div key={item.id}>
                      <img className="carousel" src={item.imgsrc}  onClick={this.handleBannerClick.bind(this,item.imgurl)} />
                    </div>
                  )
                })}
            </Carousel>
          {/* <div className="carousel__img" style={{ backgroundImage: `url(${require('../../assets/images/homePage/banner.png')})` }}></div> */}
        </div>
       
        <div className="wrapper">
          <div className="login">
            <p className="yield">
             新手专享年化收益率
              <br />
              <em><span>{homePage.sprog.annualRate}</span>%</em>
            </p>
              {
                auth.isAuthenticated?<button type="button" className="login__btn" onClick={ this.handleComeInClick.bind(this) }>立即加入</button>
                :<div>
                <button type="button" className="login__btn" onClick={ this.handleLoginBtnClick }>立即登录</button>
                <p className="signup">
                  没有账号？
                  <Link to={'/signup'}>立即注册</Link>
                </p>
              </div>
              }
              
          </div>
        </div>
      </div>

      <div className="spec">
        <div className="wrapper">
          <ul className="spec__box">
            <li className="spec__item"><em><span>{homePage.spec.memberCount}</span>次</em><br />累计服务用户人次</li>
            <li className="spec__item"><em><span>{homePage.spec.detailAmountSum}</span>万</em><br />累计撮合交易额（元）</li>
            <li className="spec__item"><em><span>{homePage.spec.earnAmountSum}</span>万</em><br />已为客户赚取（元）</li>
            <li className="spec__item spec__more"><a onClick={this.handleSpecClick}>查看详情&nbsp;></a></li>
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
          <div className="notice__text">
            <Carousel vertical="true" autoplay key={homePage.notice.length} dots='false'>
              {homePage.notice.map((item)=>{
                        return (                         
                            <div key={item.noticeId} className="notice__text" onClick={this.handleNoticeClick.bind(this,item.noticeId)}>
                              <a >{item.noticeTitle}</a><span><time className="notice__date">[ {item.putTime} ]</time></span>
                            </div>                        
                        )
                      })}
            </Carousel>
            
          </div> 
          {/* <p className="notice__text">关于巴巴汇金服反洗钱知识普及公告<time className="notice__date">[ 2017-1-6 ]</time></p> */}
          <a onClick={this.handleMoreClick.bind(this)} className="notice__more">更多 ></a>
        </div>
        <Floor
          otherClassName="sprog"
          tit="新手专区"
          tip="新手专享&nbsp;&nbsp;限量发布"
          >
          <div className="sproy__outer">
            <div className="sprog__inner">
              <div className="sprog__tile">
                <div className="dynamicImg__outer">
                  <img src={require('../../assets/images/homePage/sprog_tile.jpg')} alt="" className="dynamicImg__inner" />
                </div>
              </div>
              <div className="sprog__content">
                <div className="sprog__item sprog__desc">
                  <h4>{homePage.sprog.name}<i style={{ backgroundImage: `url(${sprogIcon})` }}></i></h4>
                  <p>
                    <em><span>{homePage.sprog.annualRate}</span>.0%</em>
                    <br />
                    预期年化收益率
                  </p>
                </div>
                <div className="sprog__item sprog__info">
                  <p>已购人数：{homePage.sprog.investNumber}人</p>
                  <p>
                    <em><span>{homePage.sprog.loanExpiry}</span>个月</em>
                    <br />
                    锁定期
                  </p>
                </div>
                <div className="sprog__item sprog__join">
                  <button className="join__btn" onClick={this.handleComeInClick.bind(this)}>立即加入</button>
                  {/* <p>剩余名额：{homePage.sprog.remain}人</p> */}
                </div>
              </div>
            </div>
          </div>
        </Floor>
        {
          homePage.standard.length?<Floor
          otherClassName="standard"
          tit="散标/债权"
          tip="风险自行承担&nbsp;&nbsp;投资需谨慎"
          >
          <ul className="standard__content">
          {
            homePage.standard.map((item)=>{
              if(item.type=='project'){
              return (      
                <li className="standard__card" key={item.id}>
                  <a onClick={this.handleStandardClick.bind(this,item.standardId)}> 
                    <div className="card__scroll">
                      <div className="card__header">
                        <h4 className="tit">{item.name}</h4>
                        <p className="tip">起投金额&nbsp;<em>{item.minInvestAmount }</em>元</p>
                        <ul className="tags">
                          <li>{item.refundWayString }</li>
                        </ul>
                        <p className="desc"><em><span>{item.loanExpiry }</span>个月</em><br />锁定期</p>
                      </div>
                      <div className="card__body">
                        <p className="yield"><em><span>{Math.floor(item.annualRate/1)}</span>.{(item.annualRate + '').split('.')[1]||0}%</em><br />预期年化收益率</p>
                        <ul className="tags">
                          <li>最新推出</li>
                        </ul>
                        <div className="progress">
                          <div className="progress__bar">
                            <div className="progress__bar--cur" style={{width: `${item.investmentProgress}%`}}></div>
                          </div>
                          <p className="progress__percent">{item.hadPercent}</p>
                          <p className="progress__number">{item.moneyEnd }万/{item.money  }万</p>
                        </div>
                      </div>
                    </div>
                    <div className="card__footer">
                      <a onClick={this.handleStandardClick.bind(this,item.standardId)} className="join">立即加入</a>
                    </div>
                    </a>
                </li>
               
              )}else if(item.type=="transfer"){
                return (
                    <li className="standard__card" key={item.investId}>
                      <a onClick={this.handleStandardClick.bind(this,item.standardId)}> 
                        <div className="card__scroll">
                          <div className="card__header">
                            <h4 className="tit">{item.name}</h4>
                            <p className="tip">起投金额&nbsp;<em>{item.minInvestAmount }</em>元</p>
                            <ul className="tags">
                              <li>{item.refundWayString }</li>
                            </ul>
                            <p className="desc"><em><span>{item.loanExpiry }</span>个月</em><br />锁定期</p>
                          </div>
                          <div className="card__body">
                            <p className="yield"><em><span>{Math.floor(item.annualRate/1)}</span>.{(item.annualRate + '').split('.')[1]||0}%</em><br />预期年化收益率</p>
                            <ul className="tags">
                              <li>最新推出</li>
                            </ul>
                            <div className="progress">
                              <div className="progress__bar">
                                <div className="progress__bar--cur" style={{width: `${item.investmentProgress }%`}}></div>
                              </div>
                              <p className="progress__percent">{item.hadPercent}</p>
                              <p className="progress__number">{item.moneyEnd }万/{item.money }万</p>
                            </div>
                          </div>
                        </div>
                        <div className="card__footer">
                          <a onClick={this.handleStandardClick.bind(this,item.standardId)} className="join">立即加入</a>
                        </div>
                      </a>
                    </li>
                )
              }
            })
          }
            
            
            
          </ul>
        </Floor>:null
        }
        
        {/* <div className="ad">//广告待定
          <Carousel autoplay nextArrow prevArrow>
              {
                homePage.ad.map((item)=>{
                  return (
                    <div className="dynamicImg__outer" key={item.id} onClick={this.handleAdClick.bind(this,item.id)}>
                      <img src={item.imgsrc} alt="" className="dynamicImg__inner" />
                    </div>
                  )
                })
              }
          </Carousel>    
          <div className="dynamicImg__outer">
            <img src={require('../../assets/images/homePage/ad.jpg')} alt="" className="dynamicImg__inner" />
          </div>
        </div> */}
        <div className="floor__group">
          <Floor
            otherClassName="news"
            tit='公司动态'
            >
            <div className="news__content">
              {/* <Carousel autoplay nextArrow prevArrow dots='false'>
                {homePage.com.companyList.map((item)=>{
                  return (
                    <div key={item.affInfoId} onClick={this.handleCommediaClick.bind(this,item.affInfoId)}>
                      <div className="dynamicImg__outer">
                        <a><img src={item.affInfoIcon} alt="" className="news__img dynamicImg__inner" /></a>
                      </div>                     
                      <p className="news__text">{item.affInfoName}</p>
                    </div>
                  )
                })}
                
              </Carousel>   */}
              <div className="dynamicImg__outer">
                <img src={homePage.com.imgsrc} alt="" className="news__img dynamicImg__inner" />
              </div>
              
              <p className="news__text">{homePage.com.title}</p>
            </div>
          </Floor>
          <Floor
            otherClassName="media"
            tit='媒体报道'
            >
            <div className="media__content">
              <div className="media__group">
                <ul className="media__reports">
                  {
                    homePage.med.mediaReportInfosDtoList.map((item)=>{
                      return (
                        <a><li key={item.affInfoId} onClick={this.handleNewsClick.bind(this,item.affInfoId)}>{item.affInfoName}</li></a>
                      )
                    })
                  }
                  {/* <li><i>[网贷之家]</i>近年来，移动互联网、大数据、金融巨头共同关注的重点领域，其中几个热点问题备受关注</li> */}
                  
                </ul>
                <ul className="media__brands">
                  {/* {
                      homePage.media.mimage.map((item)=>{
                        return (
                          <li key={item.mimgID} onClick={this.handleMimageClick.bind(this,item.mimgID)}><img src={item.mimgsrc} alt="" /></li>
                        )
                      })
                    } */}
                  <li><a><img src={homePage.medicon.imgsrc} alt={homePage.medicon.title} key={homePage.medicon.id} onClick={this.handleMedIcoClick.bind(this,homePage.medicon.imgurl)}/></a></li>
                </ul>
              </div>
              <a className="media__more" onClick={this.handleMoreMediaClick.bind(this)}>查看更多 ></a>
            </div>
          </Floor>
        </div>
        <Floor
          otherClassName="partner"
          tit={homePage.par.affInfoName}
          >
          <ul className="partner__box">
            {
              homePage.par.partnerCompanyInfosDtoList.map((item)=>{
                return (
                  <li key={item.affInfoId}><a onClick={this.handlePartnerClick.bind(this,item.affInfoUrl)}><img src={item.affInfoIcon} alt="" /></a></li>
                )
              })
            }
            {/* <li><a href=""><img src={partnerBrand1} alt="" /></a></li> */}
            
          </ul>
        </Floor>
      </div>
    </main>
    );
  }
}

function select(state) {
  const { homePage, auth } = state.toJS();
  return {
    homePage,
    auth
  };
}
export default connect(select)(HomePage);