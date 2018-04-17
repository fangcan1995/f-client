import React, { Component } from 'react';
import { connect } from 'react-redux';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';
import { Route, Link } from 'react-router-dom';
import { aboutContentAction, articalListAction } from '../../../actions/aboutContent';


class DetailsContent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { tabName, match, content, childId, dispatch } = this.props;
        dispatch(articalListAction(childId));
    }

    render() {
        const { tabName, match, content, childId, dispatch } = this.props;
        const list = content.list;
        console.log(list);
        if(list[0]) {
            return (
                <div>
                    <div className="tabs__nav">
                        <li className="tab tab--active">{tabName}</li>
                    </div>
                    <div className="content">
                        <h2>{list[0].title}</h2>
                        <h5>时间：<span>{list[0].updateTime}</span>&nbsp;&nbsp;&nbsp;&nbsp;编辑：<span>{list[0].createUser}</span></h5>
                        <div className="contentBlock" dangerouslySetInnerHTML={{__html: list[0].affContent}}></div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className="tabs__nav">
                        <li className="tab tab--active">{tabName}</li>
                    </div>
                    <div className="tabs__content">
                        <h3 style={{ fontSize: '16px', margin: '10px' }}>暂无内容</h3>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        aboutContent: state.toJS().aboutContentReducer
    }
}

DetailsContent = connect(
    mapStateToProps
)(DetailsContent)

export default DetailsContent;

