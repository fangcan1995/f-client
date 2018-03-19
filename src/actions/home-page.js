import cFetch from './../utils/cFetch';
import { API_CONFIG } from './../config/api';

const urls = [
  `http://172.16.1.221:9090/homes/banner`,
  `http://172.16.1.221:9090/homes/spec`,
  `http://172.16.1.221:9090/homes/ad`,
  `http://172.16.1.221:9090/homes/media`,
  `http://172.16.1.221:9090/homes/partner`,
] 

export const getNovice  = () => {
    console.log('aaa111')
  return {
      type: 'homePage/GET_DATA', 
      async payload () {
          return Promise.all(
              urls.map(url => cFetch(url, {method: 'GET'}, false)
              .then(body => {
                  if ( body.error ) {
                      return Promise.reject(body)
                  } else {
                      return body
                  }
              })
            ))         
      }
  }
}

export const  getBanner = (list) => {
    console.log('aaa222')
    list=0
    return {
      type: 'homePage/GET_NOVICE',
      async payload() {
        const res = await cFetch(`http://172.16.1.234:9090/invest/homes/novice?access_token=c8c9846e-b425-463d-80b2-9e162fce17ff&list[${list}].loanExpiry=3&list[${list}].num=1` , { method: 'GET' }, false);
        const { code, data } = res;
        if ( code == 0 ) {
            console.log(data)
          return data || {};
        } else {
          throw res;
        }
      }
    }
  }

  export const  getStandard = () => {
    console.log('aaa222')
    return {
      type: 'homePage/GET_STANDARD',
      async payload() {
        const res = await cFetch(`http://172.16.1.234:9090/invest/homes/standard?access_token=c8c9846e-b425-463d-80b2-9e162fce17ff&num=4` , { method: 'GET' }, false);
        const { code, data } = res;
        if ( code == 0 ) {
            console.log(data)
          return data || {};
        } else {
          throw res;
        }
      }
    }
  }

  export const  getData = () => {
    console.log('aaa333')
    return {
      type: 'homePage/GET_BANNER',
      async payload() {
        const res = await cFetch(`http://172.16.1.221:9090/homes/banners?access_token=0c7087d6-eefc-4ea2-9a1b-c4f17fd537a7` , { method: 'GET' }, false);
        const { code, data } = res;
        if ( code == 0 ) {
            console.log(data)
          return data || {};
        } else {
          throw res;
        }
      }
    }
  }

  export const  getNotice = () => {
    console.log('aaa444')
    return {
      type: 'homePage/GET_NOTICE',
      async payload() {
        const res = await cFetch(`http://172.16.1.221:9090/homes/notices?access_token=0c7087d6-eefc-4ea2-9a1b-c4f17fd537a7` , { method: 'GET' }, false);
        const { code, data } = res;
        if ( code == 0 ) {
            console.log(data)
          return data || {};
        } else {
          throw res;
        }
      }
    }
  }

// export const getData = () => {
//   return {
//     type: 'homePage/GET_DATA',
//     async payload () {
//       return {};
//     }
//   };
// };