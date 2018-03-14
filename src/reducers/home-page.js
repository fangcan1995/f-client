import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  isFetching: false,
  banner: {
    banner:[
      {imgsrc:'000',
      imgurl:'www.baidu.com',
      id:1111
    }],
    newperson:12
  },
  spec:{
    pNumber:10000,
    sumNumber:100000,
    profit:1000
  },
  sprog:{ baseRate: 12,
    expectRate: 3,
    pNumber:100,
    month:2,
    remain:144
 },
 standard:[{form:'汇车贷（一期）',
  least:'1.000元',
  repayment:'按月付息，到期还本',
  lasttime:'3个月',
  baseRate:'8',
  expectRate:'4',
  sumNumber:'30万',
  has:'18.05万',
  hadPercent:'65%'
  }],
  ad:[{
    imgsrc:'1111',
    imgurl:'www.baidu.com',
    id:"123"
    }],
    media:{bgimag:'1111',
      tital:'巴巴汇金服资金存管上线',
      media:[{
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
        return state.merge({
            banner: action.payload[0].data ? action.payload[0].data : action.payload[0].error,
            spec: action.payload[1].data ? action.payload[1].data : action.payload[1].error,
            sprog: action.payload[2].data ? action.payload[2].data : action.payload[2].error,
            standard: action.payload[3].data ? action.payload[3].data : action.payload[3].error,
            ad: action.payload[4].data ? action.payload[4].data : action.payload[4].error,
            media: action.payload[5].data ? action.payload[5].data : action.payload[5].error,
            partner: action.payload[6].data ? action.payload[6].data : action.payload[6].error,
        })
    },
  ['homePage/GET_DATA_REJECTED']: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),
})
