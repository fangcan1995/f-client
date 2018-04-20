import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    menuList: [],
    pageInfo: {
        pageNum: 1,
        pageSize: 10,
        size: 10,
        startRow: 1,
        endRow: 10,
        total: 1,
        pages: 1,
        list: [],
        prePage: 0,
        nextPage: 2,
        isFirstPage: true,
        isLastPage: false,
        hasPreviousPage: false,
        hasNextPage: true,
        navigatePages: 1,
        navigatepageNums: [],
        navigateFirstPage: 1,
        navigateLastPage: 1,
        firstPage: 1,
        lastPage: 1
    },
    artical: {},
    status: 0
});

export default createReducer(initialState, {
    ['GET_ABOUT_CONTENT_FULFILLED']: (state, action) => {
        return state.merge({
            menuList: action.payload
        });
    },
    ['GET_ARTICALLIST_FULFILLED']: (state, action) => {
        return state.merge({
            pageInfo: action.payload.data,
            status: action.payload.status
        });
    },
    ['GET_ARTICAL_FULFILLED']: (state, action) => {
        return state.merge({
            artical: action.payload.data,
            status: action.payload.status
        })
    }
});