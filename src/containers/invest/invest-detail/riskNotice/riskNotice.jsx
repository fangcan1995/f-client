import React from 'react';
import {connect} from "react-redux";
import specialAc from "../../../../actions/special";
class RiskNotice extends React.Component{
    componentDidMount () {
        this.props.dispatch(specialAc.getInfo(16)); //风险信息,需要去后台确认一下id,暂时用2
    }
    render(){
        const {special}=this.props;
        const {info,isFetching}=special;
        return (
            <ul className="m-notice">
                <li>
                    {
                        (info.code === '0') ?
                            <div className="contentBlock" dangerouslySetInnerHTML={{ __html: special.info.data.content }}></div>
                            :``
                    }
                </li>
            </ul>
        );
    }
}


function mapStateToProps(state) {
    const { special } = state.toJS();
    return {
        special
    };
}
export default connect(mapStateToProps)(RiskNotice);
