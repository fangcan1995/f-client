import React,{ Component, PropTypes } from 'react';
import './footer.less';
import fuwuhao from '../../assets/images/public/fuwuhao.png';
import gongzhonghao from '../../assets/images/public/gongzhonghao.png';
import wangjing from '../../assets/images/public/wangjing.png';
import cxlogo from '../../assets/images/public/cxlogo.png';
import hulianwang from '../../assets/images/public/hulianwang.jpg';
import hy_83x30 from '../../assets/images/public/hy_83x30.png';
import pingji2 from '../../assets/images/public/pingji2.png';
import cnnic from '../../assets/images/public/cnnic.png';
import getgeotrustsslseal from '../../assets/images/public/getgeotrustsslseal.gif';
import { Link } from 'react-router-dom';

class Footer extends Component  { 
    close =document.getElementsByClassName('.closeForm')[0]
    
    visible=false
    state = {
        visible: false,
    }
    showIframe = ()=>{
        if(!this.visible){
            this.setState({
                visible:true
            })
            this.visible=true
        }else{
            this.setState({
                visible:false
            })
            this.visible=false
        }
        
    }
    render (){
        return (
            <footer>
                <div className="footerLink">
                    <div className="linkArea">
                    <dl>
                        <dt>关于我们</dt>
                        <dd><Link to='/about/67/68'>公司介绍</Link></dd>
                        <dd><Link to='/about/67/70'>管理团队</Link></dd>
                        <dd><Link to='/about/67/72'>合作伙伴</Link></dd>
                        <dd><Link to='/about/67/68'>联系我们</Link></dd>
                    </dl>
                    <dl>
                        <dt>安全保障</dt>
                        <dd><Link to='/about/88/89'>法律法规</Link></dd>
                        <dd><Link to='/about/84/85'>资金安全</Link></dd>
                        <dd><Link to='/about/84/87'>技术保障</Link></dd>
                        <dd><Link to='/about/84/86'>风控措施</Link></dd>
                    </dl>
                    </div>
                    <div className="QRCodeArea">
                    <div className="QRCode">
                        <div className="QRCode__img">
                            <img src={fuwuhao} alt="" />
                        </div>
                        <div className="QRCode__text">扫描二维码关注服务号</div>
                    </div>
                    <div className="QRCode">
                        <div className="QRCode__img">
                            <img src={gongzhonghao} alt="" />
                        </div>
                        <div className="QRCode__text">扫描二维码关注公众号</div>
                    </div>
                    </div>
                    <div className="ServiceInfo">
                        <h3>客服热线：</h3>
                        <div>0411-84609558</div>
                        <p>（客服时间：周一至周五 8:30-17:30）</p>
                        {/* <div className="ServiceButton">
                            <a href="" className="ServiceButton__button"><i className="iconfont icon-kefu"></i>在线客服</a>
                        <a href="" className="ServiceButton__button"><i className="iconfont icon-yijian"></i>意见反馈</a>
                        </div> */}
                        <div className="ServiceButton">
                            <a onClick={this.showIframe} className="ServiceButton__button">在线客服</a>
                        </div>
                        <script src="https://www.sobot.com/chat/frame/js/entrance.js?sysNum=5c3913e80fbf4388aa19109113c92fa4&groupId=86b3b620fb034e62863b9c115d99c737" className="zhiCustomBtn" id="zhichiScript" data-args="manual=true"></script>
                        {
                            this.state.visible?<div><iframe className='iframe' ref='iframe'
                            src='https://www.sobot.com/chat/pc_new/index.html?sysNum=5c3913e80fbf4388aa19109113c92fa4&groupId=86b3b620fb034e62863b9c115d99c737&color=aabbcc&powered=true&cid=5043c88793fa4e9eb5dcd1c46bbc5f3d&lan=cn&invite=0&visitStartTime=1524453338701&uid=61a0c99d36cb426088ba6c62e3741c13&unreadcount=0&from=iframe'>
                            
                            </iframe>
                            <div className='close_btn' onClick={this.showIframe} ></div>
                            </div>
                            :''
                        }
                        
                    </div>
                </div>
                <div className="CopyRight">
                    <p className="CopyRight__text">辽ICP备16003552号-1增值电信业务经营许可证编号：辽B2-20160184 市场有风险，出借需谨慎，营造合法、诚信借贷环境</p>
                    <div className="CopyRight__imageBlock">
                        <a href="http://www.lnga.gov.cn/" target="_blank">
                            <img src={wangjing} alt="" />
                        </a>
                        <a href="https://credit.cecdc.com/CX20160601015587260119.html" target="_blank">
                            <img src={cxlogo} alt="" />
                        </a>
                        <a href="http://si.trustutn.org/info?sn=144160801000493637726" target="_blank">
                            <img src={hulianwang} alt="" />
                        </a>
                        <a href="https://v.pinpaibao.com.cn/authenticate/cert/?site=www.baba88.com&at=business" target="_blank">
                            <img src={hy_83x30} alt="" />
                        </a>
                        <a href="http://www.itrust.org.cn/Home/Index/itrust_certifi?wm=pj2017041701" target="_blank">
                            <img src={pingji2} alt="" />
                        </a>
                        <a href="https://ss.knet.cn/verifyseal.dll?sn=e17051021020067732yjan000000&ct=df&a=1&pa=0.0025417144365090794" target="_blank">
                            <img src={cnnic} alt="" />
                        </a>
                        <a href="https://sealsplash.geotrust.com/splash?&dn=www.baba88.com" target="_blank">
                            <img src={getgeotrustsslseal} alt="" />
                        </a>
                    </div>
                </div>
            </footer>
        );
    }
};
export default Footer