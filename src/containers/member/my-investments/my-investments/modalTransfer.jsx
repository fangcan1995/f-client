import React from 'react';
import PropTypes from 'prop-types';
import  {getData}  from '../../../../assets/js/getData';
import  {poundage,addCommas,checkMoney}  from '../../../../assets/js/cost';
import { Checkbox,message } from 'antd';
import { connect } from 'react-redux';
import actionsMyInvestments from './actions_myInvestments';
class ModalTransfer extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.amountChange = this.amountChange.bind(this)
        /*this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            value:0,  //债转金额
            tips:'',  //错误提示
            transferInfo:{},  //债转详情
            isRead:false
        }*/
    }
    /*handleSubmit(e){
        this.props.dispatch(actionsMyInvestments.checkTransfer());
    }*/
    /*handleSubmit(e){
        const {callback} = this.props.config;
        //1 验证输入是否正确
        let result=checkMoney({
            'value':this.state.value,
            'type':0,
            'min_v':this.state.transferInfo.proMinInvestAmount,
            'max_v':this.state.transferInfo.transFinanced,
            'label':'转让金额',
            'interval':this.state.transferInfo.proIncreaseAmount
        });
        if(!result[0]){
            this.setState({
                tips:`${result[2]}`
            });
            return false;
        }
        //2 验证是否同意协议
        if(!this.state.isRead){
            this.setState({
                tips:`请同意债权转让服务协议！`
            });
            return false;
        }
        //3 提交后台

        fetch(`http://172.16.4.5:8084/test.php`, {
            method: "POST",
            mode:'cors',
            cache: 'default',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({projectId: this.props.config.proId,moneyEnd:this.state.value})
        }).then(function (response){
            if (response.status == 200){
                return response;
            }
        })
            .then((data) => data.json())
            .then((data) => {
                if(data.code==='0'){
                    message.success('您的申请已经提交');
                    callback({});
                }else{
                    message.error('err,申请不通过');
                }

            })
            .catch((err)=>{
                message.error('连接失败，请重试');
            });
        //4 关闭弹窗
    }*/
    /*
    onChange(e) {
        this.setState({
            isRead: e.target.checked
        });
        if(this.state.tips===`请同意债权转让服务协议！`){
            this.setState({
                tips: ``
            });
        }
    }
    //改变转让金额
    handleChange(event) {
        let result=checkMoney({
            'value':event.target.value,
            'type':0,
            'min_v':this.state.transferInfo.proMinInvestAmount,
            'max_v':this.state.transferInfo.transFinanced,
            'label':'转让金额',
            'interval':this.state.transferInfo.proIncreaseAmount
        });
        if(result[0]==false){
            if(result[1]==1){
                this.setState({
                    value: event.target.value,
                    tips:`${result[2]}`
                });
            }else{
                this.setState({
                    value: 0,
                    tips:`${result[2]}`
                });
            }

        }else {
            this.setState(
                {
                    value: event.target.value,
                    tips: ``
                });
        }
    }
    loadData(){
        let data=getData(`http://localhost:9002/members/investments/transfer/id`);
        if (data){
        }else{
            let mockDate={
                data: {
                    transProjectId:1,
                    transFinanced:10000.00,
                    proMinInvestAmount:1000,
                    proIncreaseAmount:100,
                    proTransferFee:0.02
                },
                code: "0",
                message: "SUCCESS",
            };

            this.setState({
                transferInfo:mockDate.data
            },()=>{
                console.log(this.state.transferInfo);
            });
        }
    }
    componentDidMount () {
        this.loadData();
    }*/
    checkInput(parm){

    }
    onChange(e) {
        this.setState({
            isRead: e.target.checked
        });
        if(this.state.tips===`请同意债权转让服务协议！`){
            this.setState({
                tips: ``
            });
        }
    }
    //改变转让金额
    amountChange(event) {
        console.log(event.target.value);
        this.props.dispatch(actionsMyInvestments.changeAmount(1000));
        console.log('修改store')
        //修改store
    }
    handleSubmit(e){
        //验证
        //this.props.dispatch(actionsMyInvestments.checkTransfer(this.props.transferInfo.transferData));
        let{transferData}=this.props.transferInfo;
        let value=parseInt(this.refs.amount.value);
        //1 验证输入是否正确
        //console.log(value);
        let result=checkMoney({
            'value':value,
            'type':0,
            'min_v':parseInt(transferData.proMinInvestAmount),
            'max_v':parseInt(transferData.transFinanced),
            'label':'转让金额',
            'interval':parseInt(transferData.proIncreaseAmount)
        });
        if(!result[0]){
            //console.log(`显示错误:${result[2]}`);
            this.props.dispatch(actionsMyInvestments.checkTransfer());
            //this.props.dispatch(actionsMyInvestments.refreshPostSwitch(false,${result[2]}));
            //return false;
        }
        //2 验证是否同意协议
        if(!transferData.isRead){
            //this.props.dispatch(actionsMyInvestments.refreshPostSwitch(false,`显示请同意债权转让服务协议！`));
            //console.log(`显示请同意债权转让服务协议！`);
            return false;
        }
        //console.log('通过验证');
        //this.props.dispatch(actionsMyInvestments.refreshPostSwitch(true,``));
        // 提交后台
        if(this.props.transferInfo.postSwitch){
            this.props.dispatch(actionsMyInvestments.postTransfer());
        }
    }
    render() {
        let {dispatch}=this.props;
        let {currentId,transferData,value,tips}=this.props.transferInfo;
        console.log('---------this.props--------');
        console.log(this.props);
        console.log('---------this.props--------');
        return (
            <div className="pop__transfer">
                <div className="form__wrapper">
                    <dl className="form__bar">
                        <dt><label>实际投资金额:</label></dt>
                        <dd><i id="Accountbalance" className="money">{/*{transferData.transFinanced}*/}</i> 元</dd>
                    </dl>
                    <dl className="form__bar">
                        <dt><label>转让金额:</label></dt>
                        <dd>
                            <input type="text"  className="textInput moneyInput"  autoComplete="off" maxLength="13" onChange={this.amountChange} ref="amount" />
                            <span className="unit" >元</span>
                        </dd>
                    </dl>
                    <dl className="form__bar">
                        <dt><label>手续费：</label></dt>
                        <dd>

                            <i id="cost" className="money">{/*{addCommas(poundage(value,transferData.proTransferFee))}*/}</i> 元
                        </dd>
                    </dl>
                    <dl className="form__bar">
                        <dt><label>预期到账金额：</label></dt>
                        <dd><i id="money" className="money">
                            {/*{value!=0?
                                addCommas(value-poundage(value,transferData.proTransferFee))
                                : `0.00`
                            }*/}
                            </i>元
                        </dd>
                    </dl>
                    <dl className="form__bar"></dl>
                    <dl className="form__bar">
                        <p>
                            <Checkbox onChange={this.onChange}>我已阅读并同意<a href="/transfer.html" target="_blank">《巴巴汇债权转让服务协议》</a></Checkbox>
                        </p>
                    </dl>
                    <div className="form__bar">
                        <span className="errorMessages">
                            {tips}
                        </span>
                    </div>
                    <div className="form__bar">
                        <button  className="button able"　onClick={this.handleSubmit}>确认</button>
                    </div>
                </div>

            </div>
        );
    }
};
function mapStateToProps(state) {
    const { auth,myInvestments } = state.toJS();
    return {
        auth,
        myInvestments,
    };
}
export default connect(mapStateToProps)(ModalTransfer);