import React from 'react';
import { connect } from 'react-redux';
import BohaiInfo from "../../../components/bohai-info/bohai-info";

class ModalBindCardBohai extends React.Component {
    render(){
        return(
            <div className="pop__openOther">
                <div className="form__wrapper">
                    <div className='m-wxts'>
                        <h3>温馨提示：</h3>
                        <p>
                            1. 存管姓名与身份证号码应保证一一对应，存管身份证仅支持二代身份证，一代身份证无法开通存管账户；<br/>
                            2. 银行卡根据大行不同，每日转账具有一定限额，各大行转账限额请 <a href='#'>点击查看></a><br/>
                            3. 存管账户开立成功后，渤海银行将为您开通电子账户并进行资金存管；<br/>
                            4. 未开通认证支付的银行卡无法绑定，请至开户行办理开通认证支付业务；
                        </p>
                    </div>
                    <div className='bindCard-btn'>
                        <BohaiInfo type={`bindCard`} url={this.props.returnPage}>开通存管账户</BohaiInfo>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { auth} = state.toJS();
    return {
        auth
    };
}
export default connect(mapStateToProps)(ModalBindCardBohai);