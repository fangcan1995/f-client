import React, { Component } from 'react';
import { connect } from 'react-redux';
import { aboutContentAction, articalListAction, articalAction } from '../../../actions/aboutContent';
import { withRouter } from 'react-router';

import List from '../list/list';
import ArticalContent from '../content/content';
import TeamContent from '../team/team';
import ConstantTable from '../constant/constant';

class TransformPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            childId: this.props.childId
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const { childId, dispatch, aboutContent, match } = this.props;
        const status = aboutContent.status;
        if(!match.params.articalId) {
            dispatch(articalListAction(childId, 1));
        }
        else {
            dispatch(articalAction(match.params.articalId));
        }
    }

    render() {
        const { childId, dispatch, aboutContent, content, tabName, match, key } = this.props;
        const { pageInfo, status, artical } = aboutContent;
        if(status === 2) {
            return (
                <ArticalContent
                    tabName={tabName}
                    content={artical}
                    match={match}
                    articalId={match.params.articalId}
                    dispatch={dispatch}
                    key={match.params.articalId}
                />
            );
        }
        else if (aboutContent.status === 1) {
            if (pageInfo.pages > 1 || pageInfo.list.length > 1) {
                if (pageInfo.list[0].affIcon) {
                    return (
                        <TeamContent tabName={tabName}
                            content={pageInfo}
                            match={match}
                            childId={childId}
                            dispatch={dispatch}
                            key={this.childId}
                        />
                    );

                }
                else {
                    return (
                        <List tabName={tabName}
                            content={pageInfo}
                            match={match}
                            childId={childId}
                            dispatch={dispatch}
                            key={match.params.childId}
                        />
                    )
                }

            }
            else {
                if(childId === '82') {
                    return (
                        <ConstantTable key={match.params.childId} />
                    )
                }
                return (
                    <ArticalContent
                        tabName={tabName}
                        content={pageInfo}
                        match={match}
                        articalId={match.params.articalId}
                        dispatch={dispatch}
                        key={match.params.articalId}
                    />
                );
            }
        }
        else {
            return (
                <div key={match.params.childId}>
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

TransformPage = connect(mapStateToProps)(TransformPage);

export default TransformPage;