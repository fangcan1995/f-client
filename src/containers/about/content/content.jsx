import React, { Component } from 'react';
import { connect } from 'react-redux';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';
import { Route, Link } from 'react-router-dom';
import { aboutContentAction, articalListAction, articalAction } from '../../../actions/aboutContent';

import './content.less';


class articalContent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, articalId } = this.props;
    }

    render() {
        const { tabName, match, content, childId, dispatch } = this.props;
        console.log(content)
        if (content&&content.list) {
            const list = content.list;
            if (list[0]) {
                return (
                    <div>
                        <div className="tabs__nav">
                            <li className="tab tab--active">{tabName}</li>
                        </div>
                        <div className="content">
                            <h2>{list[0].title}</h2>
                            <h5>时间：<span>{list[0].updateTime}</span>&nbsp;&nbsp;&nbsp;&nbsp;编辑：<span>巴巴汇</span></h5>
                            <div className="contentBlock" dangerouslySetInnerHTML={{ __html: list[0].affContent }}></div>
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
        else {
            return (
                <div>
                    <div className="tabs__nav">
                        <li className="tab tab--active">{tabName}</li>
                    </div>
                    <div className="content">
                        <h2>{content.title}</h2>
                        <h5>时间：<span>{content.updateTime}</span>&nbsp;&nbsp;&nbsp;&nbsp;编辑：<span>巴巴汇</span></h5>
                        <div className="contentBlock" dangerouslySetInnerHTML={{ __html: content.affContent }}></div>
                    </div>
                </div>
            );
        }

    }
}


export default articalContent;

