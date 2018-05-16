import React from 'react';
import {Loading,NoRecord,Posting} from '../../../../components/bbhAlert/bbhAlert';
import { Radio,Button } from 'antd';
import { connect } from 'react-redux';
import { myRiskAssessAc} from '../../../../actions/member-settings';
import {memberAc} from "../../../../actions/member";
import './riskAssessApp.less';
const RadioGroup = Radio.Group;

class riskQuestions extends React.Component {
    constructor(props){
        super(props);
        this.state={
            tips:``
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(myRiskAssessAc.getRiskAssessList()); //获取题目
    }
    //选择答案
    onChange = (e) => {
        let {myList}=this.props.memberRiskAssess;
        let i=myList.findIndex((x)=>x.examId==e.target.name);
        myList[i].isChecked=e.target.value;
        this.props.dispatch(myRiskAssessAc.modifyState(myList));
        console.log(myList);
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
    render(){
        let {dispatch,memberRiskAssess}=this.props;
        let {result,myList,postResult,isFetching,isPosting}=memberRiskAssess;
        return(
            <div className="form__wrapper riskAssessApp">
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
                                            <Button type="primary"  style={{width:'30%'}} className='large' disabled={isPosting}><Posting isShow={isPosting}/>
                                            </Button>
                                            : <Button type="primary"  onClick={this.handleSubmit} style={{width:'30%'}} className='large'
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
export default connect(mapStateToProps)(riskQuestions);
