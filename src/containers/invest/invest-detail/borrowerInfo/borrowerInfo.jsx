import React from 'react';
import PropTypes from 'prop-types';

export default () => {
    return (
        <ul className="m-intro">
            <li>
                <dl className="intro">
                    <dt><h3>基本信息</h3></dt>
                    <dd>
                        <p><strong>用户名：</strong>xu***an</p>
                        <p><strong>手机号：</strong>137*****089</p>
                        <p><strong>身份证号：</strong>2102**********2312</p>
                        <p><strong>性别：</strong> 男	</p>
                        <p><strong>年龄：</strong>40	</p>
                        <p><strong>学历： </strong>--</p>
                        <p><strong>婚姻状况： </strong>已婚</p>
                        <p><strong>借款用途： </strong>资金周转</p>
                        <p><strong>还款来源： </strong>销售回笼资金。目前经营状况良好，有能力在到期后一次性还清。</p>
                        <p className="line"><strong>资产介绍：</strong>借款人以自有名下宝马X6作为抵押，申请融资</p>
                        <p className="line"><strong>债务介绍：</strong>无隐性债务</p>
                    </dd>
                </dl>
                <dl className="intro">
                    <dt><h3>信用信息</h3></dt>
                    <dd>
                        <p><strong>申请借款:</strong>1笔</p>
                        <p><strong>成功借款:</strong>0笔</p>
                        <p><strong>失败借款:</strong>0笔</p>
                        <p><strong>逾期金额:</strong>0.00元</p>
                        <p><strong>逾期次数:</strong>0次</p>
                        <p><strong>严重逾期:</strong>0次</p>
                        <p><strong>待还笔数:</strong>0笔</p>
                        <p><strong>待还本息:</strong>0.00元</p>
                        <p><strong>借款总额:</strong>200,000元</p>
                        <p><strong>已还笔数:</strong>0笔</p>
                        <p><strong>已还本息:</strong>0.00元</p>
                        <p><strong>提前还款笔数:</strong>0笔</p>
                    </dd>
                </dl>
                <dl className="intro">
                    <dt><h3>审核信息</h3></dt>
                    <dd>
                        <ul className="authentication">
                            <li><img src={require('../../../../assets/images/invest/auth1.png')} />身份认证</li>
                            <li><img src={require('../../../../assets/images/invest/auth2.png')} />信用报告</li>
                            <li><img src={require('../../../../assets/images/invest/auth3.png')} />工作认证</li>
                            <li><img src={require('../../../../assets/images/invest/auth4.png')} />收入认证</li>
                        </ul>
                    </dd>
                </dl>
                <dl className="intro">
                    <dt><h3>抵押物信息 (车辆信息)</h3></dt>
                    <dd>
                        <p><strong>车辆品牌:</strong>宝马</p>
                        <p><strong>车辆型号:</strong>WB****10</p>
                        <p><strong>车架号:</strong>：WBAF*********3478</p>
                        <p><strong>车牌号:</strong>辽B***00</p>
                        <p><strong>登记证号:</strong>210******244</p>
                        <p><strong>行驶里程:</strong>80000公里</p>
                        <p><strong>购车年份:</strong>5~10年</p>
                        <p><strong>评估价格:</strong>300000元</p>
                    </dd>
                </dl>
                <dl className="intro">
                    <dt><h3>抵押物信息 (房产信息)</h3></dt>
                    <dd>
                        <p><strong>房产地址:</strong>辽宁省 大连市 *************</p>
                        <p><strong>房屋类型:</strong>商业用房</p>
                        <p><strong>建筑面积:</strong>：120平方米</p>
                        <p><strong>竣工年份:</strong>2000年</p>
                        <p><strong>尚欠贷余额:</strong>500000.00元</p>
                        <p><strong>土地所有证号:</strong>**************</p>
                        <p><strong>房屋产权所有证号:</strong>***********</p>
                        <p><strong>评估价格:</strong>3000000元</p>
                    </dd>
                </dl>
                <dl className="intro">
                    <dt><h3>相关资料</h3></dt>
                    <dd className="imglist">

                    </dd>
                </dl>
                <div className="m-introFooter">
                    <strong>承诺：</strong>本机构对借款人信息的真实性、融资项目的真实性、合法性进行审核，保证材料的真实、准确！
                </div>
            </li>
        </ul>
    );
};