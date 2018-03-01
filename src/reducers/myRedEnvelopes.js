import { fromJS } from 'immutable';
import initialState from './initialState';

export default function myRedEnvelopes(state=initialState.myRedEnvelopes, action) {

    switch (action.type) {
        case 'FETCH_START':
            //state.loaded=false;
            return state;
        case 'FETCH_SUCCESS':

            return fromJS(state).set('data',action.payload).set('loaded',true).toJS();
        case 'FETCH_FAIL':
            console.log('失败');
            return fromJS(state).set('loaded', true).toJS();
        case 'TOGGLE_CLASS':
            return fromJS(state).set('reStatus',action.payload).toJS();
        default:
            return state;
    }

};