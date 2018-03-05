import React from 'react';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';
import './team.less';

export default ({ location, match, history }) => {
    return(
        <div>
            <Crumbs/>
            <div className="about__box">
                <Tab>
                    <div name="团队管理">
                        <ul className="speciallist">
                            <li>
                                <dl>
                                    <dt>
                                        <h3><strong>轩海成</strong>总裁</h3>
                                        <p>国汇财富投资管理（大连）股份有限公司</p>
                                    </dt>
                                    <dd className="photo">
                                        <img src={require('../../../assets/images/about/phone1.jpg')} />
                                    </dd>
                                    <dd className="intro overunset">
                                        <p>
                                            国汇财富投资管理（大连）股份有限公司总裁；大连守望农业控股有限公司董事；大连纳里餐饮管理有限公司总经理；大连中海志成股权投资有限公司总经理；深圳景泉融资租赁有限公司董事；上海行动成功管理技术股份有限公司大连分公司经理中华人民共和国律师；企业商学院建设专家诊断专家；资深企业管理顾问；黑龙江大学法学学士；清华大学MBA 工商管理硕士；中国杰出CEO（高级职业经理人）。
                                        </p>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <h3><strong>由扬</strong>营销副总裁</h3>
                                        <p>国汇财富投资管理（大连）股份有限公司</p>
                                    </dt>
                                    <dd className="photo">
                                        <img src={require('../../../assets/images/about/phone2.jpg')} />
                                    </dd>
                                    <dd className="intro overunset">
                                        <p>
                                            毕业于东北财经大学金融专业，曾任职《新商报》编辑，行动成功管理技术有限公司市场总监；誉霖鼎信财富管理(大连）有限公司总经理助理天元承汽车用品有限公司。中国优秀职业经理人。多年的团队管理和市场营销经验，在业界享有高度的赞誉，获得多项荣誉称号，得到了上级和社会的一致认同。
                                        </p>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <h3><strong>林娣</strong>营销副总裁</h3>
                                        <p>国汇财富投资管理（大连）股份有限公司</p>
                                    </dt>
                                    <dd className="photo">
                                        <img src={require('../../../assets/images/about/phone3.jpg')} />
                                    </dd>
                                    <dd className="intro overunset">
                                        <p>
                                            毕业于大连理工大学，专业《工商管理与金融》。曾任大连德泰行服装商城总经理。大连恒发房地产开发股份有限公司董事长助理兼综合业务部副经理。中国平安保险公司大连分公司钻石俱乐部成员。对日贸易驻大连办事处办公室主任。中铁建大连分局筹建处办公室主任。化工企业及加工制造业行政人事部副总经理。 誉霖鼎信财富投资管理（大连）有限公司行政部经理。
                                        </p>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <h3><strong>毕敬</strong>营销副总裁</h3>
                                        <p>国汇财富投资管理（大连）股份有限公司</p>
                                    </dt>
                                    <dd className="photo">
                                        <img src={require('../../../assets/images/about/phone4.jpg')} />
                                    </dd>
                                    <dd className="intro overunset">
                                        <p>
                                            国家一级理财规划师、投资理财顾问、 资深企业管理顾问。从事15年金融行业，在企业经营、统筹安排、人员配置方面，颇有心得。坚持有共同的思维方式与准则， 共同的人生价值观，在一起奔向事业成功同时， 共同追求圆满的人生。
                                        </p>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <h3><strong>王钰太</strong>营销副总裁</h3>
                                        <p>国汇财富投资管理（大连）股份有限公司</p>
                                    </dt>
                                    <dd className="photo">
                                        <img src={require('../../../assets/images/about/phone5.jpg')} />
                                    </dd>
                                    <dd className="intro overunset">
                                        <p>
                                            后青春工业设计有限公司总顾问兼运营总监。曾任大连新青年传媒COO、新青年影业总经理。十年企业管理经验，业务涵盖互联网、金融、 传媒、影视文化、地产、汽车等产业，带过大型团队。为多家企业担任顾问的角色，定期为部分企业高管进行内部培训，为企业提供解决问题的全新思路。擅长互联网推广战略、互联网金融实操、品牌战略等课程的开发与授课。
                                        </p>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <h3><strong>马丰龙</strong>营销副总裁</h3>
                                        <p>国汇财富投资管理（大连）股份有限公司</p>
                                    </dt>
                                    <dd className="photo">
                                        <img src={require('../../../assets/images/about/phone6.jpg')} />
                                    </dd>
                                    <dd className="intro overunset">
                                        <p>
                                            资深金融分析专家。行业6年从业经验，擅长金融专业人才的引进与培养，制定营销策略，完善公司管理体系等课程的开发与授课。
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