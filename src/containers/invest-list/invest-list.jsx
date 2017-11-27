import React from 'react';
import PropTypes from 'prop-types';
import './invest-list.less';

export default ({ location, match, history }) => {
  return (
    <main className="main invest-list" id="invest-list">
      <div className="wrapper">
        <div className="tablist">
          <div className="tabs__nav">
            <div className="tab">散标</div>
            <div className="tab">债权</div>
            <div className="tab tab--active">智能理财</div>
          </div>
          <div className="tabs__content">
            <div className="tab__panel">
              <div className="filter">
                <div className="filter__outer">
                  <div className="filter__inner">
                    <div className="filter__row">
                      <div className="filter__cell">
                        <h5 className="filter__tit">标的类型</h5>
                      </div>
                      <div className="filter__cell">
                        <p className="filter__opt">全部</p>
                      </div>
                      <div className="filter__cell">
                        <p className="filter__opt">新手</p>
                      </div>
                      <div className="filter__cell">
                        <p className="filter__opt">普通</p>
                      </div>
                    </div>

                    <div className="filter__row">
                      <div className="filter__cell">
                        <h5 className="filter__tit">投资期限</h5>
                      </div>
                      <div className="filter__cell">
                        <p className="filter__opt">全部</p>
                      </div>
                      <div className="filter__cell">
                        <p className="filter__opt">3个月</p>
                      </div>
                      <div className="filter__cell">
                        <p className="filter__opt">6个月</p>
                      </div>
                      <div className="filter__cell">
                        <p className="filter__opt">12个月</p>
                      </div>
                    </div>

                    <div className="filter__row">
                      <div className="filter__cell">
                        <h5 className="filter__tit">预期年化收益率</h5>
                      </div>
                      <div className="filter__cell">
                        <p className="filter__opt">全部</p>
                      </div>
                      <div className="filter__cell">
                          <p className="filter__opt">6%~8%</p>
                      </div>
                      <div className="filter__cell">
                          <p className="filter__opt filter__opt--active">8%~10%</p>
                      </div>
                      <div className="filter__cell"><p className="filter__opt">10%~12%</p></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table__wrapper">
                <table className="tableList">
                  <thead>
                    <tr>
                      <th>还款期号</th>
                      <th>借款标题</th>
                      <th>借款人</th>
                      <th>应还金额</th>
                      <th>实还金额</th>
                      <th>应还日期</th>
                      <th>实还日期</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>汇车贷-HCD201...</td>
                      <td>zhangshaochen</td>
                      <td>2,000.00</td>
                      <td>2,000.00</td>
                      <td>2017-05-10</td>
                      <td>2017-05-10</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>汇车贷-HCD201...</td>
                      <td>zhangshaochen</td>
                      <td>2,000.00</td>
                      <td>2,000.00</td>
                      <td>2017-05-10</td>
                      <td>2017-05-10</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>汇车贷-HCD201...</td>
                      <td>zhangshaochen</td>
                      <td>2,000.00</td>
                      <td>2,000.00</td>
                      <td>2017-05-10</td>
                      <td>2017-05-10</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>汇车贷-HCD201...</td>
                      <td>zhangshaochen</td>
                      <td>2,000.00</td>
                      <td>2,000.00</td>
                      <td>2017-05-10</td>
                      <td>2017-05-10</td>
                    </tr>
                  </tbody>
                </table>

                <div className="pagination">
                  <div className="paginationController">
                      <a href="" className="active">1</a>
                      <a href="">2</a>
                      <a href="">3</a>
                      <a>...</a>
                      <a href="">249</a>
                      <a href="">&gt;</a>
                      <span>到第</span>&nbsp;
                      <input type="text" />&nbsp;
                      <span>页</span>&nbsp;
                      <button>确定</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    );
};
