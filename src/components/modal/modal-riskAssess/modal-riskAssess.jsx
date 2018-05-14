import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {myRiskAssessAc} from '../../../actions/member-settings';
import { Radio,Button } from 'antd';
import {memberAc} from "../../../actions/member";
import {BbhAlert} from '../../../components/bbhAlert/bbhAlert';
import { Alert } from 'antd';
import './modal-riskAssess.less';

const RadioGroup = Radio.Group;
import {Loading,NoRecord,Posting} from '../../../components/bbhAlert/bbhAlert';
class ModalRiskAssess extends React.Component {
    constructor(props){
        super(props);
        this.state={
            showQuestion:false
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    /*componentWillMount() {
        let {accountsInfo}=this.props.account;
        let {isRisk,surplusAmount}=accountsInfo;

    }*/
    //选择答案
    onChange = (e) => {
        let {myList}=this.props.memberRiskAssess;
        let i=myList.findIndex((x)=>x.examId==e.target.name);
        myList[i].isChecked=e.target.value;
        this.props.dispatch(myRiskAssessAc.modifyState(myList));
    }
    //提交答案
    handleSubmit = () => {
        let {myList,result}=this.props.memberRiskAssess;
        //验证是否填写了全部题目
        if(myList!=''){
            let i=myList.findIndex(
                (x)=>x.isChecked==''
            );
            if(i!=-1){
                return false
            }
        }
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
    getQuestions(){
        this.setState({
            showQuestion:true,
        });
        this.props.dispatch(myRiskAssessAc.getRiskAssessList()); //获取题目
    }
    //关闭
    /*modalClose(){
        this.props.dispatch(myRiskAssessAc.reset());
        let {callback}=this.props.config;
        callback();
    }*/

    render(){

        let {dispatch,memberRiskAssess,account,onSuccess,onFail}=this.props;
        let {accountsInfo}=account;
        let {isRisk,surplusAmount}=accountsInfo;
        let {result,myList,postResult,isFetching,isPosting}=memberRiskAssess;
        /*let {riskAssess,isFetching,isPosting}=this.props.memberSettings;
        let {myList,postResult}=riskAssess;*/
        if(!this.state.showQuestion){
            if(isRisk==='0'){
                return(
                    <div className="pop__riskAssess">
                        <div className="form__wrapper">
                            <div className='center'>
                                <div className='result_tips'>
                                    <h3>风险承受能力测评</h3>
                                    <p>按照网贷行业相关监管规定，出借人在网贷平台需要进行风险能力评估，*******************************************************</p>
                                </div>
                            </div>
                            <div className='center'>
                                <Button type="primary" htmlType="submit" className="pop__large" onClick={()=> this.getQuestions()}>立即测评</Button>
                            </div>
                        </div>
                    </div>
                )
            }else if(isRisk==='1' && surplusAmount<1000){
                return(
                    <div className="pop__riskAssess">
                        <div className="form__wrapper">
                            <div className='center'>
                                <div className='result_tips'>
                                    <h3>根据您风险测评的结果，您不能在本平台进行投资</h3>
                                    <p>*******************************************************，*******************************************************</p>
                                </div>
                            </div>
                            <div className='center'>
                                <Button type="primary" htmlType="submit" className="pop__large" onClick={()=> this.getQuestions()}>重新测评</Button>
                                <Button type="primary" htmlType="submit" className="pop__large" onClick={()=> onFail()}>关闭</Button>
                            </div>
                        </div>
                    </div>
                )
            }else{
                return(``);
            }
        }else{
            //显示测试题目
            if(postResult.type!=`success`){
                return(
                    <div className="pop__riskAssess">
                        <div className="riskAssessApp">
                            <div className="form__wrapper">
                                {
                                    (myList==='') ? <Loading isShow={isFetching} />
                                        :<div>
                                            {
                                                (myList.length>0)?
                                                    myList.map((l, i) => (
                                                        <dl className="controls" key={`row-${i}`}>
                                                            <dt>
                                                                <p>{i+1}.{l.examName}</p>
                                                                {
                                                                    l.isChecked===''?
                                                                        <span className="error">必选</span>
                                                                        :``
                                                                }
                                                            </dt>
                                                            <dd>

                                                                <RadioGroup onChange={this.onChange} value={`${l.isChecked}`} name={`${l.examId}`}>
                                                                    {l.answersDtoList.map((ll,ii)=>(
                                                                        <Radio value={`${ll.answerCode}`} key={`row-${ii}`}>{ll.answerCode} .{ll.answer}</Radio>
                                                                    ))}
                                                                </RadioGroup>


                                                            </dd>
                                                        </dl>
                                                    ))
                                                    :``
                                            }
                                            <div className="form__bar center">
                                                {
                                                    isPosting?
                                                        <Button type="primary" style={{width:'30%'}} className='large' disabled={true}>
                                                            <Posting isShow={isPosting}/>
                                                        </Button>
                                                        :<Button type="primary"  onClick={this.handleSubmit} style={{width:'30%'}} className='large'
                                                        >立即评估
                                                        </Button>
                                                }
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                )
            }else{
                return(
                    <div className="pop__riskAssess" style={{padding:'50px'}}>
                        <BbhAlert
                            info={{message:postResult.message,description:postResult.description,type:postResult.type,
                                callback:()=>{
                                    this.modalClose()
                                }
                            }}
                        />
                    </div>
                )
            }
        }

    }
}
function mapStateToProps(state) {
    const { auth,account,memberRiskAssess } = state.toJS();
    return {
        auth,
        account,
        memberRiskAssess
    };
}
export default connect(mapStateToProps)(ModalRiskAssess);