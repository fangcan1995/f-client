import { fromJS } from 'immutable';
import initialState from './initialState';

/*const initialState = {
    isPicking: false,
    newAppleId: 3,
    apples: [
        {
            id: 0,
            weight: 233,
            isEaten: false
        },
        {
            id: 1,
            weight: 235,
            isEaten: true
        },
        {
            id: 2,
            weight: 256,
            isEaten: false
        }
    ]
};*/
export default function riskAssess(state=initialState.riskAssess, action) {

    let newState ;
    switch (action.type) {

        case 'apple/BEGIN_PICK_APPLE':

            /** 将isPicking设置true */
            console.log('开始');
            return fromJS(state).set('isPicking', true).toJS();

        case 'apple/DONE_PICK_APPLE':
            console.log('开始');
            let newApple =  {
                id: state.newAppleId,
                weight: action.payload,
                isEaten: false
            };

            /** 在apples中新增一个newApple， 将newAppleId增加1， 将isPicking设为false*/
            return fromJS(state).update('apples', list => list.push(newApple))
                .set('newAppleId', state.newAppleId + 1)
                .set('isPicking', false)
                .toJS();

        case 'apple/FAIL_PICK_APPLE':

            /** 将isPicking设置false */
            return fromJS(state).set('isPicking', false).toJS();

        case 'apple/EAT_APPLE':

            /** 将id对应索引值的数组的isEaten设为true,表示已吃*/
            return fromJS(state).setIn(['apples', action.payload, 'isEaten'], true).toJS();

        default:
            return state;
    }

};