import React from 'react';
import PropTypes from 'prop-types';
import  {getData}  from '../../../../assets/js/getData';
import './modal-riskAssess.less';
import { Form,Radio,Alert } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
export default class ModalRiskAssess extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state= {
            dataSetting: {},
            alertInfo:{
                show:false,
                message:'',
                description:'',
                type:''
            },
            answers:{}
        }
    }
    onChange = (e) => {
        this.setState({
            answers:{
                [e.target.name]:e.target.value,
            }

        },()=>{
            console.log(this.state);
        });
    }


    handleSubmit(e){
        //1 验证输入是否正确
        console.log(this.state.dataSetting.list.length);

        for (let index = 0; index < this.state.dataSetting.list.length; index++) {
            //console.log(myArray[index]);
            console.log(this.state);
            if(!this.state[`question-${index+1}`]){

                return false;
            }
        }

        //2 提交后台
        fetch(`http://172.16.4.5:8084/test.php`, {
            method: "POST",
            mode:'cors',
            cache: 'default',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({projectId: 1,moneyEnd:2})
        }).then(function (response){
            if (response.status == 200){
                return response;
            }
        })
            .then((data) => data.json())
            .then((data) => {
                    if(data.code==='0'){
                        this.message('成功','您的申请已经提交','success');
                        //callback();
                    }else{
                        this.message('失败','申请不通过','error');
                    }

             }).catch((err)=>{
                this.message('失败','连接失败，请重试','error');
        });
        //4 关闭弹窗

    }
    message(message,description,type){
        this.setState({
            formHide:true,
            alertInfo:{
                show:true,
                message:message,
                description:description,
                type:type
            }
        });
    }
    loadData(){
        let data=getData(`http://localhost:9002/members/investments/transfer/id`);
        if (data){
        }else{
            let mockDate={
                code: "0",
                data:{
                    list:[
                        {
                            id:5,title: '问题1',
                            answers: [
                                {id:1,title:'A.答案1'},
                                {id:2,title:'B.答案2'},
                                {id:3,title:'C.答案3'},
                            ],
                        },
                        {
                            id: 6,title: '问题2',
                            answers: [
                                {id:1,title:'答案1'},
                                {id:2,title:'答案2'},
                                {id:3,title:'答案3'},
                                {id:4,title:'答案4'},
                            ],
                        },
                        {
                            id: 9,title: '问题3',
                            answers: [
                                {id:1,title:'答案1'},
                                {id:2,title:'答案2'},
                                {id:3,title:'答案3'},
                                {id:4,title:'答案4'},
                            ],
                        },

                    ],
                },
                message: "SUCCESS",
                time: "2018-01-17 11:49:39"
            }

            this.setState({
                dataSetting:mockDate.data,
                answers:{
                    5:0,
                    6:0,
                    9:0
                }
            });
        }
    }
    componentDidMount () {
        this.loadData();
    }
    message(message,description,type){
        this.setState({
            formHide:true,
            alertInfo:{
                show:true,
                message:message,
                description:description,
                type:type
            }
        });
    }
    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        let {callback}=this.props.config;
        const {list}=this.state.dataSetting;
        return (
            <div className="pop__riskAssess">
                {
                    JSON.stringify(this.state.dataSetting) == "{}"? <div>loading...</div>
                        :
                        <div>
                            <div className="form__wrapper" id="area" hidden={this.state.formHide}>
                                {
                                    list.map((item, rowIndex) => (

                                <dl className="controls" key={`row-${rowIndex}`}>
                                    <dt><p>{rowIndex+1} .{item.title}</p>
                                        {
                                            (this.state.answers[`${item.id}`]!=0)? <span className="errorMessages">*</span>:''}
                                    </dt>
                                    <dd>
                                        <RadioGroup onChange={this.onChange} value={this.state.answers[`${item.id}`]} name={`${item.id}`}>
                                            {
                                                item.answers.map((answer, answerIndex) => (
                                            <Radio value={answer.id} style={radioStyle} key={`row-${answerIndex}`}>{answer.title}</Radio>
                                                ))
                                            }
                                        </RadioGroup>
                                    </dd>
                                </dl>
                                    ))
                                }

                                <div className="center">
                                    <button  className="button able"　onClick={this.handleSubmit}>立即测评</button>
                                </div>
                            </div>
                            {
                                (this.state.alertInfo.show)?
                                    <div className="form__wrapper">
                                        <Alert
                                            message={this.state.alertInfo.message}
                                            description={this.state.alertInfo.description}
                                            type={this.state.alertInfo.type}
                                            showIcon
                                        />
                                        <button className="button able" style={{marginTop:'30px'}} onClick={() => callback() }>确定</button>
                                    </div>

                                    :''
                            }
                        </div>

                }
            </div>
        );
    }
};