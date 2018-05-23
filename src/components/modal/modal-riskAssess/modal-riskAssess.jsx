import React from 'react';
import { connect } from 'react-redux';
import {myRiskAssessAc} from '../../../actions/member-settings';
import { Radio,Button } from 'antd';
import {BbhAlert} from '../../../components/bbhAlert/bbhAlert';
import {Loading,NoRecord,Posting} from '../../../components/bbhAlert/bbhAlert';
import {accountAc} from "../../../actions/account";

const RadioGroup = Radio.Group;
class ModalRiskAssess extends React.Component {
    constructor(props){
        super(props);
        this.state={
            showQuestion:false,
            tips:``
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
        let j=myList.findIndex((x)=>x.examId==e.target.name);
        myList[j].isChecked=e.target.value;
        this.props.dispatch(myRiskAssessAc.modifyState(myList));
        //如全部完成，清空前端错误提示
        let i=myList.findIndex(
            (x)=>x.isChecked==''
        );
        if(i==-1){
            this.setState({
                tips:``,
            });
        }

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
                this.setState({
                    tips:`请完成全部测评题目`,
                });
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
    modalClose(){
        console.log('测评成功回调');
        let {onSuccess,dispatch}=this.props;
        //props.dispatch(accountAc.getAccountInfo()); //获取会员帐户信息,暂时注释掉
        dispatch(accountAc.dummyModifyAccount({isRisk:'1'}));  //虚拟
        dispatch(accountAc.clear());
        onSuccess();
    }

    render(){

        let {dispatch,memberRiskAssess,account,onSuccess,onFail}=this.props;
        let {accountsInfo}=account;
        let {isRisk,surplusAmount}=accountsInfo;
        let {result,myList,postResult,isFetching,isPosting}=memberRiskAssess;

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
                                            <div className='tips'>
                                                {
                                                    postResult===``?this.state.tips
                                                    :postResult.message
                                                }
                                                </div>
                                            <div className="form__bar center">
                                                {isPosting?
                                                    <Button type="primary" className='pop__large' disabled={true}>
                                                        <Posting isShow={isPosting}/>
                                                    </Button>
                                                    :<Button type="primary"  onClick={this.handleSubmit}  className='pop__large' >
                                                        立即评估
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