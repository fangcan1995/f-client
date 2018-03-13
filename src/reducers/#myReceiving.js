import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    myInvests:{
    },
    myReceiving:{
        charts:{},
        myList:{}
    },
    /*myList:{
        data:{},
        message:''
    },
    charts:{
        doneDto:{},
        todoDto:{},
        message:''
    },
    status: 1,*/
});

export default createReducer(initialState, {
    ['FETCH_LIST_SUCCESS']: (state, action) => state.mergeDeep({
        myReceiving:{
            myList: {
                data:action.payload,
                message:'获取成功'
            }
        }
    }),
    ['FETCH_LIST_FAIL']: (state, action) => state.mergeDeep({
        myReceiving: {
            myList: {}
        }
    }),
    ['FETCH_CHARTS_SUCCESS']: (state, action) => state.mergeDeep({
            myReceiving:{
                charts: action.payload,
            }
    })
    ,
    ['FETCH_CHARTS_FAIL']: (state, action) => state.mergeDeep({
        myReceiving: {
            charts: {}
        }
    }),

})



