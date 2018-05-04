import React, { Component } from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import './aboutus-common.less';
import { connect } from 'react-redux';

import { aboutContentAction, articalListAction } from '../../actions/aboutContent';

import Pagination from '../../components/pagination/pagination';
import Crumbs from '../../components/crumbs/crumbs';
import InfoCrumbs from '../../components/infoCrumbs/infoCrumbs';

import TransformPage from '../../containers/about/transform/transform';


const ListItemLink = ({ to, ...rest }) => (
    <Route path={to} children={({ match }) => (
        <li className={match ? 'active' : ''}>
            <Link to={to} {...rest} />
        </li>
    )} />
)

//给当前菜单的父级菜单加active
const TitleParent = ({ title, to, match, ...rest }) => (
    <Route render={
        (props) => {
            const { location } = props;
            const url = location.pathname;
            return (
                <h3 className={(url.toLowerCase().indexOf(match.toLowerCase()) === 0) ? 'active' : ''}>
                    <Link to={to} {...rest}>{title}</Link>
                </h3>
            )
        }
    } />
)



class About extends Component {
    constructor(props) {
        super(props);
        this.relations = [];
        this.defaultName = '';
        this.parents = null;
        this.defaultId;
        const currents = this.props.location.pathname.split('/');
        this.state = {
            current: parseInt(currents[currents.length >= 3 && currents.length === 3 ? currents.length - 1 : currents.length - 2]),
            targetName: '',
            random: Math.random()
        }
    }


    collapse(key) {
        const { current } = this.state;
        if (current != key) {
            this.setState({
                current: key
            })
        }
    }

    handleSelectChildPage(e) {
        const { dispatch } = this.props;
        this.setState({
            random: Math.random()
        })
        dispatch(articalListAction(e.target.id, 1));
    }

    handleSelectParentPage(e) {
        const { dispatch } = this.props;
        const currentParentId = e.target.id;
        const parent = this.relations.find(r => {
            return r.parentId == currentParentId
        });
        this.setState({
            random: Math.random()
        })
        dispatch(articalListAction(parent.children[0].childId, 1));
    }

    createRelation = (list) => {
        let relations = [];
        list.map((item, i) => {
            if (item.disclosureDtos.length > 0) {
                const children = [];
                item.disclosureDtos.map(child => {
                    children.push({
                        childId: child.id,
                        childName: child.affTypeName
                    });
                });
                relations.push({
                    parentId: item.id,
                    hidden: false,
                    children
                });

            }
            else {
                relations.push({
                    parentId: item.id,
                    hidden: true,
                    children: []
                });
            }
        });
        return relations;
    }

    sideBarContent = (item, match, location) => {
        let children;
        if (item.disclosureDtos.length > 0) {
            children = item.disclosureDtos.map((child, i) => {
                return (
                    <ListItemLink to={`${match.url}/${item.id}/${child.id}`} key={child.id} onClick={this.handleSelectChildPage.bind(this)} id={child.id}>
                        {child.affTypeName}
                    </ListItemLink>
                );
            });
            return children;
        }
    }

    sideBarTop = (list, match, location, defaultParent, relation) => {
        const container = list.map((item, i) => {
            if (item.disclosureDtos.length > 0) {
                if (i === 0) {
                    this.defaultName = item.disclosureDtos[0].affTypeName;
                }
            }
            const children = this.sideBarContent(item, match);
            return !relation[i].hidden ?
            (
                <dl key={item.id} onClick={this.collapse.bind(this, relation && relation[i].parentId)}
                    className={
                        this.state.current === item.id
                            && (location.pathname.toLowerCase().indexOf(`${match.url}/${relation[i].parentId}`.toLowerCase()) === 0)
                            ? "showChildren"
                            : (`${match.url}/${relation[i].parentId}`.toLowerCase().indexOf(defaultParent.toString().toLowerCase()) > 0)
                                ? "showChildren"
                                : ""
                    }
                >
                    <dt>
                        <TitleParent title={item.affTypeName} to={`${match.url}/${relation[i].parentId}/${relation[i].children[0].childId}`} id={item.id} match={`${match.url}/${relation[i].parentId}`} onClick={this.handleSelectParentPage.bind(this)} />
                    </dt>
                    <dd>
                        <ul>
                            {
                                children
                            }
                        </ul>
                    </dd>
                </dl>
            )
            : null;
        });
        return container;
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(aboutContentAction());
    }


