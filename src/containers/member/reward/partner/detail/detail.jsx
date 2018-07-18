import React from 'react';
import Crumbs from '../../../../../components/crumbs/crumbs';
import Tab from '../../../../../components/tab/tab';
import './detail.less';

export default class PartnerDetail extends React.Component{
    render(){
        return (
			<div className="member__main">
                <Crumbs/>
				<div className="member__cbox">
					<div className="achievement">
						<dl>
							<dt>我的奖励</dt>
							<dd><em>1200.00</em> <i>元</i></dd></dl>
						<dl>
							<dt>业绩排名</dt>
							<dd><em>1</em></dd>
						</dl>
						<dl className="nobor">
							<dt>击败伙伴</dt>
							<dd><em>34</em> %</dd>
						</dl>
					</div>
				</div>
				<div className="member__cbox">
					<Tab>
						<div name="邀请记录">
                            <div className="table__wrapper">
                                <table  className="tableList">
                                    <thead>
                                    <tr>
                                        <th>邀请用户</th>
                                        <th>业绩金额（元）</th>
                                        <th>奖励来源</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr >
                                        <td>
                                            1
                                        </td>
                                        <td>
                                            2
                                        </td>
                                        <td>
                                            3
                                        </td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
						</div>
						<div name="业绩明细">
                            <div className="table__wrapper">
                                <table  className="tableList">
                                    <thead>
                                    <tr>
                                        <th>获得时间</th>
                                        <th>注册时间</th>
                                        <th>首次出借时间</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr >
                                        <td>
                                            1
                                        </td>
                                        <td>
                                            2
                                        </td>
                                        <td>
                                            3
                                        </td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>

						</div>
						<div name="排行榜">
                            <ul>
                                <li>
                                    <div className="rankinglist">
                                        <div className="yqrs">
                                            <div className="title">
                                                <h3>邀请人数</h3>
                                                <span>2017.05</span>
                                            </div>
                                            <ul>
                                                <li>
                                                    <i className="placing first"></i>
                                                    <figure>
                                                        <img src={require('../../../../../assets/images/account/picture.png')} />
                                                    </figure>
                                                    <p className="name">张文文</p>
                                                    <p className="unit">
                                                        大连市 沙区分公司<br/>
                                                        邀请人数:<strong>12人</strong>
                                                    </p>
                                                </li>
                                                <li>
                                                    <i className="placing second"></i>
                                                    <figure>
                                                        <img src={require('../../../../../assets/images/account/picture.png')} />
                                                    </figure>
                                                    <p className="name">张文文</p>
                                                    <p className="unit">
                                                        大连市 沙区分公司<br/>
                                                        邀请人数:<strong>12人</strong>
                                                    </p>
                                                </li>
                                                <li>
                                                    <i className="placing third"></i>
                                                    <figure>
                                                        <img src={require('../../../../../assets/images/account/picture.png')} />
                                                    </figure>
                                                    <p className="name">张文文</p>
                                                    <p className="unit">
                                                        大连市 沙区分公司<br/>
                                                        邀请人数:<strong>12人</strong>
                                                    </p>
                                                </li>
                                                <li>
                                                    <i className="placing"></i>
                                                    <figure>
                                                        <img src={require('../../../../../assets/images/account/picture.png')} />
                                                    </figure>
                                                    <p className="name">张文文</p>
                                                    <p className="unit">
                                                        大连市 沙区分公司<br/>
                                                        邀请人数:<strong>12人</strong>
                                                    </p>
                                                </li>
                                                <li>
                                                    <i className="placing"></i>
                                                    <figure>
                                                        <img src={require('../../../../../assets/images/account/picture.png')} />
                                                    </figure>
                                                    <p className="name">张文文</p>
                                                    <p className="unit">
                                                        大连市 沙区分公司<br/>
                                                        邀请人数:<strong>12人</strong>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="gryj">
                                            <div className="title">
                                                <h3>个人业绩</h3>
                                                <span>2017.05</span>
                                            </div>
                                            <ul>
                                                <li>
                                                    <i className="placing first"></i>
                                                    <figure>
                                                        <img src={require('../../../../../assets/images/account/picture.png')} />
                                                    </figure>
                                                    <p className="name">张文文</p>
                                                    <p className="unit">
                                                        大连市 沙区分公司<br/>
                                                        个人业绩:<strong>3000.00元</strong>
                                                    </p>
                                                </li>
                                                <li>
                                                    <i className="placing second"></i>
                                                    <figure>
                                                        <img src={require('../../../../../assets/images/account/picture.png')} />
                                                    </figure>
                                                    <p className="name">张文文</p>
                                                    <p className="unit">
                                                        大连市 沙区分公司<br/>
                                                        个人业绩:<strong>3000.00元</strong>
                                                    </p>
                                                </li>
                                                <li>
                                                    <i className="placing third"></i>
                                                    <figure>
                                                        <img src={require('../../../../../assets/images/account/picture.png')} />
                                                    </figure>
                                                    <p className="name">张文文</p>
                                                    <p className="unit">
                                                        大连市 沙区分公司<br/>
                                                        个人业绩:<strong>3000.00元</strong>
                                                    </p>
                                                </li>
                                                <li>
                                                    <i className="placing"></i>
                                                    <figure>
                                                        <img src={require('../../../../../assets/images/account/picture.png')} />
                                                    </figure>
                                                    <p className="name">张文文</p>
                                                    <p className="unit">
                                                        大连市 沙区分公司<br/>
                                                        个人业绩:<strong>3000.00元</strong>
                                                    </p>
                                                </li>
                                                <li>
                                                    <i className="placing"></i>
                                                    <figure>
                                                        <img src={require('../../../../../assets/images/account/picture.png')} />
                                                    </figure>
                                                    <p className="name">张文文</p>
                                                    <p className="unit">
                                                        大连市 沙区分公司<br/>
                                                        个人业绩:<strong>3000.00元</strong>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                        <div className="tdyj">
                                            <div className="title">
                                                <h3>团队业绩</h3>
                                                <span>2017.05</span>
                                            </div>
                                            <ul>
                                                <li>
                                                    <figure>
                                                        <img src={require('../../../../../assets/images/account/picture.png')} />
                                                    </figure>
                                                    <p className="name">张文文</p>
                                                    <p className="unit">
                                                        大连市 沙区分公司<br/>
                                                        团队业绩:<strong>3000.00元</strong>
                                                    </p>
                                                </li>
                                                <li>
                                                    <figure>
                                                        <img src={require('../../../../../assets/images/account/picture.png')} />
                                                    </figure>
                                                    <p className="name">张文文</p>
                                                    <p className="unit">
                                                        大连市 沙区分公司<br/>
                                                        团队业绩:<strong>3000.00元</strong>
                                                    </p>
                                                </li>
                                                <li>
                                                    <figure>
                                                        <img src={require('../../../../../assets/images/account/picture.png')} />
                                                    </figure>
                                                    <p className="name">张文文</p>
                                                    <p className="unit">
                                                        大连市 沙区分公司<br/>
                                                        团队业绩:<strong>3000.00元</strong>
                                                    </p>
                                                </li>
                                                <li>
                                                    <figure>
                                                        <img src={require('../../../../../assets/images/account/picture.png')} />
                                                    </figure>
                                                    <p className="name">张文文</p>
                                                    <p className="unit">
                                                        大连市 沙区分公司<br/>
                                                        团队业绩:<strong>3000.00元</strong>
                                                    </p>
                                                </li>
                                                <li>
                                                    <figure>
                                                        <img src={require('../../../../../assets/images/account/picture.png')} />
                                                    </figure>
                                                    <p className="name">张文文</p>
                                                    <p className="unit">
                                                        大连市 沙区分公司<br/>
                                                        团队业绩:<strong>3000.00元</strong>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                </li>
                            </ul>
						</div>
					</Tab>

				</div>

			</div>
		);
    };
}
