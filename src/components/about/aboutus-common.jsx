import React, { Component } from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import './aboutus-common.less';
import { connect } from 'react-redux';

import { aboutContentAction, articalListAction } from '../../actions/aboutContent';

import Pagination from '../../components/pagination/pagination';
import Crumbs from '../../components/crumbs/crumbs';
import Tab from '../../components/tab/tab';

import Team from '../../containers/about/team/team';
import List from '../../containers/about/list/list';
import ArticalContent from '../../containers/about/content/content';



const ListItemLink = ({ to, ...rest }) => (
    <Route path={to} children={({ match }) => (
        <li className={match ? 'active' : ''}>
            <Link to={to} {...rest} />
        </li>
    )} />
)

//给当前菜单的父级菜单加active
const TitleParent = ({ title, to, ...rest }) => (
    <Route render={
        (props) => {
            const { location } = props;
            const url = location.pathname;
            return (
                <h3 className={(url.toLowerCase().indexOf(to.toLowerCase()) === 0) ? 'active' : ''}>
                    <Link to={to} {...rest}>{title}</Link>
                </h3>
            )
        }
    } />
)



class About extends Component {
    constructor(props) {
        super(props);
        this.key = 1;
        this.relation = [];
        this.defaultName = '';
        this.parents = null;
        this.defaultId;
        const currents = this.props.location.pathname.split('/');
        this.state = {
            current: parseInt(currents[currents.length >= 3 && currents.length === 3 ? currents.length - 1 : currents.length - 2]),
            menuList: [],
            targetName: '',
            targetParentId: null
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
        dispatch(articalListAction(e.target.id));
        this.setState({
            targetName: e.target.innerHTML
        })
    }

    handleSelectParentPage(e) {
        const { dispatch, match } = this.props;
        const parentId = e.target.id;
        const relation = this.relation.find(r => {
            return r.parentId == parentId
        });
        dispatch(articalListAction(relation.childId));
        this.setState({
            targetParentId: e.target.id
        })
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

    sideBarTop = (list, match, location, defaultParent) => {
        let relation;
        const container = list.map((item, i) => {
            if (item.disclosureDtos.length > 0) {
                if (i === 0) {
                    this.defaultName = item.disclosureDtos[0].affTypeName;
                }
                relation = {
                    parentId: item.id,
                    childId: item.disclosureDtos[0].id,
                    childName: item.disclosureDtos[0].affTypeName
                }
                this.relation.push(relation);
            }
            const children = this.sideBarContent(item, match);
            return (
                <dl key={item.id} onClick={this.collapse.bind(this, relation.parentId)}
                    className={
                        this.state.current === item.id
                            && (location.pathname.toLowerCase().indexOf(`${match.url}/${relation.parentId}`.toLowerCase()) === 0)
                            ? "showChildren"
                            : defaultParent && defaultParent.toLowerCase().indexOf(`${relation.parentId}`.toLowerCase()) === 0
                                ? "showChildren"
                                : ""
                    }
                >
                    <dt>
                        <TitleParent title={item.affTypeName} to={`${match.url}/${relation.parentId}/${relation.childId}`} id={item.id} onClick={this.handleSelectParentPage.bind(this)} />
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
        });
        return container;
    }

    componentWillMount() {
        const { dispatch, match } = this.props;
        dispatch(aboutContentAction());
        /* dispatch(articalListAction(this.defaultId)); */
    }

    componentDidMount() {
        /* const { dispatch, match } = this.props;
        if(this.defaultId) {
            dispatch(articalListAction(this.defaultId));
        } */
    }

    render() {
        const { match, aboutContent, dispatch, location } = this.props;

        //重置父级菜单和子集菜单的关联
        this.relation = [];

        //获取当前的路径，当前路径的父级菜单id 和 自己菜单的id
        const currentLocation = location.pathname.split('/');
        let currentParentId, currentChildId;
        if(currentLocation.length >= 3) {
            //当为3时代表此时路由只有父id，4时代表路由到子id
            currentParentId = currentLocation[currentLocation.length === 3 ? currentLocation.length - 1 : currentLocation.length - 2];
            currentChildId = currentLocation[currentLocation.length === 4 && currentLocation.length - 1];
        }

        /* let defaultParent;
        const currents = this.props.location.pathname.split('/');
        if (currents.length >= 3) {
            defaultParent = currents[currents.length === 3 ? currents.length - 1 : currents.length - 2];
            this.defaultId = currents[currents.length === 4 && currents.length - 1];
        } */
        const sideBar = this.sideBarTop(aboutContent.menuList, match, location, currentParentId);

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
                            <Crumbs />
                            <div className="about__box">
                                <div className="tablist">
                                    <Switch>
                                        <Route excact
                                            path="/about/:parentId/:childId"
                                            render={
                                                ({ match, location }) => {
                                                    return <ArticalContent {...props} />
                                                }
                                            }
                                        />
                                        {
                                            /* 此时路由/about, 重定向至/about/第一父栏目/第一子栏目 */
                                            this.relation[0] ? 
                                            <Redirect exact
                                                from={`${match.url}/`}
                                                to={`${match.url}/${this.relation[0].parentId}/${this.relation[0].childId}`}
                                            />
                                            :
                                            null
                                        }
                                        {
                                            /* 此时路由/about/:pid, 重定向至 /about/:pid/当前pid第一子栏目 */
                                        }
                                    </Switch>
                                    {/* <Switch>
                                        {
                                            this.relation[0] ?
                                                    <Redirect exact
                                                        from={`${match.url}`}
                                                        to={`${match.url}/${this.relation[0].parentId}/${this.relation[0].childId}`}
                                                    />
                                                :
                                                null
                                        }
                                        <Route exact path="/about/:parentId" render={
                                            ({ match }) => {
                                                const list = aboutContent.pageInfo.list;
                                                const { parentId } = match.params;
                                                console.log(parentId, this.relation);
                                                const childId = this.relation.find(r => {
                                                    return r.parentId == parentId
                                                });

                                                if (list[0] && list.length > 1) {
                                                    return (
                                                        <div>
                                                            <div className="tabs__nav">
                                                                <li className="tab tab--active">{childId.childName}</li>
                                                            </div>
                                                            <div className="tabs__content">
                                                                <List data={aboutContent.pageInfo} match={match}  {...this.props}  />
                                                            </div>
                                                            <Pagination config={
                                                                {
                                                                    currentPage: 1,
                                                                    pageSize: 2,
                                                                    totalPage: 1,
                                                                    hidden: false,
                                                                    paging: (obj) => {
                                                                        console.log(obj);
                                                                        //dispatch(articalListAction(obj.currentPage,obj.pageCount))
                                                                    }
                                                                }
                                                            } ></Pagination>
                                                        </div>

                                                    );
                                                }
                                                else if (list[0]) {
                                                    return (
                                                        <div>
                                                            <div className="tabs__nav">
                                                                <li className="tab tab--active">{childId.childName}</li>
                                                            </div>
                                                            <div className="tabs__content">
                                                                <ArticalContent data={aboutContent.pageInfo} match={match} />
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                else {
                                                    return (
                                                        <div>
                                                            <div className="tabs__nav">
                                                                <li className="tab tab--active">{childId.childName}</li>
                                                            </div>
                                                            <div className="tabs__content">
                                                                <h3 style={{ fontSize: '16px', margin: '10px' }}>暂无内容</h3>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            }
                                        } />
                                        <Route exact path="/about/:parentId/:childId" render={
                                            ({ match }) => {
                                                const list = aboutContent.pageInfo.list;
                                                if (list[0] && list.length > 1) {
                                                    return (
                                                        <div>
                                                            <div className="tabs__nav">
                                                                <li className="tab tab--active">{this.state.targetName ? this.state.targetName : this.defaultName}</li>
                                                            </div>
                                                            <div className="tabs__content">
                                                                <List data={aboutContent.pageInfo} match={match} />
                                                            </div>
                                                            <Pagination config={
                                                                {
                                                                    currentPage: aboutContent.pageInfo.pageNum,
                                                                    pageSize: aboutContent.pageInfo.pageSize,
                                                                    totalPage: aboutContent.pageInfo.pages,
                                                                    hidden: false,
                                                                    paging: (obj) => {
                                                                        console.log(obj);
                                                                        //this.loadData(obj.currentPage,obj.pageCount);
                                                                    }
                                                                }
                                                            } ></Pagination>
                                                        </div>
                                                    );
                                                }
                                                else if (list[0]) {
                                                    return (
                                                        <div>
                                                            <div className="tabs__nav">
                                                                <li className="tab tab--active">{this.state.targetName ? this.state.targetName : this.defaultName}</li>
                                                            </div>
                                                            <div className="tabs__content">
                                                                <ArticalContent data={aboutContent.pageInfo} match={match} />
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                else {
                                                    return (
                                                        <div>
                                                            <div className="tabs__nav">
                                                                <li className="tab tab--active">{this.state.targetName ? this.state.targetName : this.defaultName}</li>
                                                            </div>
                                                            <div className="tabs__content">
                                                                <h3 style={{ fontSize: '16px', margin: '10px' }}>暂无内容</h3>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            }
                                        } />
                                    </Switch> */}
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
