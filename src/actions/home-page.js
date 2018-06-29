import cFetch from './../utils/cFetch';
import { API_CONFIG } from './../config/api';
import {urls,token} from '../utils/url'

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
export const  getAdverts = () => {
  return {
    type: 'homePage/GET_ADVERTS',
    async payload() {
      const res = await cFetch(`${urls}/homes/adverts?adType=3` , { method: 'GET' }, false);
      const { code, data } = res;
      if ( code == 0 ) {
        return data || {};
      } else {
        throw res;
      }
    }
  }
}

export const  getData = () => {
  return {
    type: 'homePage/GET_DATA',
    async payload() {
      const res = await cFetch(`${urls}/homes/affiches?mediaShowNum=5&partnerShowNum=8` , { method: 'GET' }, false);
      const { code, data } = res;
      if ( code == 0 ) {
        return data || {};
      } else {
        throw res;
      }
    }
  }
}

export const  getAdvertTital = () => {
  return {
    type: 'homePage/GET_ADVERT_TITAL',
    async payload() {
      const res = await cFetch(`${urls}/homes/adverts?adType=4` , { method: 'GET' }, false);
      const { code, data } = res;
      if ( code == 0 ) {
        return data || {};
      } else {
        throw res;
      }
    }
  }
}
//本万地址http://172.16.1.221:9090
export const getNovice  = (list) => {
    list=0
    return {
      type: 'homePage/GET_NOVICE',
      async payload() {
        const res = await cFetch(`${urls}/invest/homes/novice?` , { method: 'GET' }, false);
        const { code, data } = res;
        if ( code == 0 ) {
          return data || {};
        } else {
          throw res;
        }
      }
    }
  }

  export const  getStandard = () => {
    return {
      type: 'homePage/GET_STANDARD',
      async payload() {
        const res = await cFetch(`${urls}/invest/homes/standard?num=4` , { method: 'GET' }, false);
        const { code, data } = res;
        if ( code == 0 ) {
          return data || {};
        } else {
          throw res;
        }
      }
    }
  }

  export const  getBanner = () => {
    return {
      type: 'homePage/GET_BANNER',
      async payload() {
        const res = await cFetch(`${urls}/homes/adverts?adType=1` , { method: 'GET' }, false);
        const { code, data } = res;
        if ( code == 0 ) {
          return data || {};
        } else {
          throw res;
        }
      }
    }
  }

  export const  getNotice = () => {
    return {
      type: 'homePage/GET_NOTICE',
      async payload() {
        const res = await cFetch(`${urls}/homes/notices` , { method: 'GET' }, false);
        const { code, data } = res;
        if ( code == 0 ) {
          return data || {};
        } else {
          throw res;
        }
      }
    }
  }

  export const  getSpecs = () => {
    return {
      type: 'homePage/GET_SPEC',
      async payload() {
        const res = await cFetch(`${urls}/homes/statistics` , { method: 'GET' }, false);
        const { code, data } = res;
        if ( code == 0 ) {
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