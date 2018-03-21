import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';
const initialState = Immutable.fromJS({
  isFetching: false,
  visible:false
});

export default createReducer(initialState, {
  

  ['loginModal/SHOW_MODAL']: (state, action) => state.merge({
    visible: true
  }),
  ['loginModal/HIDE_MODAL']: (state, action) => state.merge({
    visible: false
  }),
})
