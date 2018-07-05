import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {addCommas, toMoney, toNumber,cardGetAge,cardGetSex} from "../../../../utils/famatData"
import {Loading,NoRecord} from '../../../../components/bbhAlert/bbhAlert';
    export default ({loanInfo,isFetching,...rest}) => {
        let {projectInfoBaseInfoDto,loanCreditCountDto,projectInfoLoanInfoDto,mortgageCarHis,houseTypeName,mortgageHouseHis,filesList}=loanInfo;
        //console.log('------------标的详情-------------');
        //console.log(projectInfoBaseInfoDto);
        return (
            <ul className="m-intro">
                <li>
                    {(loanInfo === '') ? <Loading isShow={isFetching} />
                        :
                        <div>
                            <dl className="intro">
                                <dt><h3>基本信息</h3></dt>
                                <dd>
                                    <p><strong>用户名：</strong>{projectInfoBaseInfoDto.userName || ``}</p>
                                    <p><strong>手机号：</strong>{projectInfoBaseInfoDto.phoneNumber}</p>
                                    <p><strong>身份证号：</strong>{projectInfoBaseInfoDto.idNumber}</p>
                                    <p><strong>性别：</strong> {projectInfoBaseInfoDto.msexString}    </p>
                                    <p><strong>年龄：</strong>{projectInfoBaseInfoDto.mage}    </p>
                                    <p><strong>学历： </strong>{projectInfoBaseInfoDto.educationString || ``}</p>
                                    <p><strong>婚姻状况： </strong>{projectInfoBaseInfoDto.maritaStatusString}</p>
                                    <p><strong>借款用途： </strong>{projectInfoLoanInfoDto.loanUseString}</p>
                                    <p><strong>还款来源： </strong>{projectInfoLoanInfoDto.rpmtSource || ''}</p>
                                    <p className="line"><strong>资产介绍：</strong>{projectInfoBaseInfoDto.assetDesc}</p>
                                    <p className="line"><strong>债务介绍：</strong>{projectInfoBaseInfoDto.debtDesc}</p>
                                </dd>
                            </dl>
                            <dl className="intro">
                                <dt><h3>信用信息</h3></dt>
                                <dd>
                                    {/* <p><strong>申请借款:</strong>{loanCreditCountDto.loanApplyCount}笔</p> */}
                                    <p><strong>成功借款:</strong>{loanCreditCountDto.loanSuccessCount}笔</p>
                                    {/* <p><strong>失败借款:</strong>{loanCreditCountDto.loanFailCount}笔</p> */}
                                    <p><strong>逾期金额:</strong>{addCommas(loanCreditCountDto.lateTotalFee)}元</p>
                                    <p><strong>逾期次数:</strong>{loanCreditCountDto.lateAllCount}次</p>
                                    <p><strong>严重逾期:</strong>{loanCreditCountDto.seriousLateCount}次</p>
                                    <p><strong>待还笔数:</strong>{loanCreditCountDto.notYetCount}笔</p>
                                    <p><strong>待还本息:</strong>{addCommas(loanCreditCountDto.notYetSum)}元</p>
                                    <p><strong>借款总额:</strong>{addCommas(loanCreditCountDto.loanAmtSum)}元</p>
                                    <p><strong>已还笔数:</strong>{loanCreditCountDto.alreadyRpmtCount}笔</p>
                                    <p><strong>已还本息:</strong>{addCommas(loanCreditCountDto.alreadyRpmtSum)}元</p>
                                    <p><strong>提前还款笔数:</strong>{loanCreditCountDto.prepaymentCount}笔</p>
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
                            {(mortgageCarHis)?
                                <dl className="intro">
                                    <dt><h3>抵押物信息</h3></dt>
                                    <dd>
                                        <p><strong>车辆品牌:</strong>{mortgageCarHis.carBrand}</p>
                                        <p><strong>车辆型号:</strong>{mortgageCarHis.carModel}</p>
                                        <p><strong>车架号:</strong>：{mortgageCarHis.viNumber}</p>
                                        <p><strong>车牌号:</strong>{mortgageCarHis.carNumber}</p>
                                        <p><strong>登记证号:</strong>{mortgageCarHis.carRegNumber}</p>
                                        <p><strong>行驶里程:</strong>{mortgageCarHis.mileage?`${mortgageCarHis.mileage}公里`:``}</p>
                                        <p><strong>购车年份:</strong>{mortgageCarHis.carAge}年</p>
                                        <p><strong>评估价格:</strong>

                                            {
                                                mortgageCarHis.pricePotential?`${addCommas(mortgageCarHis.pricePotential)}元`
                                                    :``
                                            }
                                        </p>
                                    </dd>
                                </dl>:''
                            }
                            {(mortgageHouseHis)?
                                <dl className="intro">
                                    <dt><h3>抵押物信息</h3></dt>
                                    <dd>
                                        <p><strong>房产地址:</strong>{mortgageHouseHis.houseAdress}</p>
                                        <p><strong>房屋类型:</strong>{houseTypeName}</p>
                                        <p><strong>建筑面积:</strong>{mortgageHouseHis.area}平方米</p>
                                        <p><strong>竣工年份:</strong>{mortgageHouseHis.houseAge}年</p>
                                        <p><strong>尚欠贷余额:</strong>{mortgageHouseHis.debtMoney}元</p>
                                        <p><strong>土地所有证号:</strong>{mortgageHouseHis.landNo}</p>
                                        <p><strong>房屋产权所有证号:</strong>{mortgageHouseHis.houseBelongNo}</p>
                                        <p><strong>评估价格:</strong>{addCommas(mortgageHouseHis.pricePotential)}元</p>
                                    </dd>
                                </dl>
                                :''
                            }
                            <dl className="intro">
                                <dt><h3>相关资料</h3></dt>
                                <dd className="imglist">
                                    <ul>
                                        {filesList.map((l, i) => (
                                            <li key={`row-${i}`}>
                                                <a href={`${l.uploadPath}`} target="_blank">
                                                    <img src={`${l.uploadPath}`} />
                                                    <p title={`${l.fileName}`}>{l.fileName}</p>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </dd>
                            </dl>
                        </div>
                    }

                    <div className="m-introFooter">
                        <strong>承诺：</strong>本机构对借款人信息的真实性、融资项目的真实性、合法性进行审核，保证材料的真实、准确！
                    </div>
                </li>
            </ul>
        );

}

