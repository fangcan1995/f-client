import React, { Component } from 'react';
import './team.less';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import Pagination from '../../../components/pagination/pagination';
import { aboutContentAction, articalListAction } from '../../../actions/aboutContent';


const TeamContent = (props) => {
    const { tabName, match, content, childId, dispatch } = props;
    const handlePage = (pageNum, pageCount) => {
        dispatch(articalListAction(childId, 1, pageNum, pageCount));
    };
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
            </div>
            <Pagination config={
                {
                    currentPage: content.pageNum,
                    pageSize: content.pageSize,
                    totalPage: content.pages,
                    hidden: false,
                    paging: (obj) => {
                        handlePage(obj.currentPage, obj.pageCount);
                    }
                }
            } ></Pagination>
        </div>
    )
}

export default TeamContent;