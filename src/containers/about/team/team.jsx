import React from 'react';

const data = [
    {
        'fullName':'轩海成',
        'post':'总裁',
        'department':'国汇财富投资管理（大连）股份有限公司',
        'phone':'../../../assets/images/about/phone1.jpg',
        'intro':'国汇财富投资管理（大连）股份有限公司总裁；大连守望农业控股有限公司董事；大连纳里餐饮管理有限公司总经理；大连中海志成股权投资有限公司总经理；深圳景泉融资租赁有限公司董事；上海行动成功管理技术股份有限公司大连分公司经理中华人民共和国律师；企业商学院建设专家诊断专家；资深企业管理顾问；黑龙江大学法学学士；清华大学MBA 工商管理硕士；中国杰出CEO（高级职业经理人）。'
    },
    {
        'fullName':'轩海成2',
        'post':'总裁',
        'department':'国汇财富投资管理（大连）股份有限公司',
        'phone':'../../../../assets/images/about/phone1.jpg',
        'intro':'国汇财富投资管理（大连）股份有限公司总裁；大连守望农业控股有限公司董事；大连纳里餐饮管理有限公司总经理；大连中海志成股权投资有限公司总经理；深圳景泉融资租赁有限公司董事；上海行动成功管理技术股份有限公司大连分公司经理中华人民共和国律师；企业商学院建设专家诊断专家；资深企业管理顾问；黑龙江大学法学学士；清华大学MBA 工商管理硕士；中国杰出CEO（高级职业经理人）。'
    },
];

export default ({ location, match, history }) => {
    return(
        <div>
            <div className="m-crumb">
                <div>
                    <b>您所在的位置：</b><a href="/">首页</a> > 关于我们 > 管理团队
                </div>
            </div>
            <div className="tab">
                <div className="tab_title">
                    <ul>
                        <li className="on"><h3>团队管理</h3>
                        </li>
                    </ul>
                </div>
                <div className="tab_content">
                    <ul className="speciallist">
                        {
                            data.map((entry, rowIndex) => (
                                <li key={`row-${rowIndex}`}>
                                    <dl>
                                        <dt>
                                            <h3><strong>{entry.fullName}</strong>{entry.post}</h3>
                                            <p>{entry.department}</p>
                                        </dt>
                                        <dd className="photo">
                                            <img  />

                                        </dd>
                                        <dd className="intro">
                                            <p>{entry.intro}</p>
                                        </dd>
                                    </dl>
                                </li>
                                )
                            )}
                    </ul>

                </div>
            </div>
        </div>
    )
}