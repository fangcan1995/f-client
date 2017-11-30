import React from 'react';
import PropTypes from 'prop-types';
import './partner-list.less';
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
  	    
  	    <div className="tableListBlock">
  	        <div className="blockTitle">
  	            <h3 className="blockTitle__name">活动规则</h3>
  	        </div>
  	        <div className="blockContent">
  	            <div className="inviteInfo">
  	                <div><i className="iconfont icon-add_user"></i>已邀请合伙人：<span>5</span>&nbsp;人</div>
  	                <div><i className="iconfont icon-jiangli"></i>已获得奖励：<span>12.00</span>&nbsp;元</div>
  	            </div>
  	            <table className="tableList" cellspacing="0" cellpadding="0">
  	                <thead>
  	                    <tr>
  	                        <th>邀请用户</th>
  	                        <th>注册时间</th>
  	                        <th>首次投资时间</th>
  	                    </tr>
  	                </thead>
  	                <tbody>
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
  	                </tbody>
  	            </table>
  	        </div>
  	        <a href="" className="tableListBlock__goBack">返回</a>


  	        <div className="pagination">
  	            <div className="paginationController">
  	                <a href="" className="pagination__a pagination__a--active">1</a>
  	                <a href="" className="pagination__a">2</a>
  	                <a href="" className="pagination__a">3</a>
  	                <a>...</a>
  	                <a href="" className="pagination__a">249</a>
  	                <a href="" className="pagination__a">&gt;</a>
  	                <span>到第</span>&nbsp;
  	                <input type="text" className="pagination__page" />&nbsp;
  	                <span>页</span>&nbsp;
  	                <button className="pagination__button">确定</button>
  	            </div>
  	        </div>
  	    </div>
  	    
  	</div>
    );
};
