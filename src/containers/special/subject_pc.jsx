import React from 'react';
import PropTypes from 'prop-types';
import './subject.less';
import { connect } from 'react-redux';
import specialAc from "../../actions/special";
import {Loading,NoRecord,Page404} from '../../components/bbhAlert/bbhAlert';
class SubjectPc extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount () {
        const pathSnippets = this.props.location.pathname.split('/').filter(i => i);
        let id=pathSnippets[1];
        let {dispatch}=this.props;

        dispatch(specialAc.getInfo(id)); //借款人信息披露
    }
    render(){
        let {special}=this.props;
        let {info,isFetching}=special;
        //console.log(this.props);
        return (
            <main className="special_pc">
                {
                (info === '') ? <Loading isShow={isFetching}/>
                    :
                    <div>
                        {
                            (info.code==='0')?
                                <div className="contentBlock" dangerouslySetInnerHTML={{ __html: special.info.data.content }}></div>
                                :<Page404 isShow={true} />
                        }
                    </div>

                }

            </main>
        )
    }
}
function mapStateToProps(state) {
    const { special } = state.toJS();
    return {
        special
    };
}
export default connect(mapStateToProps)(SubjectPc);