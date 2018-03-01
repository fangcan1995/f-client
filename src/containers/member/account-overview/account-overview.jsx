import React from 'react';
import PropTypes from 'prop-types';

import Crumbs from '../../../components/crumbs/crumbs';

import './account-overview.less';

export default ({ location, match, history }) => {
  return (
    <div className="member__main">
        <Crumbs />
        <a className="adver" href=""></a>

        <div className="accountDetails">
            <div className="accountInfo">
                <div className="infoLine">
                    <div>账户余额: <span>0.00</span>&nbsp;元<em>?</em></div>
                    <div>账户余额: <span>0.00</span>&nbsp;元<em>?</em></div>
                </div>
                <div className="infoLine">
                    <div>账户余额: <span>0.00</span>&nbsp;元<em>?</em></div>
                    <div>账户余额: <span>0.00</span>&nbsp;元<em>?</em></div>
                </div>
            </div>
            <div className="accountRedbag">
                <i className="iconfont icon-hongbao"></i>
                <div className="numInfo">
                    <div className="topM">可用红包</div>
                    <div><span>1</span>个</div>
                </div>
                <div className="accountControl">
                    <a className="topF" href="">立即使用</a>
                    <a href="">查看明细</a>
                </div>
            </div>
            <div className="accountInterests">
                <i className="iconfont icon-icongao"></i>
                <div className="numInfo">
                    <div className="topM">加息券</div>
                    <div><span>0</span>个</div>
                </div>
                <div className="accountControl">
                    <a className="topF" href="">立即使用</a>
                    <a href="">查看明细</a>
                </div>
            </div>
        </div>

        <div className="accountTotal">
            <div className="blockTitle">
              <h3 className="blockTitle__name">账户总资产</h3>
            </div>
            <div className="blockContent">
                <div className="contentLeft">
                    <div className="totalInfo">
                        <div className="totalInfo__details">
                            <span className="details__color details__color--blue"></span>
                            <span className="detials__name">散标资产</span>：
                            <span className="details__number">2854.00<em>元</em></span>
                        </div>
                        <div className="totalInfo__details">
                            <span className="details__color details__color--green"></span>
                            <span className="detials__name">可用余额</span>：
                            <span className="details__number">12653.00<em>元</em></span>
                        </div>
                        <div className="totalInfo__details">
                            <span className="details__color details__color--gray"></span>
                            <span className="detials__name">冻结金额</span>：
                            <span className="details__number">1256.00<em>元</em></span>
                        </div>
                        <button className="totalInfo__button">赚取收益</button>
                    </div>
                </div>
                <div className="contentRight"></div>
            </div>
        </div>

        <div className="incomeState">
            <div className="blockTitle">
                <h3 className="blockTitle__name">收益情况</h3>
            </div>
            <div className="incomeContent">
                <div className="incomeButtonLine">
                    <div className="incomeButton">
                        <button className="incomeButton__button incomeButton__button--active">累计收益</button>
                        <button className="incomeButton__button">每日收益</button>
                    </div>
                </div>
                <div className="incomeForm"></div>
            </div>
        </div>
    </div>
    );
};
