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
        this.onChange = this.onChange.bind(this);
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
    disabled(){
        let {myList}=this.props.memberSettings.riskAssess;
        let i=myList.findIndex((x)=>x.isChecked=='');

        if(i!==-1){
            return true
        }else{
            return false
        }
    }
    //选择答案
    onChange = (e) => {
        let {myList}=this.props.memberSettings.riskAssess;
        let i=myList.findIndex((x)=>x.proId==e.target.name);

        myList[i].isChecked=e.target.value;
        console.log('`````````````````');
        console.log(myList);
        this.props.dispatch(memberSettingsActions.stateRiskAssessModify({myList:myList}));
    }
    //提交答案
    handleSubmit = () => {

        let {myList}=this.props.memberSettings.riskAssess;
        //let postJson={};
        let result=[];
        for (let index of myList.keys()){
            result.push({proId:myList[index].proId,isChecked:myList[index].isChecked});
        }

        this.props.dispatch(memberSettingsActions.putRiskAssess(result));
    }
    //重新评估
    reset(){

        this.props.dispatch(memberSettingsActions.stateRiskAssessModify({status:1}));
        this.props.dispatch(memberSettingsActions.getRiskAssessList());
    }
    componentDidMount() {
        this.props.dispatch(memberSettingsActions.getRiskAssessResult());

    }
    render(){
        let {dispatch}=this.props
        let {riskAssess}=this.props.memberSettings;
        console.log(riskAssess);
        /*if(riskAssess.status===1){
            console.log('获取列表');
            dispatch(memberSettingsActions.getRiskAssessList());
        }*/
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
                                                (riskAssess.myList.length>0)?
                                                    riskAssess.myList.map((l, i) => (
                                                        <dl className="controls" key={`row-${i}`}>
                                                            <dt>1.您的投资目的是什么？</dt>
                                                            <dd>

                                                                <RadioGroup onChange={this.onChange} value={`${l.isChecked}`} name={`${l.proId}`}>

                                                                    <Radio value={'A'}>A .我希望存点钱以备不时之需{}</Radio>
                                                                    <Radio value={'B'}>B .我希望保障我现有的资产价值，获取超过银行存款和通货膨胀率的收益</Radio>
                                                                    <Radio value={'C'}>C .在深思熟虑后愿意承担一定的风险</Radio>
                                                                    <Radio value={'D'}>D .我希望通过投资增加我未来的收入，获取一定的收益</Radio>

                                                                </RadioGroup>
                                                                {
                                                                    l.isChecked===''?
                                                                        <span className="error">必选</span>
                                                                        :``
                                                                }

                                                            </dd>
                                                        </dl>
                                                    ))
                                                    :``
                                            }

                                            <div className="form__bar center">

                                                <Button type="primary"  loading={this.state.iconLoading} onClick={this.handleSubmit} style={{width:'20%'}} className='large'
                                                        disabled={this.disabled()}
                                                >
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
