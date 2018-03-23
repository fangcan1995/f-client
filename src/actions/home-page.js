import cFetch from './../utils/cFetch';
import { API_CONFIG } from './../config/api';
import urls from '../utils/url'

// const urls = [
//   `${urls}/homes/affiches?access_token=8b1ae302-f58e-4517-a6a1-69c9b94662e8`,
// ] 

// export const  getData = () => {
//     console.log('aaa111')
//   return {
//       type: 'homePage/GET_DATA', 
//       async payload () {
//           return Promise.all(
//               urls.map(url => cFetch(url, {method: 'GET'}, false)
//               .then(body => {
//                   if ( body.error ) {
//                       return Promise.reject(body)
//                   } else {
//                       return body
//                   }
//               })
//             ))         
//       }
//   }
// }

export const  getData = () => {
  console.log('aaa777')
  return {
    type: 'homePage/GET_DATA',
    async payload() {
      const res = await cFetch(`${urls}/homes/affiches?access_token=b1b3685c-0b71-491e-a9fb-10d26a6c74d4` , { method: 'GET' }, false);
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

export const getNovice  = (list) => {
    console.log('aaa222')
    list=0
    return {
      type: 'homePage/GET_NOVICE',
      async payload() {
        const res = await cFetch(`${urls}/invest/homes/novice?access_token=b1b3685c-0b71-491e-a9fb-10d26a6c74d4&list[${list}].loanExpiry=3&list[${list}].num=1` , { method: 'GET' }, false);
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
        const res = await cFetch(`${urls}/invest/homes/standard?access_token=b1b3685c-0b71-491e-a9fb-10d26a6c74d4&num=4` , { method: 'GET' }, false);
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

  export const  getBanner = () => {
    console.log('aaa333')
    return {
      type: 'homePage/GET_BANNER',
      async payload() {
        const res = await cFetch(`${urls}/homes/banners?access_token=b1b3685c-0b71-491e-a9fb-10d26a6c74d4` , { method: 'GET' }, false);
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
        const res = await cFetch(`${urls}/homes/notices?access_token=b1b3685c-0b71-491e-a9fb-10d26a6c74d4` , { method: 'GET' }, false);
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

  export const  getSpecs = () => {
    console.log('aaa555')
    return {
      type: 'homePage/GET_SPEC',
      async payload() {
        const res = await cFetch(`${urls}/homes/statistics?access_token=b1b3685c-0b71-491e-a9fb-10d26a6c74d4` , { method: 'GET' }, false);
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