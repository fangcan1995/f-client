import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import { connect } from 'react-redux';
import  memberSettingsActions  from '../../../../actions/member-settings';
import './riskAssess.less';
import { Radio,Button,message } from 'antd';
const RadioGroup = Radio.Group;


class MyRiskAssess extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            status:'',//0显示结果，1显示题目
            value: {
                ques1:'',
                ques2:'',
            },
            loading: false,
            iconLoading: false,
        }
        this.reset = this.reset.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(memberSettingsActions.getRiskAssessResult());
    }
    //选择答案
    onChange = (e) => {
        console.log(e.target);
        console.log(e.target.name+':'+e.target.value);

        let defaultChecked=this.props.memberSettings.messages.defaultChecked;
        /*defaultChecked*/
        this.props.dispatch(memberSettingsActions.stateRiskAssessModify({status:1}))
    }
    //提交答案
    handleSubmit = () => {
        this.setState({ iconLoading: true });
    }
    //重新评估
    reset(){
        console.log('重新评估');
        this.props.dispatch(memberSettingsActions.stateRiskAssessModify({status:1}))
    }
    render(){
        let {dispatch}=this.props
        let {riskAssess}=this.props.memberSettings;

        console.log(riskAssess.defaultChecked);
        if(riskAssess.status===1){
            console.log('获取列表');
            dispatch(memberSettingsActions.getRiskAssessList());
        }
        return(
            <div className="member__main riskAssess">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="风险评估">
                            {/*如果已经评估过*/}
                            {
                                (riskAssess.status===0)?
                                    <div className="record">
                                        <ul className="result">
                                            <li><strong>姓名：</strong>
                                                <p>佟鑫</p>
                                            </li>
                                            <li><strong>评测等级：</strong>
                                                <p>B</p>
                                            </li>
                                            <li><strong>获得称号：</strong>
                                                <p>
                                                    <em>稳健型投资者</em>
                                                    投资风险是做出投资决策时首先考虑的问题，但若冒一定的风险能够带来相当收益回报，也可能考虑投资。
                                                    可通过推荐理财降低风险是比较适合的投资选择。
                                                </p>
                                            </li>
                                            <li><strong>投资最大额度为：</strong>
                                                <p>300000.00元</p>
                                            </li>
                                            <li><strong>剩余可投金额：</strong>
                                                <p>290000.00元</p>
                                            </li>
                                            <li className="form__bar">
                                                <Button type="primary"  onClick={this.reset} style={{width:'20%'}} className='large'>
                                                    重新评估
                                                </Button>
                                            </li>
                                        </ul>
                                    </div>
                                    :(riskAssess.status===1)?
                                    <div className="riskAssessApp">
                                        <div className="form__wrapper">

                                            {
                                                (riskAssess.myList.data!='')?
                                                    riskAssess.myList.data.list.map((l, i) => (
                                                        <dl className="controls" key={`row-${i}`}>
                                                            <dt>1.您的投资目的是什么？</dt>
                                                            <dd>

                                                                <RadioGroup onChange={this.onChange} value={riskAssess.defaultChecked[i]} name={`${l.proId}`}>

                                                                    <Radio value={'A'}>A .我希望存点钱以备不时之需</Radio>
                                                                    <Radio value={'B'}>B .我希望保障我现有的资产价值，获取超过银行存款和通货膨胀率的收益</Radio>
                                                                    <Radio value={'C'}>C .在深思熟虑后愿意承担一定的风险</Radio>
                                                                    <Radio value={'D'}>D .我希望通过投资增加我未来的收入，获取一定的收益</Radio>

                                                                </RadioGroup>
                                                                {
                                                                    riskAssess.defaultChecked[i]===0?
                                                                        <span className="error">必选</span>
                                                                        :``
                                                                }

                                                            </dd>
                                                        </dl>
                                                    ))
                                                    :``
                                            }

                                            <div className="form__bar center">

                                                <Button type="primary"  loading={this.state.iconLoading} onClick={this.handleSubmit} style={{width:'20%'}} className='large'>
                                                    立即评估
                                                </Button>

                                            </div>
                                        </div>
                                    </div>
                                    :``
                            }



                        </div>
                    </Tab>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { auth,memberSettings } = state.toJS();
    return {
        auth,
        memberSettings
    };
}
export default connect(mapStateToProps)(MyRiskAssess);
