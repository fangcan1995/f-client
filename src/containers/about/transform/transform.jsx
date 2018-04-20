import React, { Component } from 'react';
import { connect } from 'react-redux';
import { aboutContentAction, articalListAction } from '../../../actions/aboutContent';

import List from '../list/list';
import ArticalContent from '../content/content';
import TeamContent from '../team/team';
import constantTable from '../constant/constant';

class TransformPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { childId, dispatch, aboutContent } = this.props;
        dispatch(articalListAction(childId, 1));
    }

    render() {
        const { childId, dispatch, aboutContent, content, tabName, match } = this.props;
        console.log(111);
        console.log(aboutContent);
        const { pageInfo, status } = aboutContent;
        if (aboutContent.status !== 0) {
            if (pageInfo.list.length > 1) {
                if (pageInfo.list[0].affIcon) {
                    return (
                        <TeamContent tabName={tabName}
                            content={pageInfo}
                            match={match}
                            childId={childId}
                            dispatch={dispatch}
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
                        />
                    )
                }

            }
            else {
                return (
                    <ArticalContent
                        tabName={tabName}
                        content={pageInfo}
                        match={match}
                        childId={childId}
                        dispatch={dispatch}
                    />
                );
            }
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

TransformPage = connect(mapStateToProps)(TransformPage);

export default TransformPage;