    render() {
        const { match, aboutContent, dispatch, location } = this.props;
        
        //重置父级菜单和子集菜单的关联
        const relations = this.relations = this.createRelation(aboutContent.menuList);
        //获取当前的路径，当前路径的父级菜单id 和 自己菜单的id
        const currentLocation = location.pathname.split('/');
        let currentParentId, currentChildId, currentTabName;
        if (currentLocation.length >= 3) {
            currentParentId = currentLocation[currentLocation.length === 3 ? currentLocation.length - 1 : currentLocation.length - 2];
            if (currentLocation.length === 4) {
                currentChildId = currentLocation[currentLocation.length === 4 && currentLocation.length - 1];
                const parent = relations.find(parent => {
                    return parent.parentId == currentParentId;
                });
                if (parent) {
                    const child = parent.children.find(child => {
                        return child.childId == currentChildId;
                    });
                    currentTabName = child && child.childName;
                }

            }
            else {
                let firstChild = relations.find(parent => {
                    return parent.parentId == currentParentId;
                });
                currentChildId = firstChild && firstChild.children[0].childId;
                currentTabName = firstChild && firstChild.children[0].childName;
            }
        }
        else {
            if (relations && relations.length > 0) {
                currentParentId = relations[0].parentId;
                currentChildId = relations[0].children[0].childId;
                currentTabName = relations[0].children[0].childName;
            }
        }
        const sideBar = this.sideBarTop(aboutContent.menuList, match, location, currentParentId, relations);

        return (
            <main className="main">
                <div className="wrapper">
                    <div className="about__sidebar">
                        {
                            sideBar
                        }
                    </div>
                    <div className="about__main">
                        <div>
                            <InfoCrumbs dispatch={dispatch} />
                            <div className="about__box">
                                <div className="tablist">
                                    <Switch>
                                        <Route exact
                                            path="/about/:parentId/:childId/:articalId"
                                            render={
                                                ({ match }) => {
                                                    return (
                                                        <TransformPage tabName={currentTabName}
                                                            content={aboutContent.pageInfo}
                                                            match={match}
                                                            childId={match.params.childId}
                                                            dispatch={dispatch}
                                                            key={match.params.childId}
                                                        />
                                                    );
                                                }
                                            }
                                        />
                                        <Route exact
                                            path="/about/:parentId/:childId"
                                            render={
                                                ({ match, location }) => {
                                                    return (
                                                        <TransformPage tabName={currentTabName}
                                                            content={aboutContent.pageInfo}
                                                            match={match}
                                                            childId={match.params.childId}
                                                            dispatch={dispatch}
                                                            key={match.params.childId}
                                                        />
                                                    );
                                                }
                                            }
                                        />
                                        {
                                            !!(relations.length > 0)
                                                ? (
                                                    <div>
                                                        <Redirect exact
                                                            from={`${match.url}`}
                                                            to={`${match.url}/${currentParentId}/${currentChildId}`}
                                                        />
                                                        <Redirect exact
                                                            from={`${match.url}/${currentParentId}`}
                                                            to={`${match.url}/${currentParentId}/${currentChildId}`}
                                                        />
                                                    </div>
                                                )
                                                : <div></div>
                                        }
                                    </Switch>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        aboutContent: state.toJS().aboutContentReducer
    }
}

About = connect(mapStateToProps)(About);

export default About;
