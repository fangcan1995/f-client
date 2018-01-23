import React from 'react';
import PropTypes from 'prop-types';
import './detail.less';
export default ({ location, match, history }) => {
  return (
  	<div className="member__main">
  	    <div className="crumb">
  	        <div>
  	            <b>您所在的位置：</b>
  	            <a href="">首页</a>&nbsp;&gt;
  	            <a href="">奖励管理</a>&nbsp;&gt;
  	            <a href="" className="actice">超级合伙人</a>
  	        </div>
  	    </div>

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
			<div class="tab">
				<div class="hd tab_title">
					<ul>
						<li class="on"><h3>邀请记录</h3></li>
						<li><h3>业绩明细</h3></li>
						<li><h3>排行榜</h3></li>
					</ul>
				</div>
				<div class="clearfix"></div>
				<div class="bd tab_content">
					<!--邀请-->
					<ul class="cBox">
						<li>

							<div class="table__wrapper">
								<table class="tableList">
									<thead>
									<tr>
										<th scope="col" >邀请用户</th>
										<th scope="col" class="time">注册时间</th>
										<th scope="col" class="money">首次投资时间</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>uluwan</td>
										<td>2017-03-24</td>
										<td>未投资</td>
									</tr>
									<tr>
										<td>uluwanaaaaa</td>
										<td>2017-03-24</td>
										<td>2017-03-24</td>
									</tr>
									<tr>
										<td>uluwan1972-wy</td>
										<td>2017-03-24</td>
										<td>2017-03-24</td>
									</tr>
									<tr>
										<td>uluwan</td>
										<td>2017-03-24</td>
										<td>未投资</td>
									</tr>
									<tr>
										<td>uluwan</td>
										<td>2017-03-24</td>
										<td>未投资</td>
									</tr>
									<tr>
										<td>uluwan</td>
										<td>2017-03-24</td>
										<td>未投资</td>
									</tr>
									<tr>
										<td>uluwan</td>
										<td>2017-03-24</td>
										<td>未投资</td>
									</tr>
									<tr>
										<td>uluwan</td>
										<td>2017-03-24</td>
										<td>未投资</td>
									</tr>
									<tr>
										<td>uluwan</td>
										<td>2017-03-24</td>
										<td>2017-03-24</td>
									</tr>
									<tr>
										<td>uluwan</td>
										<td>2017-03-24</td>
										<td>2017-03-24</td>
									</tr>
									</tbody>
								</table>
								<!--分页-->
                                {dede:include filename="pagination.html"/}
								<!--/分页-->
							</div>

						</li>
					</ul>
					<!--/邀请-->
					<!--业绩-->
					<ul>
						<li>
							<div class="cBox">
								<!--数据-->
								<div class="table__wrapper">
									<table class="tableList">
										<thead>
										<tr>
											<th scope="col" class="time">获得时间</th>
											<th scope="col" class="money">业绩金额（元）</th>
											<th scope="col" >奖励来源</th>
										</tr>
										</thead>
										<tbody id="list">
										<tr>
											<td>017-06-30  20:45:20</td>
											<td>1000.00</td>
											<td>直接邀请人</td>
										</tr>
										<tr>
											<td>017-06-30  20:45:20</td>
											<td>200.00</td>
											<td>直接邀请人</td>
										</tr>
										<tr>
											<td>017-06-30  20:45:20</td>
											<td>20.00</td>
											<td>直接邀请人</td>
										</tr>
										<tr>
											<td>017-06-30  20:45:20</td>
											<td>100000.00</td>
											<td>间接邀请人</td>
										</tr>
										<tr>
											<td>017-06-30  20:45:20</td>
											<td>10.00</td>
											<td>间接邀请人</td>
										</tr>
										<tr>
											<td>017-06-30  20:45:20</td>
											<td>10.00</td>
											<td>间接邀请人</td>
										</tr>
										<tr>
											<td>017-06-30  20:45:20</td>
											<td>10.00</td>
											<td>间接邀请人</td>
										</tr>
										<tr>
											<td>017-06-30  20:45:20</td>
											<td>10.00</td>
											<td>间接邀请人</td>
										</tr>
										<tr>
											<td>017-06-30  20:45:20</td>
											<td>10.00</td>
											<td>直接邀请人</td>
										</tr>
										<tr>
											<td>017-06-30  20:45:20</td>
											<td>10.00</td>
											<td>直接邀请人</td>
										</tr>
										</tbody>
									</table>
									分页
								</div>
								<!--/数据-->
							</div>
						</li>
					</ul>
					<!--/业绩-->
					<!--排行榜-->
					<ul>
						<li>
							<div class="rankinglist">
								<!--邀请人数-->
								<div class="yqrs">
									<div class="title">
										<h3>邀请人数</h3>
										<span>2017.05</span>
									</div>
									<ul>
										<li>
											<i class="placing first"></i>
											<figure>
												<img src="/images/account/picture.png">
											</figure>
											<p class="name">张文文</p>
											<p class="unit">
												大连市 沙区分公司<br>
												邀请人数:<strong>12人</strong>
											</p>
										</li>
										<li>
											<i class="placing second"></i>
											<figure>
												<img src="/images/account/picture.png">
											</figure>
											<p class="name">张文文</p>
											<p class="unit">
												大连市 沙区分公司<br>
												邀请人数:<strong>12人</strong>
											</p>
										</li>
										<li>
											<i class="placing third"></i>
											<figure>
												<img src="/images/account/picture.png">
											</figure>
											<p class="name">张文文</p>
											<p class="unit">
												大连市 沙区分公司<br>
												邀请人数:<strong>12人</strong>
											</p>
										</li>
										<li>
											<i class="placing"></i>
											<figure>
												<img src="/images/account/picture.png">
											</figure>
											<p class="name">张文文</p>
											<p class="unit">
												大连市 沙区分公司<br>
												邀请人数:<strong>12人</strong>
											</p>
										</li>
										<li>
											<i class="placing"></i>
											<figure>
												<img src="/images/account/picture.png">
											</figure>
											<p class="name">张文文</p>
											<p class="unit">
												大连市 沙区分公司<br>
												邀请人数:<strong>12人</strong>
											</p>
										</li>
									</ul>
								</div>
								<!--/-->
								<!--个人业绩-->
								<div class="gryj">
									<div class="title">
										<h3>个人业绩</h3>
										<span>2017.05</span>
									</div>
									<ul>
										<li>
											<i class="placing first"></i>
											<figure>
												<img src="/images/account/picture.png">
											</figure>
											<p class="name">张文文</p>
											<p class="unit">
												大连市 沙区分公司<br>
												个人业绩:<strong>3000.00元</strong>
											</p>
										</li>
										<li>
											<i class="placing second"></i>
											<figure>
												<img src="/images/account/picture.png">
											</figure>
											<p class="name">张文文</p>
											<p class="unit">
												大连市 沙区分公司<br>
												个人业绩:<strong>3000.00元</strong>
											</p>
										</li>
										<li>
											<i class="placing third"></i>
											<figure>
												<img src="/images/account/picture.png">
											</figure>
											<p class="name">张文文</p>
											<p class="unit">
												大连市 沙区分公司<br>
												个人业绩:<strong>3000.00元</strong>
											</p>
										</li>
										<li>
											<i class="placing"></i>
											<figure>
												<img src="/images/account/picture.png">
											</figure>
											<p class="name">张文文</p>
											<p class="unit">
												大连市 沙区分公司<br>
												个人业绩:<strong>3000.00元</strong>
											</p>
										</li>
										<li>
											<i class="placing"></i>
											<figure>
												<img src="/images/account/picture.png">
											</figure>
											<p class="name">张文文</p>
											<p class="unit">
												大连市 沙区分公司<br>
												个人业绩:<strong>3000.00元</strong>
											</p>
										</li>
									</ul>
								</div>
								<!--/-->
								<!--团队业绩-->
								<div class="tdyj">
									<div class="title">
										<h3>团队业绩</h3>
										<span>2017.05</span>
									</div>
									<ul>
										<li>
											<figure>
												<img src="/images/account/picture.png">
											</figure>
											<p class="name">张文文</p>
											<p class="unit">
												大连市 沙区分公司<br>
												团队业绩:<strong>3000.00元</strong>
											</p>
										</li>
										<li>
											<figure>
												<img src="/images/account/picture.png">
											</figure>
											<p class="name">张文文</p>
											<p class="unit">
												大连市 沙区分公司<br>
												团队业绩:<strong>3000.00元</strong>
											</p>
										</li>
										<li>
											<figure>
												<img src="/images/account/picture.png">
											</figure>
											<p class="name">张文文</p>
											<p class="unit">
												大连市 沙区分公司<br>
												团队业绩:<strong>3000.00元</strong>
											</p>
										</li>
										<li>
											<figure>
												<img src="/images/account/picture.png">
											</figure>
											<p class="name">张文文</p>
											<p class="unit">
												大连市 沙区分公司<br>
												团队业绩:<strong>3000.00元</strong>
											</p>
										</li>
										<li>
											<figure>
												<img src="/images/account/picture.png">
											</figure>
											<p class="name">张文文</p>
											<p class="unit">
												大连市 沙区分公司<br>
												团队业绩:<strong>3000.00元</strong>
											</p>
										</li>
									</ul>
								</div>

							</div>
						</li>
					</ul>

				</div>
			</div>
		</div>
  	    
  	</div>
    );
};
