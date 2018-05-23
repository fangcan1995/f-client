import React from 'react';
import {connect} from "react-redux";
import specialAc from "../../../../actions/special";
class RiskNotice extends React.Component{
    componentDidMount () {
        this.props.dispatch(specialAc.getInfo(2)); //风险信息,需要去后台确认一下id,暂时用2
    }
    render(){
        const {special}=this.props;
        const {info,isFetching}=special;
        return (
            <ul className="m-notice">
                <li>
                    {
                        (info.code === '0') ?
                            <div className="contentBlock" dangerouslySetInnerHTML={{ __html: special.info.data.content }}></div>
                            :``
                    }
                        {/*<div className="contentBlock" dangerouslySetInnerHTML={{ __html: special.info.data.content }}></div>*/}

                    {/*<h3>投资有风险，选择需谨慎</h3>
                    <p>一、巴巴汇作为居间服务人，其职责为撮合交易双方达成投融资需求，交易中产生的风险或损失由您自担 。</p>
                    <p>二、您须认真阅读并遵守巴巴汇的交易规则，如您无法满足巴巴汇交易规则规定的要求或违反交易规则，仍进行投资操作的，您将承担由此产生的一切后果。</p>
                    <p>三、如您在巴巴汇电子交易系统进行交易的产品出现不能按时兑付的风险时，巴巴汇会按照系统规定的方式和时间通知您,您可以按照巴巴汇的相关规则进行转让、继续持有等操作。
                        若您难以或无法将持有的产品对外转让的，您将承担由此导致的全部损失。</p>
                    <p>四、非因巴巴汇的原因，例如：地震、水灾、火灾等不可抗力因素或者国家法律、法规、政策的变化等因素，可能造成您的指令无法成交、兑付迟延、收益减少以及其他损失的，您
                        须承担由此导致的损失。</p>
                    <p>五、互联网电子交易存在(包括但不限于)以下风险，您将承担由此导致的损失：<br/>
                        1．由于无法控制和不可预测的系统故障、网络故障、设备故障、通讯故障、电力故障及其它因素，可能导致交易系统非正常运行甚至瘫痪，使您的交易指令出现延迟、中断、数据
                        错误等情况；<br/>
                        2．互联网上的数据传输可能因通信繁忙等原因出现延迟、中断、数据错误或不完全，从而使网上交易出现延迟、中断；<br/>
                        3．如果缺乏互联网交易经验或不熟悉平台交易流程，可能因操作不当或错误造成交易失败或交易错误；<br/>
                        4．如网上交易系统被网络黑客或计算机病毒攻击，由此可能导致交易系统故障，使交易无法进行及行情信息出现错误或延迟；<br/>
                        5．您的账户被他人盗用或遗失；<br/>
                        6．其他由于互联网运营中产生的风险。
                    </p>
                    <p>提别提示:本《风险告知书》无法揭示从事互联网金融交易的所有风险和有关巴巴汇交易市场的全部情形。故请您在交易之前，全面了解互联网金融交易法律法规和巴巴汇的交易规则
                        及相关规定，审慎投资。若您对《风险告知书》内容存在疑问，请及时向巴巴汇服务人员反映，由平台负责解释。
                    </p>*/}
                </li>
            </ul>
        );
    }
}


function mapStateToProps(state) {
    const { special } = state.toJS();
    return {
        special
    };
}
export default connect(mapStateToProps)(RiskNotice);
