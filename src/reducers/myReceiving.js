import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    myList:{
        data:{},
        message:''
    },
    charts:{
        doneDto:{},
        todoDto:{},
        message:''
    },
    status: 1,
});

export default createReducer(initialState, {
    ['FETCH_LIST_SUCCESS']: (state, action) => state.merge({
        myList: {
            data:action.payload,
            message:'获取成功'
        }
    }),
    ['FETCH_LIST_FAIL']: (state, action) => state.merge({
        myList: {
            data:{},
            message:action.payload
        }
    }),
    ['FETCH_CHARTS_SUCCESS']: (state, action) => state.merge({
        charts: action.payload,
    }),
    ['FETCH_CHARTS_FAIL']: (state, action) => state.merge({
        charts: {
            doneDto:{},
            todoDto:{},
            message:action.payload
        },
        loaded: true,
    }),

    ['TOGGLE_CLASS']: (state, action) => state.merge({
        status: action.payload,
    }),

})



