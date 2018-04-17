import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../../components/pagination/pagination';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';
import { Route, Link } from 'react-router-dom';
import { aboutContentAction, articalListAction } from '../../../actions/aboutContent';







class articalList extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { tabName, match, content, childId } = this.props;
        console.log(childId);
    }

    componentDidUpdate() {
        const { tabName, match, content, childId, dispatch } = this.props;
        dispatch(articalListAction(childId));
    }

    render() {

        //数据
        const { tabName, match, content, childId, dispatch } = this.props;
        return (
            <div>
                <div className="tabs__nav">
                    <li className="tab tab--active">{tabName}</li>
                </div>
                <div className="tabs__content">
                    <ul className="list">
                        {
                            content.list.map((item, i) => {
                                return (
                                    <li key={i}>
                                        <Link to="/">{item.title}</Link>
                                        <span>{item.updateTime.split(' ')[0]}</span>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
                <Pagination config={
                    {
                        currentPage: content.pageNum,
                        pageSize: content.pageSize,
                        totalPage: content.pages,
                        hidden: false,
                        paging: (obj) => {
                            console.log(obj);
                            //this.loadData(obj.currentPage,obj.pageCount);
                        }
                    }
                } ></Pagination>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        aboutContent: state.toJS().aboutContentReducer
    }
}

articalList = connect(
    mapStateToProps
)(articalList)


export default articalList;