import React, { Component } from 'react';
import './team.less';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { aboutContentAction, articalListAction } from '../../../actions/aboutContent';

class TeamContent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { tabName, match, content, childId, dispatch } = this.props;
        dispatch(articalListAction(childId));
    }


    render() {
        const { tabName, match, content, childId, dispatch } = this.props;
        console.log(content);
        console.log(match);
        return (
            <div>
                <div className="tabs__nav">
                    <li className="tab tab--active">{tabName}</li>
                </div>
                <div className="tabs__content">
                    <ul className="speciallist">
                        {
                            content.list.map((item, i) => {
                                return (
                                    <li key={i}>
                                        <Link to={`${match.url}/${item.id}`}>
                                            <dl>
                                                <dt>
                                                    <h3>{item.title}</h3>
                                                    <p>国汇财富投资管理（大连）股份有限公司</p>
                                                </dt>
                                                <dd className="photo">
                                                    <img src={item.affIcon} />
                                                </dd>
                                                <dd className="intro overunset"
                                                    dangerouslySetInnerHTML={{ __html: item.affContent }}
                                                />
                                            </dl>
                                        </Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    <Route />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        aboutContent: state.toJS().aboutContentReducer
    }
}

TeamContent = connect(
    mapStateToProps
)(TeamContent)

export default TeamContent;