import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../../../components/crumbs/crumbs';
import Tab from '../../../../components/tab/tab';
import { connect } from 'react-redux';
import {myMessagesAc, myRiskAssessAc} from '../../../../actions/member-settings';
import './riskAssess.less';
import { Radio,Button } from 'antd';
import {memberAc} from "../../../../actions/member";
import {Loading,NoRecord,Posting} from '../../../../components/bbhAlert/bbhAlert';

const RadioGroup = Radio.Group;

const Result=({data,isShow})=>(
    (!{isShow})? ``
        :<div>测评结果{data}</div>
)
const List=({data,isShow})=>(
    (!{isShow})? ``
        :<div>题目{data}</div>
)
class MyRiskAssess extends React.Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.reset = this.reset.bind(this);
        this.disabled= this.disabled.bind(this);
        this.state = {
            loading: false,
            iconLoading: false,
        }
    }
    componentDidMount() {
        window.scrollTo(0,0);
        this.props.dispatch(myRiskAssessAc.getResult()); //获取测评结果
        //this.props.dispatch(myRiskAssessAc.getRiskAssessList());
    }
    componentDidUpdate(){
        /*let {deleteResult,readTag} = this.props.memberMessages;
        //如果有数据被删除
        if(deleteResult!==''){
            this.props.dispatch(myMessagesAc.getMessagesList({readTag:readTag}));
        }*/
        console.log('组件更新了');
    }
    disabled(){
        let {myList}=this.props.memberSettings.riskAssess;
        if(myList!=''){
            let i=myList.findIndex(
                (x)=>x.isChecked==''
            );
            if(i!==-1){
                return true
            }else{
                return false
            }
        }
    }
    //选择答案
    onChange = (e) => {
        let {myList}=this.props.memberSettings.riskAssess;
        let i=myList.findIndex((x)=>x.examId==e.target.name);
        myList[i].isChecked=e.target.value;
        this.props.dispatch(myRiskAssessAc.modifyState({myList:myList}));
    }
    //提交答案
    handleSubmit = () => {
        let {myList,result}=this.props.memberSettings.riskAssess;
        let questionAndAnswerDtoList=[];
        for (let index of myList.keys()){
            questionAndAnswerDtoList.push({questionId:myList[index].examId,answerCode:myList[index].isChecked});
        }
        let putJson={};
        if(result.riskResultId){
            putJson={
                riskResultId:result.riskResultId,
                questionAndAnswerDtoList:questionAndAnswerDtoList
            }
        }else{
            putJson={
                questionAndAnswerDtoList:questionAndAnswerDtoList
            }
        }
        this.props.dispatch(myRiskAssessAc.putRiskAssess(putJson));
    }
    //重新评估
    reset(){
        this.props.dispatch(myRiskAssessAc.modifyState({status:'1',myList:``}));
        this.props.dispatch(myRiskAssessAc.getRiskAssessList());
    }
    render(){
        let {dispatch,memberRiskAssess}=this.props;
        console.log('-----------------------------');
        console.log(memberRiskAssess);
        let {result,myList,status,postResult,isFetching,isPosting}=memberRiskAssess;
        if(postResult.code==='0'){
            window.scrollTo(0,0);
            this.props.dispatch(myRiskAssessAc.modifyState({postResult:``}));
            this.props.dispatch(memberAc.getInfo());
            this.props.dispatch(myRiskAssessAc.getResult());
        }
        return(
            <div className="member__main riskAssess">
                <Crumbs/>
                <div className="member__cbox">
                    <Tab>
                        <div name="风险评估">
                            <Result data="123" />
                            <List data="123" />



                            {
                                (status==='0')?
                                    <div className="tab_content">
                                        <ul className="result">
                                            {/*<li><strong>姓名：</strong>
                                                <p>{result.name}</p>
                                            </li>*/}
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
                                    :(status==='1')?
                                    <div className="riskAssessApp">
                                        <div className="form__wrapper">
                                            {(myList==='') ? <Loading isShow={isFetching} />
                                                :
                                                <div>
                                                    {
                                                        (myList.length>0)?
                                                            <div>
                                                                {myList.map((l, i) => (
                                                                <dl className="controls" key={`row-${i}`}>
                                                                    <dt>{i+1}.{l.examName}</dt>
                                                                    <dd>

                                                                        <RadioGroup onChange={this.onChange} value={`${l.isChecked}`} name={`${l.examId}`}>
                                                                            {l.answersDtoList.map((ll,ii)=>(
                                                                                <Radio value={`${ll.answerCode}`} key={`row-${ii}`}>{ll.answerCode} .{ll.answer}</Radio>
                                                                            ))}
                                                                        </RadioGroup>
                                                                        {
                                                                            l.isChecked===''?
                                                                                <span className="error">必选</span>
                                                                                :``
                                                                        }
                                                                    </dd>
                                                                </dl>
                                                                ))}
                                                                <div className="form__bar center">
                                                                    {isPosting ?
                                                                        <Button type="primary"  style={{width:'20%'}} className='large'
                                                                                disabled={isPosting}
                                                                        ><Posting isShow={isPosting}/>
                                                                        </Button>
                                                                        :
                                                                        <Button type="primary"  loading={this.state.iconLoading} onClick={this.handleSubmit} style={{width:'20%'}} className='large'
                                                                                disabled={this.disabled()}
                                                                        >
                                                                            立即评估
                                                                        </Button>
                                                                    }
                                                                </div>
                                                            </div>
                                                        : <NoRecord isShow={true} />
                                                    }
                                                </div>
                                            }
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
    const { auth,memberRiskAssess } = state.toJS();
    return {
        auth,
        memberRiskAssess
    };
}
export default connect(mapStateToProps)(MyRiskAssess);
