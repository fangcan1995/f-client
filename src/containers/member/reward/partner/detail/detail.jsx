import React from 'react';
import PropTypes from 'prop-types';
import './detail.less';
import Crumbs from '../../../../../components/crumbs/crumbs';
import Tab from '../../../../../components/tab/tab';
import Table from '../../../../../components/table/table';
import  {getData}  from '../../../../../assets/js/getData'
var Yqjl={
    columnOpts:[
        { key: 'col1', name: '邀请用户',type:'' },
        { key: 'col2', name: '注册时间',type:'date' },
        { key: 'col3', name: '首次投资时间',type:'date' },
    ],
    hasFilter:true, // 是否显示搜索过滤，为什么不直接用下面的，这里也是设计上的一个优化点
    /*onSearch: function(keyword) {
        doSearch(keyword)
    }, // 搜索时的回调*/
    showPager: true, // 是否显示分页
}
var Yjmx={
    columnOpts:[
        { key: 'col1', name: '获得时间',type:'date' },
        { key: 'col2', name: '业绩金额（元）',type:'money' },
        { key: 'col3', name: '奖励来源',type:'' },
    ],
    hasFilter:true, // 是否显示搜索过滤，为什么不直接用下面的，这里也是设计上的一个优化点
    /*onSearch: function(keyword) {
        doSearch(keyword)
    }, // 搜索时的回调*/
    showPager: true, // 是否显示分页
}
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
                                <Table
                                    source='http://localhost:9002'
                                    config={Yqjl}
                                />
                            </div>
						</div>
						<div name="业绩明细">
                            <div className="table__wrapper">
                                <Table
                                    source='http://localhost:9002'
                                    config={Yjmx}
                                />
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
