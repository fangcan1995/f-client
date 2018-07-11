import React,{ Component }  from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import { connect } from 'react-redux';
import {memberInvestAc} from "../../../actions/member-investments";
import {Loading,NoRecord} from '../../../components/bbhAlert/bbhAlert';
import {accountAc} from "../../../actions/account";
import {clear} from "../../../actions/loan-index";
import {repaymentsAc} from "../../../actions/member-loans";
import Pagination from '../../../components/pagination/pagination';
import {addCommas, getTips, toMoney} from "../../../utils/famatData";
import { Spin,Icon  } from 'antd';
class ModalPactsList extends Component {
    state = { loading: false }
    componentDidMount () {
        //清理
        this.props.dispatch(memberInvestAc.stateModify({pactsList:``}));
        this.props.dispatch(memberInvestAc.getPactList({transId:this.props.currentId}));
    }
    downLoan(params){
        this.setState({
            loading: true
        },()=>{
            this.props.dispatch(memberInvestAc.downLoad(params)).then(res => {
                this.setState({
                    loading: false
                })
                let a = document.createElement('a');
                let event = new MouseEvent('click');
                a.download=``;
                a.href=res.value.pactUrl;
                a.target = "_blank";
                a.dispatchEvent(event);
            })
        })
    }
    render() {
        let {isFetching}=this.props.memberInvestments;
        let {currentId,pactsList}=this.props.memberInvestments.myInvestments;

        return (
            <div className="table__wrapper">
                {(pactsList==='')?<div style={{paddingLeft:`30px`}}><Loading isShow={isFetching}/></div>
                    :
                    <div>
                        <Spin tip="合同加载中..." wrapperClassName='skin_loading' size='large' spinning={this.state.loading}>
                        <table className="tableList">
                            <thead>
                            <tr>
                                <th>受让人</th>
                                <th>受让金额（元）</th>
                                <th>操作</th>
                            </tr>
                            </thead>

                            <tbody>
                            {(pactsList.total > 0)?
                                pactsList.list.map((l, i) => (
                                    <tr key={`row-${i}`}>
                                        <td>{l.investor}</td>
                                        <td>{toMoney(l.investAmt)}</td>
                                        <td>
                                            <a href="javascript:void(0);"  onClick={() => { this.downLoan(l.investId)}} >下载合同</a>
                                        </td>
                                    </tr>
                                ))
                                :(<tr colSpan="6">
                                    <NoRecord isShow={true} title={`暂无记录`}/>
                                </tr>)
                            }
                            </tbody>

                        </table>
                        <Pagination config = {
                            {
                                currentPage:pactsList.pageNum,
                                pageSize:pactsList.pageSize,
                                totalPage:pactsList.pages,
                                paging:(obj)=>{
                                    this.props.dispatch(memberInvestAc.stateModify({pactsList:``}));
                                    this.props.dispatch(memberInvestAc.getPactList({transId:this.props.currentId,pageNum:obj.currentPage}));
                                }
                            }
                        } ></Pagination>
                        </Spin>
                    </div>


                }
            </div>
        );
    }
};

function mapStateToProps(state) {
    const { auth,memberInvestments } = state.toJS();
    return {
        auth,
        memberInvestments,
    };
}
export default connect(mapStateToProps)(ModalPactsList);