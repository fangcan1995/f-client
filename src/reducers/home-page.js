import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  isFetching: false,
  banner: [],
  spec:{
    pNumber:10000,
    sumNumber:100000,
    profit:1000,
    
  },
  notice:[],
  sprog:[],
 standard:[{form:'汇车贷（一期）',
  least:'1.000',
  repayment:'按月付息，到期还本',
  lasttime:'3',
  baseRate:'8',
  expectRate:'4',
  sumNumber:'30',
  has:'18.05',
  hadPercent:'65%',
  standardId:'3433',
  }],
  ad:[{
    imgsrc:'1111',
    imgurl:'http://www.baidu.com',
    id:"123"
    }],
  media:{
    commedia:[
    {
      bgimag:'aaa',
      tital:'巴巴汇金服资金存管上线',
      id:'343'
    }
    ],
    newsmedia:[{
      medianame:'网贷之家',
      mediatital:'近年来，移动互联网、大数据、金融巨头共同关注的重点领域，其中几个热点问题备受关注',
      id:'122'
    }],
      mimage:[{
        mimgsrc:'11111',
        mimgurl:'www.baidu.com',
        mimgID:'111111'
      }],
    },
  partner:[{
      imgsrc:'1231',
      id:'11111111'
  }],
  
});

export default createReducer(initialState, {
  ['homePage/GET_DATA_PENDING']: (state, action) => state.merge({
    isFetching: true,
  }),
  // ['homePage/GET_DATA_FULFILLED']: (state, action) => state.merge({
  //   isFetching: false,
  //   data: action.payload
  // }),
  ['homePage/GET_DATA_FULFILLED']: (state, action) => {
      const [ banner, spec, sprog, standard, ad, media, partner ] = actions.payload;
        return state.merge({
            spec,
            ad,
            media,
            partner,
        })
    },
  ['homePage/GET_DATA_REJECTED']: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

  ['homePage/GET_NOVICE_PENDING']: (state, action) => state.merge({
    isFetching: true,
  }),
  ['homePage/GET_NOVICE_FULFILLED']: (state, action) => state.merge({
    isFetching: false,
    sprog: action.payload[0],
  }),
  ['homePage/GET_NOVICE_REJECTED']: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

  ['homePage/GET_STANDARD_PENDING']: (state, action) => state.merge({
    isFetching: true,
  }),
  ['homePage/GET_STANDARD_FULFILLED']: (state, action) => state.merge({
    isFetching: false,
    standard: action.payload,
  }),
  ['homePage/GET_STANDARD_REJECTED']: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

  ['homePage/GET_BANNER_PENDING']: (state, action) => state.merge({
    isFetching: true,
  }),
  ['homePage/GET_BANNER_FULFILLED']: (state, action) => state.merge({
    isFetching: false,
    banner: action.payload,
  }),
  ['homePage/GET_BANNER_REJECTED']: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

  ['homePage/GET_NOTICE_PENDING']: (state, action) => state.merge({
    isFetching: true,
  }),
  ['homePage/GET_NOTICE_FULFILLED']: (state, action) => state.merge({
    isFetching: false,
    notice: action.payload,
  }),
  ['homePage/GET_NOTICE_REJECTED']: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),
})
