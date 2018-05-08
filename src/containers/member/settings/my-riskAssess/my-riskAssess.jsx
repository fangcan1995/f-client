import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import { connect } from 'react-redux';
import { myRiskAssessAc} from '../../../../actions/member-settings';
import { Button } from 'antd';
import './riskAssess.less';
import RiskQuestions from './riskQuestions';

class MyRiskAssess extends React.Component {
    constructor(props){
        super(props);
        this.reset = this.reset.bind(this);
    }
    componentDidMount() {
        window.scrollTo(0,0);
        this.props.dispatch(myRiskAssessAc.getResult()); //获取测评结果
    }
    componentDidUpdate(){
        let {dispatch,memberRiskAssess}=this.props;
        if(memberRiskAssess.postResult.code==='0'){
            console.log('提交得到了测评结果');
            window.scrollTo(0,0);
            this.props.dispatch(myRiskAssessAc.reset());
            this.props.dispatch(myRiskAssessAc.getResult()); //获取测评结果
        }
    }
    //重新评估
    reset(){
        this.props.dispatch(myRiskAssessAc.toggle('1'));  //显示题目
    }
    render(){
        let {dispatch,memberRiskAssess}=this.props;
        let {result,hideResult,isFetching}=memberRiskAssess;
        return(
            <div className="member__main riskAssess">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="风险评估">
                            {
                                (hideResult===``)? ``
                                    :(hideResult===`0`)?
                                    <div className="tab_content">
                                        <ul className="result">
                                            <li><strong>评测等级：</strong>
                                                <p>{result.riskLevel}</p>
                                            </li>
                                            <li><strong>获得称号：</strong>
                                                <p>
                                                    <em>{result.name}</em>
                                                    {result.remarks}
                                                </p>
                                            </li>
                                            <li><strong>投资最大额度为：</strong>
                                                <p>{result.investTotal}元</p>
                                            </li>
                                            <li><strong>剩余可投金额：</strong>
                                                <p>{result.surplusInvestTotal}元</p>
                                            </li>
                                            <li className="form__bar">
                                                <Button type="primary"  onClick={this.reset} style={{width:'20%'}} className='large'>
                                                    重新评估
                                                </Button>
                                            </li>
                                        </ul>
                                    </div>
                                    :<div className="riskAssessApp">
                                        <RiskQuestions   />
                                    </div>
                            }
                        </div>
                    </Tab>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { auth,memberRiskAssess } = state.toJS();
    return {
        auth,
        memberRiskAssess
    };
}
export default connect(mapStateToProps)(MyRiskAssess);
