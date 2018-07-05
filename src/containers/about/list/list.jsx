import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../../components/pagination/pagination';
import Crumbs from '../../../components/crumbs/crumbs';
import Tab from '../../../components/tab/tab';
import { Route, Link } from 'react-router-dom';
import { aboutContentAction, articalListAction, articalAction } from '../../../actions/aboutContent';


const articalList = (props) => {
    const { tabName, match, content, childId, dispatch } = props;
    const handlePage = (pageNum, pageCount) => {
        console.log(pageNum, pageCount);
        dispatch(articalListAction(childId, 1, pageNum, pageCount));
    }
    const handleArtical = (articalId) => {
        dispatch(articalAction(articalId));
    }
    return (
        <div>
            <div className="tabs__nav">
                <li className="tab tab--active" >{tabName}</li>
            </div>
            <div className="tabs__content">
                <ul className="list">
                    {
                        content.list.map((item, i) => {
                            return (
                                <li key={i}>
                                    <Link to={`${match.url}/${item.id}`} onClick={handleArtical.bind(this, item.id)}>{item.title}</Link>
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
                        handlePage(obj.currentPage, obj.pageCount);
                        window.scrollTo(0, 0);
                        //this.loadData(obj.currentPage,obj.pageCount);
                    }
                }
            } ></Pagination>
        </div>
    )
}


export default articalList;