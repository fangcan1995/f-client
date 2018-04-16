import React, { Component } from 'react';
import { connect } from 'react-redux';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';
import { Route, Link } from 'react-router-dom';
import { aboutContentAction, articalListAction } from '../../../actions/aboutContent';


class articalContent extends Component {
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
                    <div className="tabs__content">
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

articalContent = connect(
    mapStateToProps
)(articalContent)

export default articalContent;

