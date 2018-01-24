import React from 'react';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';

export default ({ location, match, history }) => {
    return(

        <div>
            <Crumbs/>
            <div className="about__box">
                <Tab>
                    <div name="合作伙伴">
                        <ul className="speciallist">
                            <li>
                                <dl>
                                    <dt>
                                        <h3><strong>富友集团</strong></h3>
                                    </dt>
                                    <dd className="photo">
                                        <img src={require('../../../assets/images/about/logo_fy.jpg')} />
                                    </dd>
                                    <dd className="intro">
                                        <p>
                                            上海富友金融服务集团股份有限公司是一家具有高新技术企业资质的大型金融综合服务集团公司，下设8家全资子公司，36家分公司。富友集团拥有POS收单、互联网支付、预付卡发行受理、基金支付、跨境支付、商业保理等金融经营牌照和资质，以打造“金...
                                            <a href="#" target="_blank">阅读更多>></a>
                                        </p>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <h3><strong>鹏元征信</strong></h3>
                                    </dt>
                                    <dd className="photo">
                                        <img src={require('../../../assets/images/about/logo_pyzx.jpg')} />
                                    </dd>
                                    <dd className="intro">
                                        <p>
                                            鹏元征信有限公司（以下简称为“鹏元征信”）成立于2005年4月8日，以打造互联网征信生态圈为愿景，致力于为客户呈现专业化、个性化的征信服务。 鹏元征信提供个人征信、企业征信、企业评分、个人评分、征信系统设计开发、软件设计开发和中小企业信...
                                            <a href="#" target="_blank">阅读更多>></a>
                                        </p>
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                </Tab>
            </div>
        </div>
    )
}