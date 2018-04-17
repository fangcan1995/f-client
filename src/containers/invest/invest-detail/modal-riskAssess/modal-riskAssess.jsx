import React from 'react';
import PropTypes from 'prop-types';
import './modal-riskAssess.less';

import { connect } from 'react-redux';
import {myRiskAssessAc} from '../../../../actions/member-settings';
import { Radio,Button } from 'antd';
import {memberAc} from "../../../../actions/member";
import {BbhAlert} from '../../../../components/bbhAlert/bbhAlert';
const RadioGroup = Radio.Group;

class ModalRiskAssess extends React.Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
       /* this.reset = this.reset.bind(this);*/
        this.disabled= this.disabled.bind(this);
        this.state = {
            loading: false,
            iconLoading: false,
        }
    }
    componentDidMount() {
        this.props.dispatch(myRiskAssessAc.getResult());
        this.props.dispatch(myRiskAssessAc.getRiskAssessList());
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

    render(){
        let {dispatch}=this.props;
        let {riskAssess,isFetching}=this.props.memberSettings;
        let {result,myList,status,postResult}=riskAssess;
        console.log('postResult');
        console.log(postResult);
        let {callback}=this.props.config;
        if(postResult.code==='0'){

            //this.props.dispatch(myRiskAssessAc.modifyState({postResult:''}));
            //this.props.dispatch(memberAc.getInfo()); //提交答案后重新获取用户信息
            return(
                <div className="pop__riskAssess">
                    <div className="riskAssessApp" style={{padding:'30px'}}>
                    <BbhAlert
                        info={{
                            message:'成功',
                            description:postResult.message,
                            type:'success',
                            callback:(obj)=>{
                                callback();
                            }
                        }}
                    />
                    </div>
                </div>
            )
        }else{
            return(
                <div className="pop__riskAssess">
                    <div className="riskAssessApp">
                        <div className="form__wrapper">

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

                                <Button type="primary"  loading={this.state.iconLoading} onClick={this.handleSubmit} style={{width:'20%'}} className='large'
                                        disabled={this.disabled()}
                                >
                                    立即评估
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    }
}
function mapStateToProps(state) {
    const { auth,memberSettings } = state.toJS();
    return {
        auth,
        memberSettings
    };
}
export default connect(mapStateToProps)(ModalRiskAssess);